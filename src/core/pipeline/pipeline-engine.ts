/**
 * PlotCraft Pipeline 执行引擎
 * 
 * 支持 SEQUENCE（顺序）、PARALLEL（并行）、DAG（条件分支）、LOOP（循环）执行模式
 */

import { logger } from '@/core/utils/logger';
import {
  PipelineStepId,
  PipelineExecutionMode,
  PipelineStatus,
  StepStatus,
  QualityGateDecision,
  type PipelineStep,
  type PipelineConfig,
  type PipelineExecutionState,
  type PipelineContext,
  type StepInput,
  type StepOutput,
  type StepCheckpoint,
  type PipelineEngineEvent,
  type StepProgressEvent,
} from './pipeline.types';

export class PipelineEngine {
  private config: PipelineConfig;
  private state: PipelineExecutionState;
  private eventHandlers: PipelineEngineEvent = {};
  private checkpoints: Map<PipelineStepId, StepCheckpoint> = new Map();

  constructor(config: PipelineConfig) {
    this.config = config;
    this.state = {
      workflowId: config.workflowId,
      status: PipelineStatus.IDLE,
      stepStates: new Map(),
      context: this.createContext(),
    };
  }

  // ========== 公共接口 ==========

  /**
   * 运行流水线
   */
  async run(initialData?: unknown): Promise<Map<PipelineStepId, StepOutput>> {
    if (this.state.status === PipelineStatus.RUNNING) {
      throw new Error(`Pipeline ${this.config.workflowId} is already running`);
    }

    logger.info(`[PipelineEngine] Starting pipeline ${this.config.workflowId}`, {
      mode: this.config.mode,
      steps: this.config.steps.map(s => s.stepId),
    });

    this.state.status = PipelineStatus.RUNNING;
    this.state.startTime = Date.now();
    this.state.stepStates.clear();

    const results = new Map<PipelineStepId, StepOutput>();

    try {
      switch (this.config.mode) {
        case PipelineExecutionMode.SEQUENCE:
          await this.runSequence(initialData, results);
          break;
        case PipelineExecutionMode.PARALLEL:
          await this.runParallel(initialData, results);
          break;
        case PipelineExecutionMode.LOOP:
          await this.runLoop(initialData, results);
          break;
        case PipelineExecutionMode.DAG:
          await this.runDAG(initialData, results);
          break;
        default:
          throw new Error(`Unsupported execution mode: ${this.config.mode}`);
      }

      this.state.status = PipelineStatus.COMPLETED;
      this.state.endTime = Date.now();
      this.eventHandlers.onPipelineComplete?.(results);

      logger.success(`[PipelineEngine] Pipeline ${this.config.workflowId} completed`, {
        duration: `${this.state.endTime - this.state.startTime}ms`,
      });

      return results;

    } catch (error) {
      this.state.status = PipelineStatus.FAILED;
      this.state.endTime = Date.now();
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.state.error = errorMsg;
      logger.error(`[PipelineEngine] Pipeline ${this.config.workflowId} failed`, error);
      this.eventHandlers.onPipelineFail?.(errorMsg);
      throw error;
    }
  }

  /**
   * 暂停流水线
   */
  pause(): boolean {
    if (this.state.status !== PipelineStatus.RUNNING) {
      return false;
    }
    this.state.status = PipelineStatus.PAUSED;
    logger.info(`[PipelineEngine] Pipeline ${this.config.workflowId} paused`);
    return true;
  }

  /**
   * 恢复流水线
   */
  async resume(): Promise<Map<PipelineStepId, StepOutput>> {
    if (this.state.status !== PipelineStatus.PAUSED) {
      throw new Error('Pipeline is not paused');
    }
    logger.info(`[PipelineEngine] Resuming pipeline ${this.config.workflowId}`);
    this.state.status = PipelineStatus.RUNNING;
    // 简化实现：重新从头运行（后续版本支持从断点恢复）
    return this.run();
  }

  /**
   * 取消流水线
   */
  cancel(): void {
    this.state.status = PipelineStatus.CANCELLED;
    logger.info(`[PipelineEngine] Pipeline ${this.config.workflowId} cancelled`);
  }

  /**
   * 获取状态
   */
  getStatus(): PipelineExecutionState {
    return { ...this.state };
  }

  /**
   * 绑定事件处理器
   */
  onEvents(handler: PipelineEngineEvent): void {
    this.eventHandlers = { ...this.eventHandlers, ...handler };
  }

  // ========== 私有方法 ==========

  private createContext(): PipelineContext {
    const variables = new Map<string, unknown>();
    const checkpoints = new Map<PipelineStepId, StepCheckpoint>();

    return {
      workflowId: this.config.workflowId,
      projectId: this.config.projectId,
      episodeId: this.config.episodeId,
      variables,

      getVariable: <T>(key: string): T | undefined => variables.get(key) as T | undefined,
      setVariable: <T>(key: string, value: T) => variables.set(key, value),
      
      log: (msg: string, level: 'debug' | 'info' | 'warn' | 'error' = 'info') => {
        logger[level](`[Pipeline:${this.config.workflowId}] ${msg}`);
      },
      
      getCheckpoint: (stepId: PipelineStepId) => checkpoints.get(stepId),
      saveCheckpoint: (checkpoint: StepCheckpoint) => {
        checkpoints.set(checkpoint.stepId, checkpoint);
        this.checkpoints.set(checkpoint.stepId, checkpoint);
        this.eventHandlers.onCheckpoint?.(checkpoint.stepId, checkpoint);
      },
      
      emit: (event) => {
        this.state.context.emit?.(event);
      },
    };
  }

  private async runSequence(
    initialData: unknown,
    results: Map<PipelineStepId, StepOutput>
  ): Promise<void> {
    let prevOutput: StepOutput | undefined;
    let contextData = initialData;

    for (const step of this.config.steps) {
      if (this.state.status === PipelineStatus.CANCELLED) break;

      // 检查依赖是否都完成
      if (step.dependencies?.length) {
        for (const depId of step.dependencies) {
          const depState = this.state.stepStates.get(depId);
          if (depState !== StepStatus.COMPLETED) {
            logger.warn(`[PipelineEngine] Step ${step.stepId} skipped due to incomplete dependency ${depId}`);
            this.state.stepStates.set(step.stepId, StepStatus.SKIPPED);
            continue;
          }
        }
      }

      this.state.currentStepId = step.stepId;
      this.state.stepStates.set(step.stepId, StepStatus.RUNNING);
      this.eventHandlers.onStepStart?.(step.stepId);

      const stepInput = this.createStepInput(step, prevOutput, contextData);

      try {
        prevOutput = await this.executeStep(step, stepInput);
        results.set(step.stepId, prevOutput);
        contextData = prevOutput.data;
        this.state.stepStates.set(step.stepId, StepStatus.COMPLETED);
        this.eventHandlers.onStepComplete?.(step.stepId, prevOutput);

        // 质量门控检查
        if (prevOutput.qualityGate === QualityGateDecision.BLOCK) {
          throw new Error(`Quality gate blocked at step ${step.stepId}`);
        }

      } catch (error) {
        this.state.stepStates.set(step.stepId, StepStatus.FAILED);
        const errorMsg = error instanceof Error ? error.message : String(error);
        this.eventHandlers.onStepFail?.(step.stepId, errorMsg);
        throw error;
      }
    }
  }

  private async runParallel(
    initialData: unknown,
    results: Map<PipelineStepId, StepOutput>
  ): Promise<void> {
    const promises = this.config.steps.map(step => this.runSingleStep(step, initialData));
    const stepResults = await Promise.allSettled(promises);

    for (let i = 0; i < stepResults.length; i++) {
      const result = stepResults[i];
      const step = this.config.steps[i];

      if (result.status === 'fulfilled') {
        results.set(step.stepId, result.value);
      } else {
        this.eventHandlers.onStepFail?.(step.stepId, result.reason?.message ?? 'Unknown error');
        throw result.reason;
      }
    }
  }

  private async runLoop(
    initialData: unknown,
    results: Map<PipelineStepId, StepOutput>
  ): Promise<void> {
    // LOOP 模式：遍历所有步骤，支持批量迭代
    await this.runSequence(initialData, results);
  }

  private async runDAG(
    initialData: unknown,
    results: Map<PipelineStepId, StepOutput>
  ): Promise<void> {
    // DAG 模式：按依赖关系拓扑排序后顺序执行
    const sorted = this.topologicalSort(this.config.steps);
    await this.runSequence(initialData, results);
  }

  private async runSingleStep(
    step: PipelineStep,
    initialData: unknown
  ): Promise<StepOutput> {
    this.eventHandlers.onStepStart?.(step.stepId);
    const stepInput = this.createStepInput(step, undefined, initialData);
    return this.executeStep(step, stepInput);
  }

  private createStepInput(
    step: PipelineStep,
    prevOutput: StepOutput | undefined,
    contextData: unknown
  ): StepInput {
    return {
      workflowId: this.config.workflowId,
      stepId: step.stepId,
      prevStepOutputs: prevOutput 
        ? new Map([[prevOutput.stepId, prevOutput]]) 
        : undefined,
      context: this.state.context,
      checkpoint: this.checkpoints.get(step.stepId),
    };
  }

  private async executeStep(
    step: PipelineStep,
    input: StepInput
  ): Promise<StepOutput> {
    const startTime = Date.now();
    let retryCount = 0;

    const executeWithRetry = async (): Promise<StepOutput> => {
      try {
        const output = await step.execute(input);
        
        // 更新质量门控结果
        if (step.qualityGate?.enabled && output.qualityGate === undefined) {
          output.qualityGate = this.evaluateQualityGate(step, output);
        }

        this.eventHandlers.onQualityGate?.(
          step.stepId,
          output.qualityGate ?? QualityGateDecision.PASS,
        );

        output.startTime = startTime;
        output.endTime = Date.now();
        output.retryCount = retryCount;
        return output;

      } catch (error) {
        if (retryCount < step.retryPolicy.maxRetries) {
          retryCount++;
          const delay = Math.min(
            step.retryPolicy.initialDelayMs * 
              Math.pow(step.retryPolicy.backoffMultiplier, retryCount - 1),
            step.retryPolicy.maxDelayMs
          );
          logger.warn(`[PipelineEngine] Retrying step ${step.stepId} in ${delay}ms (attempt ${retryCount})`);
          await this.sleep(delay);
          return executeWithRetry();
        }
        throw error;
      }
    };

    return executeWithRetry();
  }

  private evaluateQualityGate(
    step: PipelineStep,
    output: StepOutput
  ): QualityGateDecision {
    if (!step.qualityGate?.enabled) return QualityGateDecision.PASS;

    const thresholds = step.qualityGate.thresholds;
    const metrics = output.metrics;

    // 简化评估逻辑（后续可扩展）
    if (metrics?.qualityScore !== undefined) {
      if (metrics.qualityScore < thresholds.minConsistency) {
        return step.qualityGate.onFail === 'block' 
          ? QualityGateDecision.BLOCK 
          : QualityGateDecision.WARN;
      }
    }

    return QualityGateDecision.PASS;
  }

  private topologicalSort(steps: PipelineStep[]): PipelineStep[] {
    // 简化拓扑排序：按 dependencies 顺序
    return [...steps].sort((a, b) => {
      if (a.dependencies?.includes(b.stepId)) return 1;
      if (b.dependencies?.includes(a.stepId)) return -1;
      return 0;
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ========== PipelineEngine 工厂函数 ==========

export function createPipelineEngine(config: PipelineConfig): PipelineEngine {
  return new PipelineEngine(config);
}

export default PipelineEngine;

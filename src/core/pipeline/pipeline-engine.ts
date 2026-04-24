import { PipelineStep, StepInput, StepOutput, PipelineOptions } from './step.interface';
import { PipelineStatus, PipelineStepId, StepStatus, type PipelineExecutionState, PipelineContext } from './pipeline.types';

export type { PipelineStep };

export interface PipelineEngineEventHandler {
  onStepProgress?: (stepId: string, progress: number, message?: string) => void;
  onStepFail?: (stepId: string, error: string) => void;
  onQualityGate?: (stepId: string, decision: string, details?: string) => void;
  onComplete?: (results: Map<string, StepOutput>) => void;
}

export class PipelineEngine {
  private steps: PipelineStep[] = [];
  private options: PipelineOptions;
  private status: PipelineStatus = PipelineStatus.IDLE;
  private eventHandler?: PipelineEngineEventHandler;

  constructor(options: PipelineOptions = {}) {
    this.options = options;
  }

  onEvents(handler: PipelineEngineEventHandler): void {
    this.eventHandler = handler;
  }

  getStatus(): PipelineExecutionState {
    return {
      workflowId: '',
      status: this.status,
      stepStates: new Map(),
      context: new Map() as unknown as PipelineContext,
    } as PipelineExecutionState;
  }

  pause(): boolean {
    this.status = PipelineStatus.PAUSED;
    return true;
  }

  async resume(): Promise<StepOutput> {
    this.status = PipelineStatus.RUNNING;
    return this.run({} as StepInput);
  }

  cancel(): void {
    this.status = PipelineStatus.CANCELLED;
  }

  addStep(step: PipelineStep): this {
    this.steps.push(step);
    return this;
  }

  async run(input: StepInput): Promise<StepOutput> {
    this.status = PipelineStatus.RUNNING;
    let context: StepInput = { ...input };

    for (const step of this.steps) {
      try {
        this.options.onProgress?.(step.id, 0);
        const result = await step.process(context);
        context = { ...context, ...result };
        this.options.onProgress?.(step.id, 1);
      } catch (error) {
        this.options.onError?.(step.id, error as Error);
        throw error;
      }
    }

    this.status = PipelineStatus.COMPLETED;
    this.options.onComplete?.(context as StepOutput);
    return context as StepOutput;
  }

  getSteps(): PipelineStep[] {
    return [...this.steps];
  }
}

// Factory function for creating pipeline engine
export function createPipelineEngine(config: any): PipelineEngine {
  return new PipelineEngine();
}

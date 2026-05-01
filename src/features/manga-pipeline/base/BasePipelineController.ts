/**
 * BasePipelineController
 * 漫剧流水线步骤的基类，统一处理检查点、暂停/恢复、质量门控等公共逻辑
 */

import { PipelineStep, StepInput, StepOutput } from '@/core/pipeline/step.interface';

export enum StepState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface PipelineControllerOptions {
  id: string;
  name: string;
  enableCheckpoint?: boolean;
  enableQualityGate?: boolean;
}

export abstract class BasePipelineController implements PipelineStep {
  abstract id: string;
  abstract name: string;

  protected _state: StepState = StepState.IDLE;
  protected _checkpoint: any = null;
  protected _progress: number = 0;
  protected _error: Error | null = null;
  protected _pauseResolver: (() => void) | null = null;
  protected _isPaused: boolean = false;

  // Sub-classes should set their sub-steps here
  protected subSteps: string[] = [];
  protected currentSubStep: number = 0;

  get state() { return this._state; }
  get progress() { return this._progress; }
  get error() { return this._error; }
  get isPaused() { return this._isPaused; }

  /**
   * Template method pattern - sub-classes implement the actual processing
   */
  protected abstract processStep(input: StepInput): Promise<StepOutput>;

  /**
   * Sub-classes report progress by calling this.updateProgress(value)
   */
  protected updateProgress(value: number, subStepName?: string) {
    this._progress = Math.min(100, Math.max(0, value));
    if (subStepName && this.subSteps.length > 0) {
      const idx = this.subSteps.indexOf(subStepName);
      if (idx >= 0) this.currentSubStep = idx;
    }
    this.onProgressCallback?.({
      stepId: this.id,
      progress: this._progress,
      message: subStepName || this.name,
    });
  }

  /**
   * Pause point - call this during long operations to enable pause/resume
   */
  protected async pauseCheck(): Promise<void> {
    if (this._isPaused) {
      await new Promise<void>(resolve => {
        this._pauseResolver = resolve;
      });
    }
  }

  /**
   * Checkpoint support - save intermediate state
   */
  protected saveCheckpoint(data: any) {
    this._checkpoint = {
      stepId: this.id,
      completed: false,
      data,
      timestamp: Date.now(),
    };
  }

  checkpointOnError(data: any) {
    this._checkpoint = {
      stepId: this.id,
      completed: false,
      data,
      timestamp: Date.now(),
    };
  }

  // PipelineStep interface
  async process(input: StepInput): Promise<StepOutput> {
    this._state = StepState.RUNNING;
    this._progress = 0;
    this._error = null;

    try {
      const output = await this.processStep(input);
      this._state = StepState.COMPLETED;
      this._progress = 100;
      if (this._checkpoint) {
        this._checkpoint.completed = true;
      }
      return output;
    } catch (err) {
      this._state = StepState.FAILED;
      this._error = err instanceof Error ? err : new Error(String(err));
      throw this._error;
    }
  }

  getCheckpoint() {
    return this._checkpoint;
  }

  restore(state: any): void {
    this._checkpoint = state;
  }

  // Pause/Resume API
  pause(): Promise<void> {
    if (this._state === StepState.RUNNING) {
      this._isPaused = true;
      this._state = StepState.PAUSED;
      return new Promise(resolve => {
        this._pauseResolver = resolve;
      });
    }
    return Promise.resolve();
  }

  resume(): void {
    if (this._isPaused || this._state === StepState.PAUSED) {
      this._isPaused = false;
      this._state = StepState.RUNNING;
      if (this._pauseResolver) {
        this._pauseResolver();
        this._pauseResolver = null;
      }
    }
  }

  cancel(): void {
    this._isPaused = false;
    this._state = StepState.FAILED;
    this._error = new Error('Cancelled by user');
    if (this._pauseResolver) {
      this._pauseResolver();
      this._pauseResolver = null;
    }
  }

  reset(): void {
    this._state = StepState.IDLE;
    this._progress = 0;
    this._error = null;
    this._isPaused = false;
    this._pauseResolver = null;
    this._checkpoint = null;
  }

  // Progress callback for UI binding
  onProgressCallback?: (event: { stepId: string; progress: number; message: string }) => void;
  onProgress(handler: NonNullable<typeof this.onProgressCallback>) {
    this.onProgressCallback = handler;
    return this;
  }
}

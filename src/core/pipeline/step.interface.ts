export interface StepInput extends Record<string, unknown> {}
export interface StepOutput extends Record<string, unknown> {}

export interface CheckpointState<S = unknown> {
  stepId: string;
  completed: boolean;
  data: S;
  timestamp: number;
}

import { PipelineExecutionMode } from './pipeline.types';

export interface PipelineStep<S = unknown> {
  id: string;
  name: string;
  mode?: PipelineExecutionMode;
  process(input: StepInput): Promise<StepOutput>;
  getCheckpoint(): CheckpointState<S> | null;
  restore(state: CheckpointState<S>): void;
}

export interface PipelineOptions {
  onProgress?: (stepId: string, progress: number) => void;
  onComplete?: (output: StepOutput) => void;
  onError?: (stepId: string, error: Error) => void;
}

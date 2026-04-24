export interface StepInput {
  [key: string]: any;
}

export interface StepOutput {
  [key: string]: any;
}

export interface CheckpointState {
  stepId: string;
  completed: boolean;
  data: any;
  timestamp: number;
}

import { PipelineExecutionMode } from './pipeline.types';

export interface PipelineStep {
  id: string;
  name: string;
  mode?: PipelineExecutionMode;
  process(input: StepInput): Promise<StepOutput>;
  getCheckpoint(): CheckpointState | null;
  restore(state: CheckpointState): void;
}

export interface PipelineOptions {
  onProgress?: (stepId: string, progress: number) => void;
  onComplete?: (output: StepOutput) => void;
  onError?: (stepId: string, error: Error) => void;
}

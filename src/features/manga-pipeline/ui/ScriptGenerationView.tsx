import React, { useState, useCallback } from 'react';

import { GenerationResult } from '@/shared/components/pipeline/GenerationResult';
import { PipelineControls } from '@/shared/components/pipeline/PipelineControls';
import { PipelineProgress } from '@/shared/components/pipeline/PipelineProgress';

import { ScriptGenerationPipeline, ScriptGenerationResult } from '../steps/step1-script-generation/pipeline-controller';
import type { Script } from '../steps/step1-script-generation/types/script';

interface Props {
  onScriptGenerated?: (script: Script) => void;
}

export const ScriptGenerationView: React.FC<Props> = ({ onScriptGenerated }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subStepName, setSubStepName] = useState('');
  const [result, setResult] = useState<ScriptGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pipeline controller ref for pause/resume/skip
  const pipelineRef = React.useRef<ScriptGenerationPipeline | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      setError('请输入小说文本');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);
    setResult(null);
    setIsPaused(false);

    try {
      const pipeline = new ScriptGenerationPipeline();
      pipelineRef.current = pipeline;

      // Wire up progress callback
      pipeline.onProgress((event) => {
        setProgress(event.progress);
        setSubStepName(event.message);
      });

      const output = await pipeline.process({ text, title: title || '未命名剧本' });
      const scriptResult = (output as any).scriptGeneration as ScriptGenerationResult;
      setResult(scriptResult);
      setProgress(100);
      setSubStepName('完成');
      onScriptGenerated?.(scriptResult.script);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setIsGenerating(false);
      pipelineRef.current = null;
    }
  }, [text, title, onScriptGenerated]);

  const handlePause = useCallback(async () => {
    if (pipelineRef.current) {
      await pipelineRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const handleResume = useCallback(() => {
    if (pipelineRef.current) {
      pipelineRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  const handleSkip = useCallback(() => {
    // Skip is handled at the pipeline level internally
    // Just log for now
  }, []);

  const handleCancel = useCallback(() => {
    if (pipelineRef.current) {
      pipelineRef.current.cancel();
      setIsGenerating(false);
      setIsPaused(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    pipelineRef.current?.reset();
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📝 AI 脚本生成</h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="script-title" className="block text-sm font-medium mb-2">
            剧本标题（可选）
          </label>
          <input
            id="script-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="输入剧本标题"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            disabled={isGenerating}
          />
        </div>

        <div>
          <label htmlFor="script-text" className="block text-sm font-medium mb-2">
            小说原文
          </label>
          <textarea
            id="script-text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="粘贴小说文本，支持第X章、Chapter X 等章节标记..."
            rows={12}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-sm"
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-500 mt-1">
            {text.length} 字符 | {text.split(/第\S*章|Chapter \d+/i).length - 1} 章节
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !text.trim()}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? '生成中...' : '🎬 生成剧本'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div className="flex justify-between items-start">
            <span>❌ {error}</span>
            <button
              onClick={handleRetry}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              重试
            </button>
          </div>
        </div>
      )}

      {/* Progress Section */}
      {isGenerating && (
        <div className="mb-6 bg-white border rounded-lg p-4 space-y-4">
          <PipelineProgress
            progress={progress}
            stepName={subStepName}
            isIndeterminate={false}
          />
          <PipelineControls
            isRunning={isGenerating}
            isPaused={isPaused}
            canSkip={true}
            canRetry={false}
            onAction={(action) => {
              switch (action) {
                case 'pause': handlePause(); break;
                case 'resume': handleResume(); break;
                case 'skip': handleSkip(); break;
                case 'cancel': handleCancel(); break;
              }
            }}
          />
        </div>
      )}

      {/* Result Section */}
      {result && !isGenerating && (
        <GenerationResult
          title={result.script.title}
          grade={result.metadata.grade}
          evaluationScore={result.metadata.evaluationScore}
          metadata={{
            chaptersCount: result.metadata.chaptersCount,
            eventsCount: result.metadata.eventsCount,
            charactersCount: result.metadata.charactersCount,
            scenesCount: result.metadata.scenesCount,
          }}
          scenes={result.script.scenes.map(s => ({
            id: s.id,
            sceneNumber: s.sceneNumber,
            location: s.location,
            timeOfDay: s.timeOfDay,
            emotion: s.emotion,
            content: s.content,
            cameraHint: s.cameraHint,
            type: s.type,
            transition: s.transition,
          }))}
          characters={result.script.characters.map(c => ({
            id: c.id,
            name: c.name,
            personality: c.personality,
            speakingStyle: c.speakingStyle,
          }))}
          maxScenesToShow={5}
        />
      )}
    </div>
  );
};

export default ScriptGenerationView;

# API 概述

PlotCraft 提供模块化的服务 API，用于 AI 驱动的视频创作。

## 核心服务

| 服务 | 描述 | 状态 |
|------|------|------|
| `aiService` | 统一 AI 文本生成（多模型支持） | ✅ 稳定 |
| `imageGenerationService` | 多提供商图像生成 | ✅ 稳定 |
| `ttsService` | 文本转语音合成 | ✅ 稳定 |
| `lipSyncService` | 唇形同步动画 | ✅ 稳定 |
| `pipelineService` | 端到端视频创作流水线 | ✅ 稳定 |
| `storyboardService` | 分镜管理 | ✅ 稳定 |
| `characterService` | 角色管理 | ✅ 稳定 |
| `videoExportService` | 视频合成与导出 | ✅ 稳定 |

## 服务架构

```
应用程序
    │
    ▼
┌─────────────────────────────────────────┐
│              核心服务层                   │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐  ┌──────────────┐     │
│  │  AI 文字生成  │  │  图像生成    │     │
│  │  (多模型)    │  │  (多模型)    │     │
│  └──────┬───────┘  └──────┬───────┘     │
│         │                  │              │
│  ┌──────▼───────┐  ┌──────▼───────┐     │
│  │  TTS 语音    │  │  唇形同步    │     │
│  │  合成        │  │  动画        │     │
│  └──────────────┘  └──────────────┘     │
│                                          │
│  ┌──────────────┐  ┌──────────────┐     │
│  │  视频创作    │  │  视频导出    │     │
│  │  流水线      │  │  合成        │     │
│  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────┘
```

## 使用示例

```typescript
import {
  aiService,
  imageGenerationService,
  ttsService,
  pipelineService,
} from '@/core/services';

// 1. AI 生成脚本
const script = await aiService.generate({
  model: 'glm-5',
  prompt: '为智能手表广告生成30秒视频脚本，包含3个场景',
  options: { maxTokens: 2048, temperature: 0.8 }
});

// 2. 生成场景图像
const image = await imageGenerationService.generateImage({
  prompt: '现代城市夜景，电影级灯光，温暖色调',
  model: 'seedream-5.0',
  resolution: '16:9'
});

// 3. 语音合成
const audio = await ttsService.synthesize({
  text: '欢迎使用 PlotCraft，让创意触手可及',
  provider: 'cosyvoice',
  voice: 'zh-CN-XiaoxiaoNeural',
  emotion: 'happy'
});

// 4. 运行完整流水线
const result = await pipelineService.run({
  input: novelText,
  steps: ['import', 'analyze', 'script', 'storyboard', 'render', 'export'],
  options: { quality: 'high', resolution: '1080p' }
});
```

## 服务配置

### 环境变量

```bash
# 文字生成（必选）
VITE_ALIBABA_API_KEY=your-key

# 图像生成（推荐）
VITE_SEEDDREAM_API_KEY=your-key

# 语音合成
VITE_TTS_PROVIDER=edge
```

## 类型安全

所有服务均使用 TypeScript 接口，提供完整类型支持：

```typescript
import type {
  GenerationOptions,
  ImageGenerationOptions,
  TTSConfig,
  PipelineOptions,
} from '@/core/services';
```

## 错误处理

服务会抛出带类型的错误：

```typescript
try {
  await aiService.generate({ prompt: 'hello' });
} catch (error) {
  if (error.code === 'API_KEY_MISSING') {
    console.error('请配置 AI API Key');
  }
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.error('请求频率超限，请稍后重试');
  }
}
```

## 服务可用性

| 服务 | Web | Desktop | 状态 |
|------|-----|---------|------|
| aiService | ✅ | ✅ | 稳定 |
| imageGenerationService | ✅ | ✅ | 稳定 |
| ttsService | ✅ | ✅ | 稳定 |
| lipSyncService | ✅ | ✅ | 稳定 |
| pipelineService | ✅ | ✅ | 稳定 |
| storyboardService | ✅ | ✅ | 稳定 |
| characterService | ✅ | ✅ | 稳定 |
| videoExportService | ⚠️ | ✅ | Beta |

## 下一步

- [AI 服务](./ai-service.md) - 文字生成
- [图像生成](./image-generation.md) - 图像合成
- [TTS 服务](./tts-service.md) - 语音合成

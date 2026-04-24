# 渲染与导出

从故事板和资产生成最终视频。

## 渲染管线

```
┌─────────────────────────────────────────────────────────────────────┐
│                        渲染管线                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐    ┌─────────────┐    ┌──────────┐    ┌──────────┐ │
│  │ 故事板  │───▶│  图像生成   │───▶│  口型同步 │───▶│   合成   │ │
│  └─────────┘    └─────────────┘    └──────────┘    └──────────┘ │
│       │               │                 │               │         │
│       │               │                 │               ▼         │
│       │               │                 │         ┌──────────┐   │
│       │               ▼                 ▼         │   导出   │   │
│       │         ┌─────────────┐    ┌──────────┐   └──────────┘   │
│       │         │    角色     │    │   音频    │                  │
│       │         │    图片     │    │   TTS    │                  │
│       │         └─────────────┘    └──────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 渲染步骤

### 1. 场景图像生成

为每个故事板帧生成图像：

```typescript
import { imageGenerationService } from '@/core/services';

const result = await imageGenerationService.generateImage(
  '侦探在昏暗办公室里的戏剧性场景，黑色电影风格',
  {
    model: 'seedream-5.0',  // 或 'flux', 'dalle-3'
    resolution: '16:9',
    quality: 'high',
  }
);
```

**支持的模型**：

| 模型 | 提供商 | 适用于 |
|-------|----------|----------|
| `seedream-5.0` | MiniMax | 动画、插画 |
| `flux` | Replicate | 逼真、写实 |
| `dalle-3` | OpenAI | 创意、艺术 |
| `sdxl` | Stability | 稳定、可靠 |

### 2. 角色图像生成

生成角色肖像：

```typescript
import { imageGenerationService } from '@/core/services';

const result = await imageGenerationService.generateImage(
  '年轻亚裔男性侦探的肖像，表情严肃',
  {
    model: 'seedream-5.0',
    characterId: 'detective_01',  // 用于一致性
  }
);
```

### 3. 口型同步动画

将角色唇部运动与音频同步：

```typescript
import { lipSyncService } from '@/core/services';

const result = await lipSyncService.syncLip(
  characterImageUrl,   // 角色肖像
  audioUrl,           // TTS 或录音
  {
    model: 'wav2lip',  // 或 'facerender'
    quality: 'high',
  }
);
```

### 4. 音频生成（TTS）

生成语音音频：

```typescript
import { ttsService } from '@/core/services';

const result = await ttsService.synthesize({
  text: '您好，欢迎观看节目。',
  config: {
    provider: 'edge',  // 或 'elevenlabs', 'alibaba'
    voice: 'zh-CN-XiaoxiaoNeural',
    speed: 1.0,
    pitch: 1.0,
  },
});
```

## 视频合成

组装最终视频：

```typescript
import { videoCompositorService } from '@/core/services';

const result = await videoCompositorService.composeVideo(
  scenes,  // 场景对象数组
  {
    format: 'mp4',
    resolution: '1080p',
    fps: 30,
    transitions: ['fade', 'dissolve'],
  }
);
```

## 导出选项

### 格式

| 格式 | 扩展名 | 编解码器 | 适用于 |
|--------|-----------|-------|----------|
| MP4 | `.mp4` | H.264 | 通用兼容性 |
| WebM | `.webm` | VP9 | 网络、透明 |
| MOV | `.mov` | ProRes | 后期制作 |

### 质量预设

| 预设 | 分辨率 | 码率 | 文件大小（1分钟） |
|--------|------------|---------|-------------------|
| 720p | 1280×720 | 5 Mbps | ~35 MB |
| 1080p | 1920×1080 | 10 Mbps | ~70 MB |
| 4K | 3840×2160 | 35 Mbps | ~250 MB |

### 导出设置

```typescript
interface ExportOptions {
  format: 'mp4' | 'webm' | 'mov';
  resolution: '720p' | '1080p' | '4K';
  fps: 24 | 30 | 60;
  quality: 'low' | 'medium' | 'high';
  includeSubtitles: boolean;
  includeAudio: boolean;
}
```

## 漫画管线

对于漫画/动漫风格输出：

```typescript
import { mangaPipelineService } from '@/core/services';

const result = await mangaPipelineService.generateFromNovel(
  novelContent,
  scenes.map(scene => ({
    id: scene.id,
    description: scene.description,
    imagePrompt: scene.imagePrompt,
    dialogue: scene.dialogue,
    character: scene.character,
  })),
  {
    image: { model: 'seedream-5.0' },
    video: { model: 'seedance-2.0' },
    lipSync: { model: 'wav2lip' },
  }
);
```

## 进度跟踪

```typescript
mangaPipelineService.onProgress((progress) => {
  console.log(`阶段：${progress.stage}`);
  console.log(`总体进度：${progress.overallProgress}%`);
  console.log(`阶段进度：${progress.stageProgress}%`);
  console.log(`场景：${progress.currentSceneIndex + 1}/${progress.totalScenes}`);
});
```

## 下一步

- [API 概览](../api/overview.md) - 技术 API 参考
- [部署](../deployment/build.md) - 构建和部署
- [工作流概览](workflow-overview.md) - 返回工作流

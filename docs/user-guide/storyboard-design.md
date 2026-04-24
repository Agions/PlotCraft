# 故事板设计

将脚本转换为可视化故事板帧。

## 概述

故事板制作将脚本转换为一系列可视化面板，每个面板描述：
- **场景内容** - 视觉上发生了什么
- **摄像机角度** - 镜头类型（全景、中景、特写）
- **构图** - 元素如何排列
- **时长** - 帧应该持续多长时间

## StoryboardFrame 结构

```typescript
interface StoryboardFrame {
  id: string;
  title: string;
  sceneDescription: string;    // 视觉描述
  composition: string;         // 例如："三分法"、"中心构图"
  cameraType: CameraType;     // wide | medium | closeup | pan | tilt | dolly
  dialogue?: string;          // 关联的对话
  duration: number;            // 时长（秒）
  imageUrl?: string;          // 生成的图片（可选）
}
```

## 摄像机类型

| 类型 | 描述 | 用途 |
|------|-------------|----------|
| `wide` | 全景 | 场景设定 |
| `medium` | 中景 | 对话 |
| `closeup` | 特写 | 情感、细节 |
| `pan` | 横摇 | 跟随动作 |
| `tilt` | 竖摇 | 垂直揭示 |
| `dolly` | 推拉 | 强调 |
| `tracking` | 跟随 | 移动 |

## 构图类型

| 类型 | 中文 | 描述 |
|------|---------|-------------|
| `center` | 中心构图 | 主体居中 |
| `rule-of-thirds` | 三分法 | 1/3 网格对齐 |
| `diagonal` | 对角线 | 动态角度 |
| `leading-lines` | 引导线 | 线条引导视线 |
| `framing` | 框架式 | 自然框架 |
| `negative-space` | 留白 | 极简主义 |
| `symmetrical` | 对称式 | 平衡 |
| `triangular` | 三角形 | 稳定性 |

## 故事板编辑器

### 界面

- **左侧面板**：帧列表（缩略图）
- **中间**：预览/编辑所选帧
- **右侧面板**：帧属性

### 操作

1. **生成帧**：AI 从脚本生成帧
2. **添加帧**：手动插入新帧
3. **删除帧**：删除选中的帧
4. **重新排序**：拖动重新排序帧
5. **生成图片**：为帧创建图片
6. **批量生成**：生成所有帧图片

## AI 生成

### 从脚本生成

```typescript
import { getStoryboardService } from '@/features/storyboard';

const service = getStoryboardService();

const frames = await service.generateFromScript(
  { title: '场景 1', content: scriptText },
  {
    provider: 'alibaba',
    model: 'qwen-3.5',
    frameCount: 8,  // 要生成的帧数
  }
);
```

### 生成帧图片

```typescript
// 生成单帧
const imageUrl = await service.generateFrameImage(frameId, {
  model: 'seedream-5.0',
});

// 生成所有帧并显示进度
const images = await service.generateAllFrameImages(
  { model: 'seedream-5.0' },
  (current, total) => {
    console.log(`已生成 ${current}/${total}`);
  }
);
```

## 最佳实践

1. **覆盖范围**：包含场景设定的全景 + 情感特写
2. **连续性**：确保帧之间逻辑流畅
3. **节奏**：变化镜头类型以保持视觉兴趣
4. **时长**：平衡 - 每帧通常 3-5 秒

## 下一步

故事板设计后：
- [角色设计](character-design.md) - 设计您的角色
- [渲染与导出](rendering-export.md) - 生成最终视频
- [工作流概览](workflow-overview.md) - 返回工作流

# 架构

PlotCraft 采用基于功能模块化的架构。

## 高层架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                           PLOTCRAFT 应用                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │   页面      │───▶│  功能模块   │───▶│  共享模块   │            │
│  │  (路由)     │    │  (领域驱动) │    │  (通用)    │            │
│  └─────────────┘    └─────────────┘    └─────────────┘            │
│                           │                    │                    │
│                           ▼                    ▼                    │
│                    ┌─────────────────────────────┐                │
│                    │      核心服务                │                │
│                    │  (AI、流水线、工作流)       │                │
│                    └─────────────────────────────┘                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 目录结构

```
src/
├── app/                    # 应用入口
├── pages/                 # 路由级页面
├── features/              # 功能模块 (领域驱动)
│   ├── workflow/          # 工作流引擎
│   ├── project/           # 项目管理
│   ├── script/            # 脚本生成
│   ├── storyboard/        # 分镜编辑器
│   ├── character/         # 角色设计
│   ├── video/             # 视频播放
│   ├── audio/             # 音频处理
│   └── ...
├── shared/                # 共享基础设施
│   ├── components/        # 可复用 UI 组件
│   ├── hooks/             # 可复用 React Hooks
│   ├── services/          # 基础设施服务
│   │   ├── api/           # HTTP 客户端
│   │   └── storage/       # 存储抽象
│   ├── stores/            # Zustand 状态存储
│   ├── types/             # 共享类型定义
│   └── utils/             # 工具函数
├── core/                  # 核心服务 (遗留代码, 兼容性)
│   ├── config/            # 配置
│   ├── services/          # 核心服务实现
│   ├── hooks/             # 核心 Hooks
│   └── stores/            # 遗留存储重导出
└── styles/                # 全局样式
```

## 功能模块结构

每个功能遵循一致的结构:

```
features/[功能名称]/
├── components/           # 功能特定的 React 组件
│   ├── ComponentName.tsx
│   └── ComponentName.module.less
├── hooks/                # 功能特定的 Hooks
│   └── useFeatureHook.ts
├── services/             # 功能特定的服务
│   └── feature.service.ts
├── types/                # 功能特定的类型
│   └── types.ts
└── index.ts              # 公开 API (桶导出)
```

## 关键设计模式

### 1. 单例服务

服务使用单例模式管理全局状态:

```typescript
// shared/services/storage/storage.service.ts
class StorageService {
  private static instance: StorageService;

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
}

export const storageService = StorageService.getInstance();
```

### 2. 功能模块

功能模块是自包含的,边界清晰:

```typescript
// features/workflow/index.ts
export { WorkflowEditor } from './components/WorkflowEditor';
export { useWorkflow } from './hooks/useWorkflow';
export { workflowService } from './services/workflow.service';
export type { WorkflowState } from './types';
```

### 3. 共享类型

类型集中在 shared/types:

```typescript
// shared/types/index.ts
export interface StoryboardFrame {
  id: string;
  title: string;
  sceneDescription: string;
  // ...
}
```

### 4. Zustand 存储

领域特定的状态管理:

```typescript
// shared/stores/workflow.store.ts
export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      currentStep: 'import',
      status: 'idle',
      // ...
    }),
    { name: 'workflow-storage' }
  )
);
```

## 服务架构

### AI 服务层

```
┌─────────────────────────────────────────┐
│           AI 服务 (ai.service.ts)       │
├─────────────────────────────────────────┤
│  统一接口,支持所有 AI 提供商             │
│  - 阿里巴巴 (Qwen)                       │
│  - OpenAI (GPT)                         │
│  - DeepSeek                             │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐    ┌───────────────┐
│ 图片服务      │    │ TTS 服务      │
│               │    │               │
│ - Seedream    │    │ - Edge TTS    │
│ - FLUX        │    │ - ElevenLabs  │
│ - DALL-E      │    │ - 阿里巴巴    │
└───────────────┘    └───────────────┘
```

### 工作流引擎

n8n 风格的可视化工作流引擎:

```typescript
interface WorkflowDefinition {
  id: string;
  nodes: WorkflowNode[];      // 处理节点
  connections: Connection[];  // 数据流
  settings: WorkflowSettings; // 执行配置
}

interface WorkflowNode {
  id: string;
  type: NodeType;            // 节点类别
  inputs: Port[];            // 输入端口
  outputs: Port[];           // 输出端口
  config: NodeConfig;         // 节点特定配置
}
```

## 状态管理

### 存储架构

| 存储 | 用途 | 持久化 |
|------|------|--------|
| `appStore` | UI 状态 (主题、通知) | 否 |
| `projectStore` | 项目数据 | 是 (localStorage) |
| `workflowStore` | 工作流状态 | 是 (localStorage) |
| `userStore` | 用户偏好 | 是 (localStorage) |
| `videoEditorStore` | 时间线/编辑器状态 | 否 |

### 数据流

```
用户操作 → Hook → 存储更新 → 组件重渲染
                    ↓
              副作用 (API 调用等)
                    ↓
              存储更新 (包含结果)
```

## 安全性

### API 密钥管理

- API 密钥存储在环境变量中 (`VITE_*`)
- 密钥不会暴露在客户端包中 (Tauri 桌面端)
- Web 模式通过后端代理进行 API 调用

### 内容安全

- 用户内容在 AI 处理前进行清理
- 生成的内容经过策略合规性过滤
- AI API 调用限流

## 性能

### 优化策略

1. **代码分割**: Vite 处理自动分块
2. **懒加载**: 功能按需加载
3. **记忆化**: 昂贵组件使用 React.memo
4. **防抖**: 输入处理器防抖
5. **虚拟化**: 大列表使用虚拟滚动

## 下一步

- [项目结构](project-structure.md) - 详细文件组织
- [服务](services.md) - 服务实现
- [状态管理](state-management.md) - 存储模式

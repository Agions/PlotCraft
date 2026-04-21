# ═══════════════════════════════════════════════════════════
#
#    🎬 PlotCraft — AI驱动的专业视频脚本创作平台
#
#    7+ AI Models  ·  7-Step Workflow  ·  MIT License
#
# ═══════════════════════════════════════════════════════════

<div align="center">

![PlotCraft Banner](https://img.shields.io/badge/PlotCraft-FF6B35?style=for-the-badge&logo=video&logoColor=white)

### _将你的故事转化为专业级视频内容，从创意到成品的完整AI工作流_

[![Version](https://img.shields.io/badge/Version-3.0.0-FF6B35?style=for-the-badge&logo=package&logoColor=white)](https://github.com/Agions/PlotCraft/releases)
[![License](https://img.shields.io/badge/License-MIT-45B8AC?style=for-the-badge&logo=license&logoColor=white)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Stars](https://img.shields.io/badge/Stars-⭐-f6c90e?style=for-the-badge&logo=star&logoColor=white)](https://github.com/Agions/PlotCraft/stargazers)
[![CI](https://img.shields.io/badge/CI-GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/Agions/PlotCraft/actions)

[![Docs](https://img.shields.io/badge/Docs-在线访问-7B68EE?style=for-the-badge&logo=book&logoColor=white)](https://agions.github.io/PlotCraft)
[![Issues](https://img.shields.io/badge/Issues-问题反馈-d5362b?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Agions/PlotCraft/issues)

</div>

---

## 🎯 核心特性

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   📥 智能导入          🤖 多模型AI          🎬 智能分镜  │
│   ───────────         ───────────         ───────────  │
│   小说/剧本/提示词      7+ 模型支持           AI自动生成   │
│   自动编码检测         文字/图像/语音        多比例支持   │
│   智能章节切分         按需切换模型          可视化编辑   │
│                                                         │
│   🎭 角色一致性        👄 唇形同步           ⚡ 可视化工作流│
│   ───────────         ───────────         ───────────  │
│   种子机制             TTS语音对齐           类n8n引擎   │
│   参考图锁定           多语言支持            拖拽连接     │
│   批量零走样           情感语气调节          条件分支循环  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 七步工作流

```
  📥 导入  ──▶  🧠 AI分析  ──▶  📝 脚本生成  ──▶  🎬 分镜设计
      │                                              │
      │          ┌──────────────────────┐           │
      └──────────┤                      ├──▶ 📤 导出
                  ▼                      │
              🖼️ 批量渲染  ◀──  🎭 角色设计
                   │
                   ▼
              🎞️ 合成视频
```

| 步骤 | 功能 | 关键配置 |
|:---:|------|----------|
| 📥 导入 | 小说/剧本/提示词 | 编码检测、智能分章 |
| 🧠 AI分析 | 识别章节结构、角色、场景 | 多模型并行 |
| 📝 脚本生成 | AI生成结构化视频脚本 | 模型选择、集数配置 |
| 🎬 分镜设计 | 自动生成分镜图 | 比例、分辨率 |
| 🎭 角色设计 | AI创建角色保持一致 | 风格、一致性强度 |
| 🖼️ 批量渲染 | 多模型并行渲染场景 | 引擎、光照、调色 |
| 📤 合成导出 | 一键合成视频 | 格式、画质 |

---

## 🛠️ 技术栈

| 类别 | 技术 |
|:---:|------|
| **前端框架** | React 18 · TypeScript 5 · Vite |
| **UI 组件** | Ant Design 5 · Styled Components |
| **状态管理** | Zustand |
| **动画** | Framer Motion |
| **桌面端** | Tauri 2.0 (Rust) |
| **国际化** | i18next |
| **测试** | Jest · Vitest |
| **文档** | VitePress |

---

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/Agions/PlotCraft.git
cd PlotCraft

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建桌面应用
npm run tauri build
```

> 💡 **提示**：需要配置 `.env` 文件中的 API Key 才能使用 AI 功能，详见[配置指南](https://agions.github.io/PlotCraft/#/getting-started/configuration)

---

## 🤖 支持的AI模型（2026年更新）

### 📝 文字生成

| 提供商 | 模型 | 发布日期 |
|-------|------|----------|
| 智谱 | GLM-5 | 2026年2月 |
| MiniMax | M2.5 | 2026年2月 |
| 月之暗面 | Kimi K2.5 | 2026年 |
| 字节跳动 | Doubao 2.0 | 2026年 |
| 阿里云 | Qwen 2.5 | 2026年 |
| 百度 | ERNIE 4.0 | 2026年 |

### 🖼️ 图像生成

| 提供商 | 模型 | 特性 | 发布日期 |
|-------|------|------|----------|
| 字节跳动 | Seedream 5.0 | 2K直出、AI 4K增强、控制笔刷 | 2026年2月10日 |
| 快手 | Kling 1.6 | 图像+视频生成 | 2026年 |
| 生数科技 | Vidu 2.0 | 图像+视频生成 | 2026年 |

### 🎬 视频生成

| 提供商 | 模型 | 特性 | 发布日期 |
|-------|------|------|----------|
| 字节跳动 | Seedance 2.0 | 文/图/视频输入、镜头一致 | 2026年2月12日 |
| 快手 | Kling 1.6 | AI视频生成 | 2026年 |
| 生数科技 | Vidu 2.0 | AI视频生成 | 2026年 |

### 🎤 语音合成

| 提供商 | 模型/服务 | 特性 |
|-------|----------|------|
| 阿里云 | CosyVoice 2.0 | 开源、3秒克隆、方言/情感支持 |
| 阿里云 | KAN-TTS | 神经网络+领域知识、多语言 |
| 百度 | TTS | 中文优化 |
| 科大讯飞 | TTS | 多语言支持 |

---

## 📁 项目结构

```
PlotCraft/
├── src/
│   ├── app/                      # 应用入口
│   ├── features/                  # 功能模块
│   │   ├── ai/                    # AI功能
│   │   ├── audio/                 # 音频
│   │   ├── character/             # 角色
│   │   ├── editor/                # 编辑器
│   │   ├── home/                  # 首页
│   │   ├── notification/          # 通知
│   │   ├── project/              # 项目
│   │   ├── script/                # 脚本
│   │   ├── storyboard/            # 分镜
│   │   └── video-export/          # 视频导出
│   ├── components/
│   │   ├── ui/                    # 基础UI组件
│   │   ├── layout/                # 布局组件
│   │   └── business/              # 业务组件
│   ├── core/
│   │   ├── services/              # API服务
│   │   ├── stores/                # 状态管理
│   │   ├── config/                # 配置
│   │   ├── hooks/                 # 自定义钩子
│   │   ├── data/                  # 静态数据
│   │   └── types/                 # 类型定义
│   ├── shared/                    # 共享模块
│   │   ├── services/              # 公共服务
│   │   ├── stores/                # 共享状态
│   │   └── types/                 # 共享类型
│   └── pages/                     # 页面
├── src-tauri/                     # Tauri桌面后端(Rust)
├── public/                        # 静态资源
├── docs/                          # 文档(docsify)
└── scripts/                       # 构建脚本
```

---

## 📚 文档

| 文档 | 链接 |
|------|------|
| 🚀 快速开始 | [在线访问](https://agions.github.io/PlotCraft/#/getting-started/quick-start) |
| 📖 用户指南 | [在线访问](https://agions.github.io/PlotCraft/#/user-guide/workflow-overview) |
| 🔧 开发指南 | [在线访问](https://agions.github.io/PlotCraft/#/developer-guide/architecture) |
| 📡 API参考 | [在线访问](https://agions.github.io/PlotCraft/#/api/overview) |
| 🚢 部署指南 | [在线访问](https://agions.github.io/PlotCraft/#/deployment/build) |

---

<div align="center">

## 🌟 支持这个项目

如果你觉得 PlotCraft 有帮助，请给我们一个 ⭐！

[![Star](https://img.shields.io/badge/点击Star⭐-f6c90e?style=for-the-badge&logo=star&logoColor=white)](https://github.com/Agions/PlotCraft/stargazers)

---

## 📄 许可证

MIT License · © 2026 Agions

[![License](https://img.shields.io/badge/License-MIT-45B8AC?style=for-the-badge&logo=license&logoColor=white)](https://opensource.org/licenses/MIT)

---

_💫 PlotCraft — 将你的故事转化为专业级视频内容_

</div>

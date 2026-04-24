<!--
  ╔══════════════════════════════════════════════════════════╗
  ║  PlotCraft README — Animated & Professional Edition       ║
  ╚══════════════════════════════════════════════════════════╝
-->
<style>
/* ── Reset & Base ─────────────────────────────────────── */
@keyframes flowGradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes typewriter {
  from { width: 0; }
  to   { width: 100%; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
@keyframes scanLight {
  0%   { left: -100%; }
  100% { left: 200%; }
}
@keyframes breathe {
  0%, 100% { box-shadow: 0 0 15px rgba(255,107,53,0.3); }
  50%      { box-shadow: 0 0 35px rgba(255,107,53,0.7); }
}
@keyframes footerGlow {
  0%, 100% { text-shadow: 0 0 10px rgba(69,184,172,0.4); }
  50%      { text-shadow: 0 0 30px rgba(69,184,172,0.9), 0 0 60px rgba(69,184,172,0.4); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes iconSpin {
  0%   { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}
@keyframes borderGlow {
  0%, 100% { border-color: rgba(255,107,53,0.4); }
  50%      { border-color: rgba(255,107,53,1); }
}
@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
}
@keyframes tableRowSlide {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes h2Underline {
  from { width: 0; }
  to   { width: 60px; }
}
@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes starPulse {
  0%, 100% { filter: drop-shadow(0 0 5px #f6c90e); }
  50%      { filter: drop-shadow(0 0 20px #f6c90e); }
}

/* ── Gradient Banner ───────────────────────────────────── */
.plotcraft-banner {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(-45deg, #0a0a0f, #1a1a2e, #16213e, #0f3460, #1a1a2e);
  background-size: 400% 400%;
  animation: flowGradient 12s ease infinite;
  padding: 24px 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 28px;
  border: 1px solid rgba(255,107,53,0.25);
  position: relative;
  overflow: hidden;
}
.plotcraft-banner::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(69,184,172,0.05) 100%);
  pointer-events: none;
}
.banner-title {
  font-size: 1.9em;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px;
  letter-spacing: 1px;
  animation: heroFadeIn 0.8s ease-out;
}
.banner-subtitle {
  color: rgba(255,255,255,0.75);
  font-size: 1.05em;
  margin: 0;
  animation: heroFadeIn 1s ease-out 0.2s both;
}
.banner-tagline {
  display: inline-block;
  color: rgba(255,255,255,0.55);
  font-size: 0.9em;
  margin-top: 10px;
  animation: heroFadeIn 1s ease-out 0.4s both;
}

/* ── Hero Badges ───────────────────────────────────────── */
.badges-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 18px 0;
  animation: fadeIn 1.2s ease-out 0.3s both;
}
.badges-container a {
  text-decoration: none;
  transition: transform 0.3s ease, filter 0.3s ease;
}
.badges-container a:hover {
  transform: translateY(-3px) scale(1.05);
  filter: brightness(1.2);
}
.badge-star {
  animation: badgePulse 3s ease-in-out infinite;
}

/* ── Section H2 Animations ─────────────────────────────── */
.h2-section {
  position: relative;
  margin-top: 36px;
  margin-bottom: 16px;
  font-size: 1.5em;
  font-weight: 700;
  color: #e8e8e8;
  padding-bottom: 8px;
  animation: slideUp 0.6s ease-out;
}
.h2-section::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, #FF6B35, #45B8AC, #FF6B35);
  background-size: 200% 100%;
  animation: flowGradient 3s ease infinite, h2Underline 0.8s ease-out forwards;
  border-radius: 2px;
}

/* ── Feature Cards ─────────────────────────────────────── */
.features-box {
  background: linear-gradient(145deg, rgba(26,26,46,0.9), rgba(15,52,96,0.7));
  border: 1px solid rgba(255,107,53,0.2);
  border-radius: 14px;
  padding: 22px 18px;
  margin: 10px 0 24px;
  animation: slideUp 0.7s ease-out 0.1s both;
  position: relative;
  overflow: hidden;
}
.features-box::before {
  content: '';
  position: absolute;
  top: -50%; left: -100%;
  width: 60%; height: 200%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
  animation: scanLight 5s ease-in-out infinite;
  pointer-events: none;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 14px;
}
@media (max-width: 800px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .features-grid { grid-template-columns: 1fr; }
}
.feature-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 14px 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  animation: slideUp 0.5s ease-out both;
  position: relative;
  overflow: hidden;
  cursor: default;
}
.feature-card::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(255,107,53,0.2), 0 4px 12px rgba(0,0,0,0.4);
  border-color: rgba(255,107,53,0.5);
  animation: borderGlow 1.5s ease-in-out infinite;
}
.feature-card:hover::after {
  left: 200%;
  animation: scanLight 0.8s ease-out;
}
.feature-card:nth-child(1) { animation-delay: 0.05s; }
.feature-card:nth-child(2) { animation-delay: 0.1s; }
.feature-card:nth-child(3) { animation-delay: 0.15s; }
.feature-card:nth-child(4) { animation-delay: 0.2s; }
.feature-card:nth-child(5) { animation-delay: 0.25s; }
.feature-card:nth-child(6) { animation-delay: 0.3s; }
.feature-card:nth-child(7) { animation-delay: 0.35s; }
.feature-card:nth-child(8) { animation-delay: 0.4s; }
.feature-icon {
  font-size: 1.6em;
  display: inline-block;
  transition: transform 0.4s ease;
}
.feature-card:hover .feature-icon {
  animation: iconSpin 0.6s ease-in-out;
}
.feature-title {
  font-weight: 700;
  font-size: 0.95em;
  color: #FF6B35;
  margin: 6px 0 4px;
}
.feature-desc {
  font-size: 0.82em;
  color: rgba(255,255,255,0.6);
  line-height: 1.45;
  margin: 0;
}
.feature-divider {
  font-size: 0.75em;
  color: rgba(255,255,255,0.25);
  margin: 3px 0;
}

/* ── Workflow ──────────────────────────────────────────── */
.workflow-section {
  animation: slideUp 0.6s ease-out;
}
.workflow-pre {
  background: linear-gradient(135deg, rgba(10,10,15,0.95), rgba(22,33,62,0.9));
  border: 1px solid rgba(255,107,53,0.2);
  border-radius: 10px;
  padding: 18px 22px;
  color: rgba(255,255,255,0.85);
  font-size: 0.9em;
  line-height: 1.6;
  overflow-x: auto;
  margin-bottom: 20px;
}

/* ── Tables ────────────────────────────────────────────── */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0 22px;
  animation: fadeIn 0.8s ease-out;
}
thead tr {
  background: linear-gradient(90deg, rgba(255,107,53,0.15), rgba(69,184,172,0.1));
}
th {
  padding: 10px 14px;
  text-align: left;
  font-size: 0.88em;
  color: #FF6B35;
  border-bottom: 2px solid rgba(255,107,53,0.3);
  font-weight: 700;
}
td {
  padding: 9px 14px;
  font-size: 0.88em;
  color: rgba(255,255,255,0.78);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
tr {
  transition: background 0.25s ease;
  animation: tableRowSlide 0.5s ease-out both;
}
tbody tr:nth-child(1)  { animation-delay: 0.05s; }
tbody tr:nth-child(2)  { animation-delay: 0.1s; }
tbody tr:nth-child(3)  { animation-delay: 0.15s; }
tbody tr:nth-child(4)  { animation-delay: 0.2s; }
tbody tr:nth-child(5)  { animation-delay: 0.25s; }
tbody tr:nth-child(6)  { animation-delay: 0.3s; }
tbody tr:nth-child(7)  { animation-delay: 0.35s; }
tbody tr:hover {
  background: rgba(255,107,53,0.08);
}
tr:last-child td {
  border-bottom: none;
}

/* ── Code Block ────────────────────────────────────────── */
pre {
  background: linear-gradient(135deg, #0d0d14, #1a1a2e);
  border: 1px solid rgba(255,107,53,0.2);
  border-radius: 10px;
  padding: 18px 22px;
  overflow-x: auto;
  animation: slideUp 0.6s ease-out;
}
code {
  color: #e8e8e8;
  font-size: 0.88em;
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}
:not(pre) > code {
  background: rgba(255,107,53,0.1);
  padding: 2px 7px;
  border-radius: 4px;
  color: #FF6B35;
}

/* ── Doc Links Grid ────────────────────────────────────── */
.doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 10px 0 24px;
}
.doc-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 14px 16px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideUp 0.5s ease-out both;
}
.doc-card:nth-child(1) { animation-delay: 0.05s; }
.doc-card:nth-child(2) { animation-delay: 0.1s; }
.doc-card:nth-child(3) { animation-delay: 0.15s; }
.doc-card:nth-child(4) { animation-delay: 0.2s; }
.doc-card:nth-child(5) { animation-delay: 0.25s; }
.doc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 22px rgba(255,107,53,0.18);
  border-color: rgba(255,107,53,0.45);
}
.doc-icon {
  font-size: 1.3em;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}
.doc-card:hover .doc-icon {
  animation: iconSpin 0.5s ease-in-out;
}
.doc-label {
  font-size: 0.88em;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
}
.doc-link-text {
  font-size: 0.78em;
  color: #45B8AC;
}

/* ── Star Section ──────────────────────────────────────── */
.star-section {
  text-align: center;
  padding: 28px 16px;
  animation: slideUp 0.7s ease-out;
}
.star-section a {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s ease;
}
.star-section a:hover {
  transform: scale(1.08) translateY(-3px);
}
.star-text {
  font-size: 1.1em;
  color: rgba(255,255,255,0.85);
  margin-bottom: 14px;
}
.star-badge {
  animation: starPulse 2.5s ease-in-out infinite;
}

/* ── Footer ─────────────────────────────────────────────── */
.footer-section {
  text-align: center;
  padding: 24px 16px 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: 32px;
  animation: fadeIn 1s ease-out;
}
.footer-text {
  color: rgba(255,255,255,0.5);
  font-size: 0.88em;
  animation: footerGlow 3s ease-in-out infinite;
}
.footer-tagline {
  color: rgba(255,255,255,0.35);
  font-size: 0.82em;
  margin-top: 8px;
  animation: breathe 4s ease-in-out infinite;
}

/* ── Separator ──────────────────────────────────────────── */
.separator {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(69,184,172,0.3), transparent);
  margin: 28px 0;
  animation: fadeIn 1s ease-out;
}

/* ── Hint Block ─────────────────────────────────────────── */
.hint-block {
  background: rgba(69,184,172,0.08);
  border-left: 3px solid #45B8AC;
  border-radius: 0 8px 8px 0;
  padding: 10px 16px;
  margin: 12px 0;
  animation: slideUp 0.5s ease-out;
}
.hint-block p {
  margin: 0;
  font-size: 0.88em;
  color: rgba(255,255,255,0.75);
}
</style>

# ═══════════════════════════════════════════════════════════

<div class="plotcraft-banner">

# 🎬 PlotCraft — AI驱动的专业视频脚本创作平台

**7+ AI Models  ·  7-Step Workflow  ·  MIT License**

</div>

<div align="center">

![PlotCraft Banner](https://img.shields.io/badge/PlotCraft-FF6B35?style=for-the-badge&logo=video&logoColor=white)

### _将你的故事转化为专业级视频内容，从创意到成品的完整AI工作流_

<div class="badges-container">

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

</div>

---

## 🎯 核心特性

<div class="features-box">

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

<div class="features-grid">

<div class="feature-card">
<div class="feature-icon">📥</div>
<div class="feature-title">智能导入</div>
<div class="feature-desc">小说/剧本/提示词<br>自动编码检测<br>智能章节切分</div>
</div>

<div class="feature-card">
<div class="feature-icon">🤖</div>
<div class="feature-title">多模型AI</div>
<div class="feature-desc">7+ 模型支持<br>文字/图像/语音<br>按需切换模型</div>
</div>

<div class="feature-card">
<div class="feature-icon">🎬</div>
<div class="feature-title">智能分镜</div>
<div class="feature-desc">AI自动生成<br>多比例支持<br>可视化编辑</div>
</div>

<div class="feature-card">
<div class="feature-icon">🎭</div>
<div class="feature-title">角色一致性</div>
<div class="feature-desc">种子机制<br>参考图锁定<br>批量零走样</div>
</div>

<div class="feature-card">
<div class="feature-icon">👄</div>
<div class="feature-title">唇形同步</div>
<div class="feature-desc">TTS语音对齐<br>多语言支持<br>情感语气调节</div>
</div>

<div class="feature-card">
<div class="feature-icon">⚡</div>
<div class="feature-title">可视化工作流</div>
<div class="feature-desc">类n8n引擎<br>拖拽连接<br>条件分支循环</div>
</div>

<div class="feature-card">
<div class="feature-icon">🖼️</div>
<div class="feature-title">批量渲染</div>
<div class="feature-desc">多模型并行<br>引擎/光照/调色<br>2K直出+AI 4K</div>
</div>

<div class="feature-card">
<div class="feature-icon">📤</div>
<div class="feature-title">一键导出</div>
<div class="feature-desc">多格式支持<br>画质可配置<br>自动化合成</div>
</div>

</div>

</div>

---

## 🔄 七步工作流

<div class="workflow-section">

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

</div>

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

<div class="hint-block">

> 💡 **提示**：需要配置 `.env` 文件中的 API Key 才能使用 AI 功能，详见[配置指南](https://agions.github.io/PlotCraft/#/getting-started/configuration)

</div>

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

<div class="doc-grid">

[![🚀 快速开始](https://img.shields.io/badge/🚀_快速开始-在线访问-45B8AC?style=for-the-badge&logo=rocket&logoColor=white)](https://agions.github.io/PlotCraft/#/getting-started/quick-start)

[![📖 用户指南](https://img.shields.io/badge/📖_用户指南-在线访问-7B68EE?style=for-the-badge&logo=book&logoColor=white)](https://agions.github.io/PlotCraft/#/user-guide/workflow-overview)

[![🔧 开发指南](https://img.shields.io/badge/🔧_开发指南-在线访问-FF6B35?style=for-the-badge&logo=code&logoColor=white)](https://agions.github.io/PlotCraft/#/developer-guide/architecture)

[![📡 API参考](https://img.shields.io/badge/📡_API参考-在线访问-FFC131?style=for-the-badge&logo=api&logoColor=white)](https://agions.github.io/PlotCraft/#/api/overview)

[![🚢 部署指南](https://img.shields.io/badge/🚢_部署指南-在线访问-61DAFB?style=for-the-badge&logo=ship&logoColor=white)](https://agions.github.io/PlotCraft/#/deployment/build)

</div>

---

<div class="star-section">

## 🌟 支持这个项目

如果你觉得 PlotCraft 有帮助，请给我们一个 ⭐！

<div class="star-badge">

[![Star](https://img.shields.io/badge/点击Star⭐-f6c90e?style=for-the-badge&logo=star&logoColor=white)](https://github.com/Agions/PlotCraft/stargazers)

</div>

---

## 📄 许可证

MIT License · © 2026 Agions

[![License](https://img.shields.io/badge/License-MIT-45B8AC?style=for-the-badge&logo=license&logoColor=white)](https://opensource.org/licenses/MIT)

---

<div class="footer-tagline">

_💫 PlotCraft — 将你的故事转化为专业级视频内容_

</div>

</div>

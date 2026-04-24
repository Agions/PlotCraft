# 安装

PlotCraft 的详细安装说明。

## 系统要求

### 最低要求
- **操作系统**：Windows 10+、macOS 10.15+、Ubuntu 20.04+
- **内存**：8GB
- **存储空间**：2GB 可用空间
- **网络**：稳定的互联网连接（用于 AI API 调用）

### 推荐配置
- **内存**：16GB+
- **显卡**：NVIDIA 6GB+ 显存 GPU（用于本地渲染加速）
- **存储空间**：SSD 10GB+ 可用空间

## 安装方法

### 方法一：Web 开发（推荐）

```bash
# 克隆仓库
git clone https://github.com/Agions/PlotCraft.git
cd PlotCraft

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

应用运行在 `http://localhost:5173`。

### 方法二：桌面应用（Tauri 2.0）

#### 前置条件

**macOS/Linux：**

```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# macOS 额外依赖
brew installwebkit2gtk python3 gtkmm3 libsoup3
```

**Windows：**

- 安装 [Rust](https://rustup.rs/)
- 安装 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

#### 构建桌面应用

```bash
# 安装依赖
npm install

# 构建 Tauri 应用
npm run tauri build
```

构建输出位于 `src-tauri/target/release/bundle/`

## 依赖

### 核心依赖

| 包 | 版本 | 用途 |
|-----|------|------|
| react | ^18.2 | UI 框架 |
| react-dom | ^18.2 | DOM 渲染 |
| vite | ^4.4 | 构建工具 |
| typescript | ^5.0 | 类型安全 |
| zustand | ^4.4 | 状态管理 |
| antd | ^5.11 | UI 组件库 |
| @tauri-apps/api | ^2.0 | 桌面集成 |
| framer-motion | ^12.10 | 动画 |

### AI 服务依赖

| 包 | 用途 |
|-----|------|
| axios | HTTP 客户端 |
| i18next | 国际化 |

## 故障排除

### 端口已被占用

```bash
# 查找并终止占用 5173 端口的进程
lsof -i :5173
kill -9 <PID>
```

### TypeScript 错误

```bash
# 清除缓存并重新安装
rm -rf node_modules
npm install
```

### Tauri 构建失败

```bash
# 更新 Rust
rustup update

# 验证 Rust 安装
rustc --version
cargo --version
```

## 下一步

- [配置指南](./configuration.md)
- [快速入门](./quick-start.md)

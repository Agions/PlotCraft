# AI 服务

跨多个提供商的统一 AI 文本生成接口。

## 概述

AIService 提供单一接口，可使用多种 AI 提供商（阿里通义千问、OpenAI GPT、DeepSeek 等）生成文本内容。

## 导入

```typescript
import { aiService } from '@/core/services';
```

## 方法

### generate()

使用 AI 生成文本内容。

```typescript
async generate(
  prompt: string,
  options?: GenerationOptions
): Promise<GenerationResult>
```

**参数：**

| 参数 | 类型 | 描述 |
|-------|------|-------------|
| `prompt` | `string` | 输入提示或指令 |
| `options.provider` | `string` | 使用的 AI 提供商 |
| `options.model` | `string` | 模型名称 |
| `options.maxTokens` | `number` | 最大响应 token 数 |
| `options.temperature` | `number` | 随机性 (0-2) |
| `options.systemPrompt` | `string` | 系统提示词 |

**返回：**

```typescript
interface GenerationResult {
  content: string;
  tokens: number;
  provider: string;
  model: string;
  finishReason: 'stop' | 'length' | 'content_filter';
  metadata?: Record<string, any>;
}
```

**示例：**

```typescript
const result = await aiService.generate(
  '写一段侦探和嫌疑人之间的戏剧性场景。',
  {
    provider: 'alibaba',
    model: 'qwen-3.5',
    maxTokens: 1000,
    temperature: 0.8,
  }
);

console.log(result.content);
// "侦探倾身向前，仔细研究着嫌疑人的面孔..."
console.log(result.tokens);
// 256
```

### analyze()

分析内容并提取结构化信息。

```typescript
async analyze(
  content: string,
  options?: AnalysisOptions
): Promise<AnalysisResult>
```

**示例：**

```typescript
const analysis = await aiService.analyze(
  '很久以前，在一个遥远的王国里，住着一名勇敢的骑士...',
  {
    type: 'novel',
    extractCharacters: true,
    extractThemes: true,
  }
);

// 结果：
// {
//   characters: [{ name: '骑士', description: '勇敢' }],
//   themes: ['勇敢', '王国'],
//   sentiment: '冒险'
// }
```

### chat()

多轮对话。

```typescript
async chat(
  messages: ChatMessage[],
  options?: ChatOptions
): Promise<ChatResult>
```

**示例：**

```typescript
const result = await aiService.chat([
  { role: 'system', content: '你是一个有用的助手。' },
  { role: 'user', content: '什么是视频制作？' },
]);
```

## 支持的提供商

| 提供商 | 模型 | 能力 |
|----------|-------|-------------|
| 阿里云 | qwen-3.5 | 对话、分析、生成 |
| OpenAI | gpt-4, gpt-3.5-turbo | 对话、分析、生成 |
| DeepSeek | deepseek-chat | 对话、分析 |
| Azure | gpt-4 | 对话、分析 |

## 配置

### 环境变量

```bash
VITE_ALIBABA_API_KEY=***
VITE_OPENAI_API_KEY=***
VITE_DEEPSEEK_API_KEY=***
```

### 默认提供商

在 `src/core/config/app.config.ts` 中设置：

```typescript
export const appConfig = {
  ai: {
    defaultProvider: 'alibaba',
    defaultModel: 'qwen-3.5',
  },
};
```

## 错误处理

```typescript
try {
  const result = await aiService.generate(prompt);
} catch (error) {
  if (error.code === 'API_KEY_MISSING') {
    console.error('请在 .env.local 中设置您的 API 密钥');
  }
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // 等待并重试
    await sleep(1000);
    return aiService.generate(prompt);
  }
  if (error.code === 'CONTENT_POLICY_VIOLATION') {
    console.error('内容违反政策');
  }
}
```

## 最佳实践

1. **系统提示词** - 用于设置上下文
2. **Temperature** - 较低 (0.1-0.3) 适用于事实性内容，较高 (0.7-1.0) 适用于创意内容
3. **Max Tokens** - 合理设置以避免截断
4. **错误处理** - 始终使用 try/catch 包装
5. **缓存** - 缓存重复的提示词

## 速率限制

| 提供商 | 请求数/分钟 | Token数/分钟 |
|----------|--------------|------------|
| 阿里云 | 60 | 10000 |
| OpenAI | 500 | 150000 |
| DeepSeek | 120 | 20000 |

# PanelFlow Development Guide

## Project Overview

PanelFlow is a professional AI-powered video script creation platform that transforms stories and scripts into polished video content.

## Tech Stack

- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite
- **UI Library**: Ant Design 5
- **State Management**: Zustand
- **Desktop**: Tauri (Rust)
- **Animation**: Framer Motion

## Project Structure

```
src/
├── core/                      # Core modules
│   ├── config/               # Configuration
│   │   ├── app.config.ts    # App config
│   │   └── models.config.ts  # AI model config
│   ├── services/            # Business services
│   │   ├── ai.service.ts    # AI service
│   │   ├── video.service.ts # Video processing
│   │   └── ...
│   ├── stores/              # State management
│   │   ├── app.store.ts     # App state
│   │   ├── project.store.ts # Project state
│   │   └── workflow.store.ts# Workflow state
│   ├── types/               # Type definitions
│   └── utils/               # Utilities
│       ├── requestCache.ts   # Request cache
│       └── retryRequest.ts   # Retry mechanism
├── components/              # UI components
│   ├── common/             # Common components
│   ├── layout/             # Layout components
│   └── business/           # Business components
│       └── VideoEditor/     # Video editor (decoupled)
├── context/                 # React Context
└── pages/                   # Page components
```

## Development Guide

### Adding a New Service

1. Create service file under `src/core/services/`
2. Use singleton pattern for export
3. Export from `src/core/services/index.ts`

```typescript
// Example: src/core/services/example.service.ts
class ExampleService {
  // Service logic
}

export const exampleService = new ExampleService();
```

### Adding New State

1. Create store file under `src/core/stores/`
2. Use Zustand's persist middleware
3. Configure debounced storage for performance

```typescript
// Example: src/core/stores/example.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDebouncedStorage } from './middlewares/persistWithDebounce';

interface ExampleState {
  data: string;
  setData: (data: string) => void;
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      data: '',
      setData: (data) => set({ data }),
    }),
    {
      name: 'example-storage',
      storage: createJSONStorage(() => createDebouncedStorage(localStorage, 1000)),
    }
  )
);
```

### Adding New Components

1. Create component directory under `src/components/`
2. Follow component decomposition principles
3. Use hooks to separate logic

### AI Service Usage

```typescript
import { aiService } from '@/core/services/ai.service';

// Generate script
const script = await aiService.generateScript(model, settings, {
  topic: 'Topic',
  style: 'professional',
  tone: 'formal',
  length: 'medium',
  audience: 'Technical audience',
  language: 'en',
});

// Stream generation
for await (const chunk of aiService.streamGenerate(prompt, options)) {
  // Handle stream output
  updateUI(chunk);
}

// Batch generation
const results = await aiService.batchGenerate(prompts, {
  model: 'glm-5',
  provider: 'zhipu',
  concurrency: 3,
});
```

### Using Workflow Store

```typescript
import { useWorkflowStore, STEP_ORDER } from '@/core/stores/workflow.store';

// Start workflow
useWorkflowStore.getState().startWorkflow('import');

// Update step progress
useWorkflowStore.getState().setStepProgress('generate', 50);

// Complete step with data
useWorkflowStore.getState().completeStep('generate', { script: data });

// Validate step
const { valid, errors } = useWorkflowStore.getState().validateStep('generate');
```

## Commands

```bash
# Development mode
npm run dev

# Build
npm run build

# Type check
npm run build:check

# Run tests
npm test

# Fast tests with coverage
npm run test:fast

# Watch mode
npm run test:watch

# Run tests for changed files only
npm run test:changed

# Run tests with coverage report
npm run test:coverage

# Build Tauri desktop app
npm run tauri build

# Lint
npm run lint

# Auto-fix lint issues
npm run lint:fix
```

## Testing

- Use TypeScript strict mode
- Use functional components + Hooks
- Follow React component decomposition principles
- Use ESLint + Prettier formatting
- Format commit messages using Conventional Commits

## Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system changes |
| `ci` | CI/CD configuration changes |
| `chore` | Other changes |
| `revert` | Reverting previous changes |

### Examples

```bash
# Feature
git commit -m "feat(editor): add video preview functionality"

# Bug fix
git commit -m "fix(workflow): resolve pipeline cancellation issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(services): extract common retry logic"
```

## Versioning & Releases

We use `standard-version` for automated versioning and CHANGELOG generation.

```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new features, backward compatible)
npm run release:minor

# Major release (breaking changes)
npm run release:major
```

This will:
1. Bump version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Commit changes

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- ai.service.test.ts

# Watch mode
npm test -- --watch
```

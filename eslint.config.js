import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import importFlatRecommended from 'eslint-plugin-import/config/flat/recommended.js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'src-tauri/**',
      'docs/**',
      '.github/**',
      'scripts/**',
      'src/__tests__/__mocks__/**',
    ],
  },

  // Base recommended rules from ESLint
  eslint.configs.recommended,

  // TypeScript ESLint recommended (flat)
  ...tseslint.configs['flat/recommended'],

  // React recommended (flat)
  { ...reactPlugin.configs.flat.recommended },

  // React Hooks recommended (flat)
  {
    plugins: { 'react-hooks': reactHooksPlugin },
    ...reactHooksPlugin.configs.flat['recommended-latest'],
  },

  // JSX A11y recommended (flat format)
  { ...jsxA11y.flatConfigs.recommended },

  // Import plugin flat config with TypeScript resolver
  {
    plugins: { import: importPlugin },
    ...importFlatRecommended,
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...importFlatRecommended.rules,
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Disable formatting rules that conflict with Prettier
  prettier,

  // Project-specific rule overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-restricted-types': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off',
    },
  },

  // Test file overrides
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['src/__tests__/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

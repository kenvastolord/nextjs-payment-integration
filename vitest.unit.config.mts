import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',

    include: [
      'src/**/*.unit.test.ts',
      'src/**/*.unit.spec.ts',
      'tests/**/*.unit.test.ts',
      'tests/**/*.unit.spec.ts',
    ],

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/e2e/**',
      '**/*.integration.test.ts',
      '**/*.integration.spec.ts',
    ],

    setupFiles: ['./tests/setup/setup-unit.ts'],

    clearMocks: true,
    restoreMocks: true,
    mockReset: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/unit',
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/coverage/**',
        '**/tests/**',
      ],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});

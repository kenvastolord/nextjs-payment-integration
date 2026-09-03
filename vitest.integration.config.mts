import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    name: 'integration',
    globals: true,
    environment: 'node',

    include: [
      'src/**/*.integration.test.ts',
      'src/**/*.integration.spec.ts',
    ],

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/e2e/**',
      '**/*.unit.test.ts',
      '**/*.unit.spec.ts',
    ],

    setupFiles: ['./tests/setup/setup-unit.ts'],

    clearMocks: true,
    restoreMocks: true,
    mockReset: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/integration',
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

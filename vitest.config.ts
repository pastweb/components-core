/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

const WEB_REGEX = 'tests/**/*.web.test.{js,ts,jsx,tsx}';
const NODE_REGEX = 'tests/**/*.node.test.{js,ts,jsx,tsx}';

export default defineConfig({
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
    projects: [
      {
        test: {
          name: 'DOM',
          environment: 'happy-dom',
          include: [WEB_REGEX],
        },
      },
      {
        test: {
          name: 'NODE',
          environment: 'node',
          include: [NODE_REGEX],
        },
      },
    ],
  },
});

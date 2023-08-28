import { defineConfig } from 'vite';
import { resolve } from 'path';

import pages from './pages.config';

const pagesInput = {};

pages.forEach((page) => {
  pagesInput[page.name] = resolve(page.path);
});

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      input: {
        ...pagesInput,
      },
    },
  },
});

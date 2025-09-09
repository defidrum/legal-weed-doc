import { defineConfig, mergeConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

import viteBaseConfig from './vitest.config';

export default mergeConfig(
  viteBaseConfig,
  defineConfig({
    plugins: [
      tsconfigpaths(),
      ViteEjsPlugin({
        VERSION: JSON.stringify(process.env.npm_package_version),
      }),
      react(), // Ensure React plugin is included
    ],
    build: {
      sourcemap: true,
      outDir: resolve(__dirname, "dist"),
    },
    define: {
      global: "window",
    },
    root: resolve(__dirname, "./src"),
    server: {
      port: 3000,
      strictPort: true,
    },
  })
);
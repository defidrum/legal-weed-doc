import { defineConfig, mergeConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import tsconfigpaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tsconfigpaths(),
    ViteEjsPlugin({
      VERSION: JSON.stringify(process.env.npm_package_version),
    }),
  ],
  build: {
    sourcemap: true,
    outDir: resolve(__dirname, "dist"),
  },
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  root: resolve(__dirname, "./src"),
  server: {
    port: 3000,
    strictPort: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
})
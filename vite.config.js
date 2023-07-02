import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    manifest: true,
    sourcemap: false,
    minify: 'terser', // Use Terser for minification
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['solid-js', 'solid-js/web'],
  },
  esbuild: {
    jsxInject: `import { createSignal, Show, lazy } from 'solid-js';`,
  },
});

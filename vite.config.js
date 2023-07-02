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
    sourcemap: false, // Disabling sourcemaps for production
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: '[name].[hash].js', // Adding hash to the output file names for cache busting
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500, // Adjusting the chunk size warning limit based on your application's needs
  },
  optimizeDeps: {
    include: ['solid-js', 'solid-js/web'], // Explicitly include SolidJS and its web runtime to optimize dependencies
  },
  esbuild: {
    jsxInject: `import { createSignal, Show, lazy } from 'solid-js';`, // Injecting SolidJS imports for ESBuild optimization
  },
});

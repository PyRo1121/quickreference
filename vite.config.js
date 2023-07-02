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
    terserOptions: {
      compress: {
        passes: 2, // Run the compressor multiple times
        module: true, // Optimize for ES6 modules
        unused: true, // Drop unreferenced functions/variables
        dead_code: true, // Remove unreachable code
        hoist_funs: true, // Hoist function declarations
        join_vars: true, // Join consecutive var statements
      },
      output: {
        comments: false, // Remove comments from output
      },
      mangle: {
        // Optionally mangle properties.
        properties: {
          regex: /^_/, // Mangle property names with _ prefix
        },
      },
    },
    rollupOptions: {
      treeshake: true, // Enable tree-shaking
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
    cacheDir: '.vite_cache', // Specify a cache directory
  },
  optimizeDeps: {
    include: ['solid-js', 'solid-js/web'],
  },
  esbuild: {
    jsxInject: `import { createSignal, Show, lazy } from 'solid-js';`,
  },
});

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    target: 'esnext',
    minify: 'terser', // Use terser for minification
    cssCodeSplit: true, // Enable CSS extraction
    rollupOptions: {
      treeshake: true, // Enable tree shaking
      output: {
        manualChunks: undefined, // Allow rollup to automatically split chunks
      },
    },
    brotliSize: true, // Enable Brotli compression
    chunkSizeWarningLimit: 2000, // Increase the chunk size warning limit if needed
  },
  optimizeDeps: {
    include: ['solid-js'], // Include specific dependencies for optimization
    exclude: [], // Exclude specific dependencies from optimization
    link: 'esm', // Use ECMAScript modules for linked dependencies
    allowNodeBuiltins: false, // Do not include Node.js built-ins in the bundle
  },
  mode: 'production', // Enable production mode optimizations
});


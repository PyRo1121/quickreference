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
    minify: true,
    commonjsOptions: {
      // Options for optimizing CommonJS output
      ignoreDynamicRequires: true,
      transformMixedEsModules: true,
    },
    esbuildOptions: {
      // Options for optimizing ES modules output
      target: 'es2015',
    },
  },
  optimizeDeps: {
    dynamicImport: true,
  },
});

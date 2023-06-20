import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { sentryVitePlugin } from '@sentry/vite-plugin';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export default defineConfig(async () => {
  const cloudflare = await import('solid-start-cloudflare-pages');

  return {
    plugins: [
      solidPlugin({ adapter: cloudflare.default({}) }),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,

        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and need `project:releases` and `org:read` scopes
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    ],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      target: 'esnext',
      sourcemap: true, // Source map generation must be turned on
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
  };
});

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

/**
 * The app is written as ordinary React and runs on Preact through
 * preact/compat, which `@preact/preset-vite` aliases in automatically.
 *
 * Why: React plus ReactDOM was 72KB gzipped, the single largest thing a
 * visitor downloaded. Preact does the same job here in roughly 15KB. On
 * Nigerian mobile data that is the difference worth having, and nothing in
 * this app uses an API that preact/compat does not cover.
 *
 * Nothing in src/ imports Preact directly. Every file still imports from
 * 'react', so this decision can be reversed by swapping the plugin back.
 *
 * `base: './'` keeps the build portable: it works from a domain root, from a
 * GitHub Pages project sub-path, or from a local file preview.
 */
export default defineConfig({
  base: './',
  plugins: [preact(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/sidebar.jsx',
      name: 'Sidebar',
      fileName: () => 'sidebar.js',
      formats: ['iife'],
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'sidebar.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/SQL-FINAL-WORK---DATABASES-1/',
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      ssr: false,
      rollupOptions: {
        input: 'index.html'
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  };
});

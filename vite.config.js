import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração para o Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define a porta de desenvolvimento
  },
  build: {
    outDir: 'dist', // Pasta de saída para o build de produção
  },
  base: '/frontend-teste/',
  proxy: {
    '/api': {
      target: 'http://18.188.250.67:5000',
      changeOrigin: true,
      secure: false,
    },
  },
});





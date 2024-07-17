import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import { createProxyMiddleware as createProxy } from 'http-proxy-middleware';
import path from 'path'; // Importa el módulo 'path'

export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server: {
    proxy: {
      '/Prod': {
        target: 'https://3ebxnyhhp1.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/Prod/, '/Prod'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Usa 'path.resolve' correctamente
    },
  },
});

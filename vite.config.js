import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        rubros: resolve(__dirname, 'rubros.html'),
        clientes: resolve(__dirname, 'clientes.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Recommended for the newest Sass versions
      },
    },
  },
});

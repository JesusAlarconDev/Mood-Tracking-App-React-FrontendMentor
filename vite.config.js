import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige cualquier ruta que empiece con '/api'
      '/api': {
        target: 'http://localhost:3000', // La URL de tu backend
        changeOrigin: true, // Importante para la virtualización
        secure: false, // Puedes dejarlo en false en desarrollo local
      },
    },
  },
})

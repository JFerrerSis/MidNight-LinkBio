import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto habilita la exposición a la red local
    port: 5173  // Puedes asegurar el puerto aquí también
  }
})

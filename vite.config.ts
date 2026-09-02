import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import spaRedirect from 'vite-plugin-spa-redirect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    spaRedirect()
  ],
  base: '/weather-frontend-app/',
})

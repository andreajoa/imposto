import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: { 'import.meta.env.VITE_DEPLOY_CONTEXT': JSON.stringify(process.env.VERCEL_ENV || 'production') },
})

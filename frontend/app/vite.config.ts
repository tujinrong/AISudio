// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // load .env

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE || 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 去掉 /api 前缀
        }
      }
    }
  }
})

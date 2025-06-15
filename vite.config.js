import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    server: {
        allowedHosts: ['frontend'],
        host: true,
        port: 3000,
    },
    base: '/dev'
})

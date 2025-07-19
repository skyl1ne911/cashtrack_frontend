import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    
    server: {
        // proxy: {
        //     '/api': {
        //         target: "https://backend/",
        //         changeOrigin: true,
        //         secure: false,
        //         // configure: (proxy, options) => {
        //         //     proxy.on('proxyReq', (proxyReq, req, res) => {
        //         //         proxyReq.setHeader('Origin', 'https://localhost:3000');
        //         //     });
        //         // }
        //     }
            
        // },
        // allowedHosts: ['frontend'],
        host: true,
        port: 3000,
    },
    base: '/web'
})

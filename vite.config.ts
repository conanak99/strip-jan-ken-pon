import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    base: process.env.PUBLIC_URL || '/',
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
})

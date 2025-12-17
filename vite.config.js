import { defineConfig } from 'vite'
import fs from 'fs'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
    root: 'src',           // Your source files are in ./src
    base: './',            // Use relative paths in built HTML
    publicDir: 'assets',
    build: {
        outDir: '../dist',   // Built files go to ./dist (relative to vite.config.js)
        emptyOutDir: true,   // Clean outDir before building
    },
    server: {
        https: {
            key: fs.readFileSync(`./ssl/192.168.1.70-key.pem`),
            cert: fs.readFileSync(`./ssl/192.168.1.70.pem`),
        }
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'images/pico_logo.png',
                'fonts/Montserrat.ttf',
                'fonts/SymbolsRounded.ttf',
                'locales/en/translation.json',
                'locales/it/translation.json'
            ],
            manifest: {
                name: 'Template',
                short_name: 'Template',
                start_url: '/',
                display: 'standalone',
                background_color: 'transparent',
                theme_color: '#0f172a',
                icons: [
                    {
                        src: 'images/pico_logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
})

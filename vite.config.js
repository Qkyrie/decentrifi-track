import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from "vite-plugin-babel-macros"
import svgr from "vite-plugin-svgr";


export default defineConfig({
    esbuild: {
        loader: "jsx",
        include: [
            // Add this for business-as-usual behaviour for .jsx and .tsx files
            "src/**/*.jsx",
            "src/**/*.tsx",
            "node_modules/**/*.jsx",
            "node_modules/**/*.tsx",

            // Add these lines to allow all .js files to contain JSX
            "src/**/*.js",
            "node_modules/**/*.js",

            // Add these lines to allow all .ts files to contain JSX
            "src/**/*.ts",
            "node_modules/**/*.ts",
        ],
    },
    // depending on your application, base can also be "/"
    base: './',
    plugins: [svgr(), react(), macrosPlugin()],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000
        port: 3000,
    },
})
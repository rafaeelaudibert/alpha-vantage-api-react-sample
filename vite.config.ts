import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    react(),           // Self-explanatory
    viteSingleFile()   // Bundles everything into a single file, simplifies deployment to GH Pages
  ],
})

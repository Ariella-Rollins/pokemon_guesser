import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  base: '/pokemon_guesser/',
  plugins: [react()]
})

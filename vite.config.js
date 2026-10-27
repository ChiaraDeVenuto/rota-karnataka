import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = percorso del sito su GitHub Pages (repo rota-karnataka)
export default defineConfig({
  base: '/rota-karnataka/',
  plugins: [react()],
});

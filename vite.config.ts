import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ssr from 'vite-plugin-ssr/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    ssr(),
    tsconfigPaths(),
    federation({
      name: 'seabrief-host',
      filename: 'remoteEntry.js',
      exposes: {},
      remotes: {},
      shared: ['react', 'react-dom'],
    }),
  ],
})

import { defineConfig } from 'vite'
import UnpluginCesium from '../src/vite'

export default defineConfig({
  base: '/unplugin',
  plugins: [
    UnpluginCesium({
      base: '/unplugin',
    }),
  ],
})

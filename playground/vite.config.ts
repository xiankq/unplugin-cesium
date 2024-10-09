import UnpluginCesium from 'unplugin-cesium/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    UnpluginCesium(),
  ],
})

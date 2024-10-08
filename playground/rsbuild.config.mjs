import { defineConfig } from '@rsbuild/core'
import UnpluginCesium from 'unplugin-cesium/rspack'

export default defineConfig({
  html: {
    template: './index.rsbuild.html',
  },
  source: {
    entry: {
      index: '/main.ts',
    },
  },
  tools: {
    rspack: {
      plugins: [
        UnpluginCesium(),
      ],
    },
  },
})

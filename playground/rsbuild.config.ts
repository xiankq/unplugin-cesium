import { defineConfig } from '@rsbuild/core'
import UnpluginCesium from '../src/rspack'

export default defineConfig({
  html: {
    template: './index.rsbuild.html',
  },
  dev: {
    assetPrefix: '/unplugin',
  },
  server: {
    base: '/unplugin',
  },
  source: {
    entry: {
      index: '/main.ts',
    },
  },
  tools: {
    rspack: {
      plugins: [
        UnpluginCesium({
          base: '/unplugin',
        }),
      ],
    },
  },
})

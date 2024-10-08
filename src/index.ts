import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCesiumOptions } from './types'

import { readFile, readFileSync } from 'node:fs'
import { createUnplugin } from 'unplugin'
import { copyFactory } from './core/copyFactory'
import { defineFactory } from './core/defineFactory'

export const unpluginFactory: UnpluginFactory<UnpluginCesiumOptions | undefined, true> = (options = {}, meta) => {
  const { cesiumBaseUrl = 'cesiumStatic', copyStaicFiles = true } = options
  return [
    ...!copyStaicFiles
      ? [] as any
      : copyFactory({
        targets: [
          {
            src: `node_modules/cesium/Build/Cesium/Workers/**`,
            dest: `${cesiumBaseUrl}/Workers`,
          },
          {
            src: `node_modules/cesium/Build/Cesium/ThirdParty/**`,
            dest: `${cesiumBaseUrl}/ThirdParty`,
          },
          {
            src: `node_modules/cesium/Build/Cesium/Assets/**`,
            dest: `${cesiumBaseUrl}/Assets`,
          },
          {
            src: `node_modules/cesium/Build/Cesium/Widgets/**`,
            dest: `${cesiumBaseUrl}/Widgets`,
          },
        ],
      }, meta),

    // defineFactory({
    //   replacements: {
    //     CESIUM_BASE_URL: cesiumBaseUrl,
    //   },
    // }, meta),
    {
      name: 'unplugin-cesium',
      enforce: 'post',
      transformInclude(id) {
        if (/..?js/.test(id)) {
          return true
        }
      },
      transform(code) {
        return `var CESIUM_BASE_URL="./${cesiumBaseUrl}";\n${code}`
      },
    },
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

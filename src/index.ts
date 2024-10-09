import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCesiumOptions } from './types'
import MagicString from 'magic-string'
import { createUnplugin } from 'unplugin'
import UnpluginCopy from 'unplugin-copy'

export const unpluginFactory: UnpluginFactory<UnpluginCesiumOptions | undefined, true> = (options = {}, meta) => {
  const { cesiumBaseUrl = 'cesiumStatic', copyStaicFiles = true } = options
  return [
    ...!copyStaicFiles
      ? []
      : [
          UnpluginCopy.raw({
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
        ],
    {
      enforce: 'pre',
      name: 'unplugin-cesium',
      transformInclude(id) {
        return /\/node_modules\/.*[Cc]esium.*\.js/.test(id)
      },
      transform(code, id) {
        if (id.includes('cesium')) {
          const s = new MagicString(code)
          s.appendLeft(0, `var CESIUM_BASE_URL="./${cesiumBaseUrl}";\n`)
          return {
            code: s.toString(),
            map: s.generateMap({ includeContent: true, hires: true }),
          }
        }
      },
    },
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCesiumOptions } from './types'
import path from 'node:path/posix'
import MagicString from 'magic-string'
import { createUnplugin } from 'unplugin'
import UnpluginCopy from 'unplugin-copy'
import { normalizePosixPath } from './core/utils'

export const unpluginFactory: UnpluginFactory<UnpluginCesiumOptions | undefined, true> = (options = {}, meta) => {
  const {
    cesiumBaseUrl = '../cesiumStatic',
    copyStaticFiles = true,
    base = '/',
  } = options

  const baseURL = normalizePosixPath(path.join('/', cesiumBaseUrl))
  const CESIUM_BASE_URL = copyStaticFiles ? normalizePosixPath(path.join(copyStaticFiles ? base : '', baseURL)) : cesiumBaseUrl
  return [
    ...!copyStaticFiles
      ? []
      : UnpluginCopy.raw({
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
    {
      enforce: 'pre',
      name: 'unplugin-cesium',
      transformInclude(id) {
        return /\.js/.test(id)
      },
      transform(code, id) {
        if (/\.js/.test(id) && code.includes('CESIUM_BASE_URL')) {
          const s = new MagicString(code)
          s.appendLeft(0, `var CESIUM_BASE_URL="${CESIUM_BASE_URL}";\n`)
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

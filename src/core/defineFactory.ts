import type { FilterPattern } from '@rollup/pluginutils'
import type { UnpluginFactory } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import MagicString from 'magic-string'

export interface UnpluginDefineOptions {
  include?: FilterPattern
  exclude?: FilterPattern
  replacements?: Record<string, any>
}

export const defineFactory: UnpluginFactory<UnpluginDefineOptions, false> = (options = {}) => {
  const optionList = !Array.isArray(options) ? [options] : options

  const list = optionList.map((options) => {
    const { include, exclude, replacements } = options
    const jsFileFilter = createFilter(
      [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/],
    )
    const filter = createFilter(
      include || '**/*',
      exclude,
    )
    const _replacements = { ...replacements }
    const targets = Object.keys(_replacements ?? {})
    targets.forEach((key) => {
      const val = _replacements[key]
      if (!(val instanceof String))
        _replacements[key] = JSON.stringify(val)
    })
    const replace = (code: string) => {
      targets.forEach((target) => {
        if (code.includes(target)) {
          const value = _replacements[target]
          code = code.replaceAll(target, value)
        }
      })
      return code
    }
    return {
      jsFileFilter,
      filter,
      replace,
    }
  })

  return {
    enforce: 'pre',
    name: 'unplugin-cesium:define',
    transformInclude(id) {
      return list.some(option => option.jsFileFilter(id) && option.filter(id))
    },

    transform(code, id) {
      let transformCode = code
      list.forEach((option) => {
        transformCode = option.replace(transformCode)
      })

      return {
        code: transformCode,
        map: new MagicString(code).generateMap({ source: id, includeContent: true, hires: true }),
      }
    },
  }
}

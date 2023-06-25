import { createUnplugin } from 'unplugin'
import unpluginCopy from 'unplugin-copy'
import type { UnpluginCesiumOptions } from './types'

export default createUnplugin<UnpluginCesiumOptions>((options, meta) => {
  return [
    unpluginCopy.raw({ targets: [] }, meta),
    {
      buildEnd() {
      },
      webpack(compiler) {
      },
    },
  ]
})

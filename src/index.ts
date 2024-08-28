import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-cesium',
  transform(code,id) { 
    console.log(id);
    return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

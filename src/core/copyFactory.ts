import type { UnpluginFactory } from 'unplugin'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import FastGlob from 'fast-glob'
import serveStatic from 'serve-static'

export interface Target {
  src: string | string[]
  dest: string
}

export interface CopyOptions {
  targets: Target[]
}

/**
 * 从数组中移除重复元素
 *
 * @param list 待处理的数组
 * @returns 返回一个没有重复元素的新数组
 */
function removeRepeat<T>(list: T[]): T[] {
  return [...new Set(list)]
}

function resolveCopyTarget(targets: Target[]) {
  const root = process.cwd()

  const promises = targets.map(async (target) => {
    const dest = path.posix.normalize(target.dest)
    const globs = await FastGlob(target.src, {
      dot: true,
      cwd: root,
    })

    const dirPaths = removeRepeat(globs.map(path.posix.dirname))

    let srcDir = ''
    dirPaths.forEach((dirPath) => {
      if (srcDir === '' || !dirPath.includes(srcDir))
        srcDir = dirPath
    })
    const resolves = globs.map((src) => {
      return {
        src: path.normalize(src),
        dest: path.normalize(src.replace(srcDir, dest)),
      }
    })

    return {
      resolves,
      srcDir,
      destDir: dest,
    }
  })

  return Promise.all(promises)
}

const viteServeFactory: UnpluginFactory<CopyOptions, false> = (options, _meta) => {
  return {
    name: 'unplugin-cesium:copy-vite-serve',
    vite: {
      async configureServer(server) {
        const results = await resolveCopyTarget(options.targets)
        results.forEach((result) => {
          const route = path.join('/', result.destDir).replaceAll('\\', '/')
          server.middlewares.use(route, serveStatic(result.srcDir))
        })
      },
    },
  }
}

const buildFactory: UnpluginFactory<CopyOptions, false> = (options, _meta) => {
  return {
    name: 'unplugin-cesium:copy-build',
    vite: {
      apply: 'build',
    },
    async buildEnd() {
      const results = await resolveCopyTarget(options.targets)
      const resolves = results.map(e => e.resolves).flat()
      const promises = resolves.map(async (resolve) => {
        const source = await fs.readFile(resolve.src)
        this.emitFile({
          type: 'asset',
          fileName: resolve.dest,
          source,
        })
      })
      await Promise.all(promises)
    },
  }
}

export const copyFactory: UnpluginFactory<CopyOptions, true> = (options, meta) => {
  return [
    viteServeFactory(options, meta),
    buildFactory(options, meta),
  ]
}

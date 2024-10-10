# unplugin-cesium [![NPM version](https://img.shields.io/npm/v/unplugin-cesium?color=a1b858&label=NPM)](https://www.npmjs.com/package/unplugin-cesium)

[English](README.md) | [简体中文](README-zh_CN.md)

将CesiumJS快速集成到各种bundler中。

## 功能
- ✨ 支持Vite、Webpack、Vue CLI、Rspack、Rollup、esbuild等，由unplugin提供支持。
- ⚡️ 在Vite开发模式下，无需等待Cesium静态文件被复制
- 🦾 完全支持TypeScript。

## 安装

```bash
# npm
npm i unplugin-cesium -D

# pnpm
pnpm i unplugin-cesium -D

# yarn
yarn add unplugin-cesium -D
```
## 示例

### Vite
```ts
// vite.config.ts
import UnpluginCesium from 'unplugin-cesium/vite'

export default defineConfig({
  plugins: [
    UnpluginCesium({ /* options */ }),
  ],
})
```

### Vue CLI
```ts
// vue.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-cesium/webpack').default({ /* options */ }),
  ],
}
```

### Webpack
```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-cesium/webpack').default({ /* options */ }),
  ],
}
```

### Rsbuild
```ts
// rsbuild.config.ts
import UnpluginCesium from 'unplugin-cesium/rspack'

export default defineConfig({
  tools: {
    rspack: {
      plugins: [
        UnpluginCesium({/* options */}),
      ],
    },
  },
})
```

## 选项
```ts
export interface UnpluginCesiumOptions {
  /**
   * 这是CesiumJS需要加载的静态文件的基础URL。
   * 如果你已经为这些静态文件配置了CDN URL，也可以直接指定CDN URL，并将`copyStaticFiles`设置为`false`。
   * @default '/cesiumStatic'
   */
  cesiumBaseUrl?: string

  /**
   * 如果你在vite中设置了类似的`base`或在webpack中设置了`publicPath`，你也需要在这里设置相同的参数。
   * @default '/'
   */
  base?: string

  /**
   * 是否将静态文件复制到`cesiumBaseUrl`目录。
   * @default true
   */
  copyStaticFiles?: boolean
}
```

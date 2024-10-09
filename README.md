# unplugin-cesium

[![NPM version](https://img.shields.io/npm/v/unplugin-cesium?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-cesium)

UnpluginCesium template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit unplugin/unplugin-cesium my-unplugin
```

And do a global replacement of `unplugin-cesium` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i unplugin-cesium
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginCesium from 'unplugin-cesium/vite'

export default defineConfig({
  plugins: [
    UnpluginCesium({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginCesium from 'unplugin-cesium/rollup'

export default {
  plugins: [
    UnpluginCesium({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-cesium/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-cesium/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-cesium/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnpluginCesium from 'unplugin-cesium/esbuild'

build({
  plugins: [UnpluginCesium()],
})
```

<br></details>

export interface UnpluginCesiumOptions {
  /**
   * This is the base URL for static files that CesiumJS needs to load.
   * If you have configured a CDN URL for these static files, you can also directly specify the CDN URL and set `copyStaticFiles` to `false`.
   * @default '/cesiumStatic'
   */
  cesiumBaseUrl?: string

  /**
   * If you have set a similar `base` in vite or `publicPath` in webpack, you also need to set the same parameter here.
   * @default '/'
   */
  base?: string

  /**
   * Whether to copy static files to the `cesiumBaseUrl` directory.
   * @default true
   */
  copyStaticFiles?: boolean
}

export interface UnpluginCesiumOptions {
  /**
   * This is the base url for static files that CesiumJS needs to load.
   * 如果已经为这些静态文件配置了CDN地址，那也可以直接指定为CDN地址，并将`copyStaicFiles`设置成 `false`。
   * @default '/cesiumStatic'
   */
  cesiumBaseUrl?: string

  /**
   * 是否拷贝静态文件到`cesiumBaseUrl`目录下
   * @default true
   */
  copyStaicFiles?: boolean
}

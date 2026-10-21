import type { ThemeConfig, UserConfig } from './types'
import { defaultConfig } from './config/default.js'
import { deepMerge } from './config/merge.js'
// 由 integration 通过 alias 指向站点根目录的 theme.config.ts
// @ts-expect-error 虚拟模块
import userConfig from 'virtual:retyped-config'

export const themeConfig: ThemeConfig = deepMerge(defaultConfig, userConfig)

export function defineThemeConfig(config: UserConfig): UserConfig {
  return config
}

import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { defaultConfig } from './src/config/default.js'
import { deepMerge } from './src/config/merge.js'

/**
 * 生成站点可用的 UnoCSS 配置。
 *
 * @param {object} userThemeConfig 站点根目录 theme.config.ts 的内容
 * @param {object} overrides       额外的 UnoCSS 配置覆盖
 */
export function createUnoConfig(userThemeConfig = {}, overrides = {}) {
  const themeConfig = deepMerge(defaultConfig, userThemeConfig)
  const { colorsDark, colorsLight, fonts } = themeConfig.appearance

  const socialIcons = (themeConfig.site.socialLinks ?? []).map(
    social => `i-mdi-${social.icon ?? social.name}`,
  )

  return defineConfig({
    presets: [
      presetWind3(),
      presetTypography({
        cssExtend: {
          'code::before': { content: 'none' },
          'code::after': { content: 'none' },
          'li': { 'white-space': 'normal', 'word-wrap': 'break-word' },
        },
      }),
      presetAttributify(),
      presetIcons({ scale: 1.2, warn: true }),
      presetTheme({
        theme: {
          dark: {
            colors: { ...colorsDark, shadow: '#FFFFFF0A' },
          },
        },
      }),
    ],
    theme: {
      colors: { ...colorsLight, shadow: '#0000000A' },
      fontFamily: fonts,
    },
    rules: [
      [/^row-(\d+)-(\d)$/, ([, start, end]) => ({ 'grid-row': `${start}/${end}` })],
      [/^col-(\d+)-(\d)$/, ([, start, end]) => ({ 'grid-column': `${start}/${end}` })],
      [
        /^scrollbar-hide$/,
        () => `.scrollbar-hide { scrollbar-width:none;-ms-overflow-style:none; }
      .scrollbar-hide::-webkit-scrollbar {display:none;}`,
      ],
    ],
    shortcuts: [
      ['post-title', 'text-5 font-bold lh-7.5 m-0'],
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: [...socialIcons, 'i-mdi-content-copy', 'i-mdi-check'],
    ...overrides,
  })
}

export default createUnoConfig

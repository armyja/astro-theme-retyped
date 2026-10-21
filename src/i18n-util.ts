import { LANGUAGES } from './i18n'
import { themeConfig } from './config'

export function t(key: string, param?: string | number): string {
  const locale = themeConfig.appearance.locale
  const table = (LANGUAGES[locale] ?? LANGUAGES['zh-cn']) as Record<string, string>
  const value = table[key] ?? key
  if (param === undefined)
    return value
  return value.replace('%d', String(param))
}

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * astro-theme-retyped
 *
 * 把站点根目录的 `theme.config.ts` 通过 Vite alias 暴露给主题内部：
 * `virtual:retyped-config`。
 */
export default function retyped(options = {}) {
  return {
    name: 'astro-theme-retyped',
    hooks: {
      'astro:config:setup': ({ config, updateConfig }) => {
        const root = fileURLToPath(config.root)
        const file = options.config ?? 'theme.config.ts'
        const configPath = file.startsWith('/') ? file : `${root}${root.endsWith('/') ? '' : '/'}${file}`

        if (!existsSync(configPath)) {
          throw new Error(
            `[astro-theme-retyped] 找不到主题配置：${configPath}\n请在站点根目录创建 theme.config.ts（可参考 README）。`,
          )
        }

        updateConfig({
          vite: {
            resolve: {
              alias: {
                'virtual:retyped-config': configPath,
              },
            },
          },
        })
      },
    },
  }
}

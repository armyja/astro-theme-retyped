/**
 * 主题默认配置。
 * 站点通过根目录的 `theme.config.ts` 覆盖这里的任意字段（深度合并）。
 */
export const defaultConfig = {
  site: {
    title: 'Retyped',
    subtitle: '主题',
    author: 'Author',
    description: 'A typography-first blog theme for Astro.',
    website: 'https://example.com',
    pageSize: 6,
    socialLinks: [],
    navLinks: [
      { name: 'Home', href: '/' },
      { name: 'Posts', href: '/posts' },
      { name: 'Tags', href: '/tags' },
    ],
    categoryMap: [],
    footer: [],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header:
        '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  seo: {
    twitter: '',
    meta: [],
    link: [],
  },
  rss: {
    fullText: true,
  },
  comment: {},
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: '',
  },
  latex: {
    katex: false,
  },
}

# astro-theme-retyped

一个以**中文阅读体验**为优先的 Astro 博客主题。它是两个优秀主题的融合体：

| 来源 | 借鉴了什么 |
| --- | --- |
| [Typography](https://github.com/moeyua/astro-theme-typography)（MIT © 2023 Moeyua） | 正文字号与行距、字体与配色、移动端排版、文章列表版式、侧栏竖排站名 |
| [Retypeset](https://github.com/radishzzz/astro-theme-retypeset)（MIT © 2025 radishzz） | 代码块观感：细边框 + 浅底 + 行号 + 悬停复制按钮、行内代码样式 |

在此之上做了两处取舍：

- **去掉了 Typography 的 7px 网格背景**，改为纯色底，界面更安静；
- 把标签（tags）作为一等公民，替换掉原先的 categories 导航。

## 特性

- 中文优先的排版：标题不过大、段距紧凑、标点与中英文间距自然
- 明暗双主题（`system` / `light` / `dark`），跟随系统
- Shiki 双主题代码高亮 + 行号 + 一键复制
- 标签索引与标签归档、分页、RSS（`/atom.xml`）、sitemap
- Giscus / Disqus / Twikoo 评论（可选）
- KaTeX 数学公式（可选）
- 移动端优先：单列布局，站名与导航自动置顶
- 站点样式与内容解耦：主题作为 npm 依赖被博客仓库引用

## 快速开始

### 1. 安装

```bash
npm install astro-theme-retyped
```

> 也可以直接引用 GitHub 仓库：`"astro-theme-retyped": "github:armyja/astro-theme-retyped"`

### 2. 站点配置 `theme.config.ts`

```ts
import type { UserConfig } from 'astro-theme-retyped/types/index.ts'

const config: UserConfig = {
  site: {
    title: '站点名',
    subtitle: '副标题',
    author: '作者',
    description: '站点描述',
    website: 'https://example.com',
    pageSize: 8,
    navLinks: [
      { name: '首页', href: '/' },
      { name: '博文', href: '/posts' },
      { name: '标签', href: '/tags' },
      { name: 'Memos', href: 'https://memos.example.com', external: true },
    ],
    socialLinks: [
      { name: 'GitHub', href: 'https://github.com/you', icon: 'github' },
      { name: '微博', href: 'https://weibo.com/you', icon: 'sina-weibo' },
      { name: 'RSS', href: '/atom.xml', icon: 'rss' },
    ],
    footer: ['© %year <a href="%website">%author</a>'],
  },
  appearance: { theme: 'system', locale: 'zh-cn' },
}

export default config
```

`socialLinks[].icon` 使用 [Iconify](https://iconify.design/) 的 `mdi` 图标名，例如 `sina-weibo`、`rss`、`github`。

### 3. `astro.config.mjs`

```js
import { defineConfig } from 'astro/config'
import UnoCSS from '@unocss/astro'
import retyped from 'astro-theme-retyped'

export default defineConfig({
  site: 'https://example.com',
  integrations: [UnoCSS({ injectReset: true }), retyped()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
})
```

### 4. `uno.config.js`

```js
import { createUnoConfig } from 'astro-theme-retyped/uno'
import themeConfig from './theme.config.ts'

export default createUnoConfig(themeConfig)
```

### 5. 内容集合 `src/content.config.ts`

```ts
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { postsSchema, specSchema } from 'astro-theme-retyped/content-schema.ts'

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
    schema: postsSchema,
  }),
  spec: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/spec' }),
    schema: specSchema,
  }),
}
```

### 6. 页面

主题提供布局与组件，页面留在站点里以便自由定制：

```astro
---
import LayoutDefault from 'astro-theme-retyped/layouts/LayoutDefault.astro'
import LayoutPost from 'astro-theme-retyped/layouts/LayoutPost.astro'
import { getPostDescription, getPosts } from 'astro-theme-retyped/utils'

const posts = await getPosts()
---

<LayoutDefault>
  {posts.map(post => (
    <LayoutPost post={post}>
      <p class="line-clamp-4">{getPostDescription(post)}</p>
    </LayoutPost>
  ))}
</LayoutDefault>
```

可用的导出：`layouts/*`、`components/*`、`styles/*`、`utils`、`config.ts`、`i18n-util.ts`、`content-schema.ts`、`uno`、`types/index.ts`。

## frontmatter

```yaml
---
title: 文章标题
pubDate: 2026-10-22T02:31:00+08:00
tags: ["图形 API", "逆向工程"]
draft: false
description: 用于列表页与 SEO 的一句话摘要
author: Armyja
pin: false
---
```

## 许可

MIT。本主题是 MIT 项目的衍生融合作品，分发时请保留 [LICENSE](./LICENSE) 中的全部版权声明：

- Typography © 2023 Moeyua
- Retypeset © 2025 radishzz

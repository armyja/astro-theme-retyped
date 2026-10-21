import { z } from 'astro:content'

/**
 * 文章的 frontmatter 结构，站点可在自己的 content.config.ts 里直接复用：
 *
 * ```ts
 * import { defineCollection } from 'astro:content'
 * import { glob } from 'astro/loaders'
 * import { postsSchema } from 'astro-theme-retyped/content-schema.ts'
 *
 * export const collections = {
 *   posts: defineCollection({
 *     loader: glob({ pattern: '**\/*.md', base: './src/content/posts' }),
 *     schema: postsSchema,
 *   }),
 * }
 * ```
 */
export const postsSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false).optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    pin: z.boolean().default(false).optional(),
    banner: image().optional(),
  })

export const specSchema = () =>
  z
    .object({
      title: z.string().optional(),
      pubDate: z.coerce.date().optional(),
    })
    .passthrough()

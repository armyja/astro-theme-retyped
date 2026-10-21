import type { Post } from '../types'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

/** 聚合所有文章上的标签 */
export async function getTags() {
  const posts = await getPosts()
  const tags = new Map<string, Post[]>()

  for (const post of posts) {
    const list = (post.data as any).tags as string[] | undefined
    if (!list)
      continue
    for (const tag of list) {
      const bucket = tags.get(tag) || []
      bucket.push(post)
      tags.set(tag, bucket)
    }
  }

  return tags
}

export async function getPosts(isArchivePage = false) {
  const posts = await getCollection('posts')

  posts.sort((a, b) => {
    if (isArchivePage) {
      return dayjs(a.data.pubDate).isBefore(dayjs(b.data.pubDate)) ? 1 : -1
    }

    const aDate = a.data.modDate ? dayjs(a.data.modDate) : dayjs(a.data.pubDate)
    const bDate = b.data.modDate ? dayjs(b.data.modDate) : dayjs(b.data.pubDate)

    return aDate.isBefore(bDate) ? 1 : -1
  })

  if (import.meta.env.PROD) {
    return posts.filter(post => post.data.draft !== true)
  }

  return posts
}

const parser = new MarkdownIt()
export function getPostDescription(post: Post) {
  if (post.data.description) {
    return post.data.description
  }

  const html = parser.render(post.body || '')
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  return sanitized.slice(0, 400)
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

/** 标签对应的 URL slug（中文标签保持原样，仅做 URL 编码） */
export function getTagUrl(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`
}

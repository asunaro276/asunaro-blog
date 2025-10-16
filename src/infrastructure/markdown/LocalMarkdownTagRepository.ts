import { getCollection } from 'astro:content'
import type { ITagRepository } from '/domain/interfaces/article/ITagRepository'
import { Tag } from '/domain/models/article/tag/Tag'

export class LocalMarkdownTagRepository implements ITagRepository {
  async fetchTags(): Promise<Tag[]> {
    const entries = (await getCollection('posts')) as any[]

    // 全記事からタグを集計
    const tagMap = new Map<string, { count: number }>()

    for (const entry of entries) {
      for (const tagName of entry.data.tags) {
        if (tagMap.has(tagName)) {
          tagMap.get(tagName)!.count++
        } else {
          tagMap.set(tagName, { count: 1 })
        }
      }
    }

    // Tag オブジェクトに変換
    return Array.from(tagMap.entries()).map(([tagName, { count }]) => {
      const tag = new Tag(tagName, tagName, count)
      return tag
    })
  }
}

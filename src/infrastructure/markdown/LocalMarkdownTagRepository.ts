import { getCollection } from 'astro:content'
import type { ITagRepository } from '/domain/interfaces/article/ITagRepository'
import { Tag } from '/domain/models/article/tag/Tag'

export class LocalMarkdownTagRepository implements ITagRepository {
  async fetchTags(): Promise<Tag[]> {
    const entries = await getCollection('posts', (entry) => {
      // SHOW_DRAFTSが設定されている場合は全記事を取得
      const showDrafts = import.meta.env.SHOW_DRAFTS === 'true' || process.env.SHOW_DRAFTS === 'true'
      if (showDrafts) {
        return true
      }
      // 本番環境では公開記事のみ、開発環境では全記事を取得
      if (import.meta.env.PROD) {
        return entry.data.status === 'published'
      }
      return true
    })

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

import { getCollection } from 'astro:content'
import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository'
import { Category } from '/domain/models/article/category/Category'

export class LocalMarkdownCategoryRepository implements ICategoryRepository {
  async fetchCategories(): Promise<Category[]> {
    const entries = (await getCollection('posts')) as any[]

    // ユニークなカテゴリを抽出
    const categoryMap = new Map<string, Category>()

    for (const entry of entries) {
      const categoryName = entry.data.category
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, new Category(categoryName, categoryName))
      }
    }

    return Array.from(categoryMap.values())
  }
}

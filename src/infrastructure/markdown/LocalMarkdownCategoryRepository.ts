import { getCollection } from 'astro:content'
import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository'
import { Category } from '/domain/models/article/category/Category'

const CATEGORY_ORDER = ['HOME', 'CODE', 'BUSINESS', 'MATH', 'OTHER'];

export class LocalMarkdownCategoryRepository implements ICategoryRepository {
  async fetchCategories(): Promise<Category[]> {
    const entries = await getCollection('posts')

    // ユニークなカテゴリを抽出
    const categoryMap = new Map<string, Category>()

    for (const entry of entries) {
      const categoryName = entry.data.category
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, new Category(categoryName, categoryName))
      }
    }

    const categoryList = Array.from(categoryMap.values())

    // 指定された順序でソート
    return categoryList.sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a.id);
      const indexB = CATEGORY_ORDER.indexOf(b.id);

      // どちらも定義された順序に含まれる場合
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // aのみ定義された順序に含まれる場合、aを前に
      if (indexA !== -1) return -1;
      // bのみ定義された順序に含まれる場合、bを前に
      if (indexB !== -1) return 1;
      // どちらも定義されていない場合、元の順序を維持
      return 0;
    })
  }
}

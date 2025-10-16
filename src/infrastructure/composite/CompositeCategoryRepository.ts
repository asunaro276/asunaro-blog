import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository'
import { Category } from '/domain/models/article/category/Category'

export class CompositeCategoryRepository implements ICategoryRepository {
  constructor(
    private readonly localRepository: ICategoryRepository,
    private readonly newtRepository: ICategoryRepository
  ) {}

  async fetchCategories(): Promise<Category[]> {
    const [localCategories, newtCategories] = await Promise.all([
      this.localRepository.fetchCategories(),
      this.newtRepository.fetchCategories()
    ])

    // カテゴリIDでユニーク化
    const categoryMap = new Map<string, Category>()

    for (const category of localCategories) {
      categoryMap.set(category.id, category)
    }

    for (const category of newtCategories) {
      if (!categoryMap.has(category.id)) {
        categoryMap.set(category.id, category)
      }
    }

    return Array.from(categoryMap.values())
  }
}

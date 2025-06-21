import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { PathDTO } from "./DTO";
import type { ICategoryRepository } from "/domain/models/article/category/ICategoryRepository";

export class GetCategoryPaths {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
  ) {}
  async execute(): Promise<PathDTO[]> {
    const { articles } = await this.articleRepository.fetchAllArticles()
    const categories = await this.categoryRepository.fetchCategories()
    const articlesByCategory = categories.map(category => ({
      category: category,
      articles: articles.filter((article) => article.category.equals(category))
    }))
    return articlesByCategory
  }
}

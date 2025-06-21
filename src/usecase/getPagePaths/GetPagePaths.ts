import type { IArticleRepository } from "/domain/interfaces/article/IArticleRepository";
import { Page } from "/domain/models/page/Page";
import type { Tag } from "/domain/models/article/tag/Tag";
import type { Category } from "/domain/models/article/category/Category";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";
import type { PathDTO } from "./DTO";

type GetPagePathsCommand = { tag: Tag, page: Page } | { category: Category, page: Page } | { yearmonth: YearMonth, page: Page } | { page: Page }

export class GetPagePaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command?: GetPagePathsCommand): Promise<PathDTO[]> {
    if (!command) {
      const { articles } = await this.articleRepository.fetchAllArticles()
      return articles.map(article => ({ articles: [article] }))
    }

    if (command && "tag" in command) {
      const { articles } = await this.articleRepository.fetchAllArticles()
      const tags = Array.from(new Set(articles.flatMap((article) => article.tags)))
      const articlesByTag = tags.map(tag => ({
        tag: tag,
        articles: articles.filter((article) => article.tags.some((t) => t.equals(tag)))
      }))
      return articlesByTag
    } else if (command && "category" in command) {
      const { articles } = await this.articleRepository.fetchAllArticles()
      const categories = Array.from(new Set(articles.map((article) => article.category)))
      const articlesByCategory = categories.map(category => ({
        category: category,
        articles: articles.filter((article) => article.category.equals(category))
      }))
      return articlesByCategory
    } else if (command && "yearmonth" in command) {
      const { articles } = await this.articleRepository.fetchAllArticles()
      const yearmonths = Array.from(new Set(articles.map((article) => article.yearmonth)))
      const articlesByYearmonth = yearmonths.map(yearmonth => ({
        yearmonth: yearmonth,
        articles: articles.filter((article) => article.yearmonth.equals(yearmonth))
      }))
      return articlesByYearmonth
    } else {
      const { articles } = await this.articleRepository.fetchAllArticles()
      return articles.map(article => ({articles: [article]}))
    }
  }
}

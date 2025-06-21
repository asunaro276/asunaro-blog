import type { Page } from "../page/Page";
import type { Article } from "./Article";
import type { Category } from "./category/Category";
import type { Tag } from "./tag/Tag";
import type { YearMonth } from "./yearmonth/YearMonth";

export type FetchArticleCommand = { tag: Tag, page: Page } | { category: Category, page: Page } | { yearmonth: YearMonth, page: Page } | { page: Page }
export type ArticleInfo = { articles: Article[], totalCount: number }

export interface IArticleRepository {
  fetchArticle(
    fetchArticleCommand: FetchArticleCommand
  ): Promise<ArticleInfo>
  fetchArticleById(articleId: string): Promise<Article>
  fetchArticlesByCategory(category: Category, page: Page): Promise<ArticleInfo>
  fetchArticlesByTag(tag: Tag, page: Page): Promise<ArticleInfo>
  fetchArticlesByYearMonth(yearmonth: YearMonth, page: Page): Promise<ArticleInfo>
  fetchArticles(page: Page): Promise<ArticleInfo>
  fetchAllArticles(): Promise<ArticleInfo>
}

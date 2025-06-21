import type { Page } from "/domain/models/page/Page";
import type { Article } from "/domain/models/article/Article";
import type { Category } from "/domain/models/article/category/Category";
import type { Tag } from "/domain/models/article/tag/Tag";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

export type ArticleInfo = { articles: Article[], totalCount: number }

export interface IArticleRepository {
  fetchArticleById(articleId: string): Promise<Article>
  fetchArticlesByCategory(category: Category, page: Page): Promise<ArticleInfo>
  fetchArticlesByTag(tag: Tag, page: Page): Promise<ArticleInfo>
  fetchArticlesByYearMonth(yearmonth: YearMonth, page: Page): Promise<ArticleInfo>
  fetchArticles(page: Page): Promise<ArticleInfo>
  fetchAllArticles(): Promise<ArticleInfo>
}

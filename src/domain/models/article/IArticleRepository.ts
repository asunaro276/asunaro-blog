import type { Page } from "../page/Page";
import type { Article } from "./Article";
import type { Category } from "./category/Category";
import type { Tag } from "./tag/Tag";
import type { YearMonth } from "./yearmonth/YearMonth";

export type  FetchArticleCommand = { tag: Tag, page: Page } | { category: Category, page: Page } | { yearmonth: YearMonth, page: Page } | { page: Page } | { articleId: string }

export interface IArticleRepository {
  fetchArticle(
    fetchArticleCommand: FetchArticleCommand
  ): Promise<{ articles: Article[], totalCount: number }>
}

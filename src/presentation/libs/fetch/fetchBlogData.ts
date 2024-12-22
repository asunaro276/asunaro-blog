import type { ArticleId, CategoryId, Page, TagId, YearMonthId } from '/types'
import { fetchArticles } from './fetchArticles'
import { fetchCategories } from './fetchCategories'
import { fetchTags } from './fetchTags'
import { fetchYearMonth } from './fetchYearMonth'

type FetchBlogDataOptions =
  | { yearmonth: YearMonthId, pageNumber?: Page }
  | { tagId: TagId; pageNumber?: Page }
  | { categoryId: CategoryId; pageNumber?: Page }
  | { ArticleId: ArticleId }
  | { pageNumber?: Page }

export const fetchBlogData = async (options: FetchBlogDataOptions) => {
  const results = await Promise.all([fetchArticles(options), fetchCategories(), fetchTags(), fetchYearMonth()])
  const [{ blogs, totalCount }, categories, tags, yearmonths] = results

  return {
    blogs,
    categories,
    tags,
    yearmonths,
    totalCount,
  }
}

import type { Article } from "/domain/models/article/Article";
import type { Category } from "/domain/models/article/category/Category";
import type { Tag } from "/domain/models/article/tag/Tag";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

export class PostDataDTO {
  constructor(
    articles: Article[],
    tags: Tag[],
    categories: Category[],
    yearmonth: YearMonth[],
    totalCount: number
  ) {}
}

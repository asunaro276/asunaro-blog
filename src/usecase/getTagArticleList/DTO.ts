import type { Article } from "/domain/models/article/Article";
import type { Category } from "/domain/models/article/category/Category";
import type { Tag } from "/domain/models/article/tag/Tag";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";
import type { Page } from "/domain/models/page/Page";
import type { Path } from "/domain/models/path/Path";

export class ArticleListDTO {
  constructor(
    readonly articles: Article[],
    readonly tags: Tag[],
    readonly categories: Category[],
    readonly yearmonths: YearMonth[],
    readonly totalCount: number,
    readonly currentPage: Page,
    readonly currentPath: Path,
    readonly tag: Tag
  ) {}
}

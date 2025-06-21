import type { Article } from "/domain/models/article/Article";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

export interface PathDTO {
  articles: Article[],
  yearmonth: YearMonth,
}

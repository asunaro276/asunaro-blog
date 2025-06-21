import type { Article } from "/domain/models/article/Article";
import type { Category } from "/domain/models/article/category/Category";

export interface PathDTO {
  articles: Article[],
  category: Category,
}

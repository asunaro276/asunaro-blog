import type { Article } from "/domain/models/article/Article";
import type { Tag } from "/domain/models/article/tag/Tag";

export interface PathDTO {
  articles: Article[],
  tag: Tag,
}

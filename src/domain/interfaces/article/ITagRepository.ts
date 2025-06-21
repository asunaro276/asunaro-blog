import type { Tag } from "/domain/models/article/tag/Tag";

export interface ITagRepository {
  fetchTags(): Promise<Tag[]>
}

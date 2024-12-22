import type { Tag } from "./Tag";

export interface ITagRepository {
  fetchTags(): Promise<Tag[]>
}

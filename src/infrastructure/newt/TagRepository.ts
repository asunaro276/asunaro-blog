import { appUid, newtClient } from "./Client";
import type { TagItem } from "./types";
import type { ITagRepository } from "/domain/interfaces/article/ITagRepository";
import { Tag } from "/domain/models/article/tag/Tag";

const modelUid = 'tag'
const params = {
  appUid,
  modelUid
}

export class NewtTagRepository implements ITagRepository {
  async fetchTags() {
    const tags = (
      await newtClient.getContents<TagItem>({
        ...params,
        query: {
          limit: 100,
          depth: 0
        },
      })
    )
    return tags.items.map(v => new Tag(
      v._id,
      v.tag,
      v.ref.length
    )).sort((a, b) => b.count - a.count)
  }
}

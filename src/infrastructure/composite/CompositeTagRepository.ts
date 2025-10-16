import type { ITagRepository } from '/domain/interfaces/article/ITagRepository'
import { Tag } from '/domain/models/article/tag/Tag'

export class CompositeTagRepository implements ITagRepository {
  constructor(
    private readonly localRepository: ITagRepository,
    private readonly newtRepository: ITagRepository
  ) {}

  async fetchTags(): Promise<Tag[]> {
    const [localTags, newtTags] = await Promise.all([
      this.localRepository.fetchTags(),
      this.newtRepository.fetchTags()
    ])

    // タグIDでマージし、カウントを合算
    const tagMap = new Map<string, { name: string; count: number }>()

    for (const tag of localTags) {
      tagMap.set(tag.id, { name: tag.name, count: tag.count })
    }

    for (const tag of newtTags) {
      if (tagMap.has(tag.id)) {
        // 既存のタグの場合、カウントを加算
        tagMap.get(tag.id)!.count += tag.count
      } else {
        tagMap.set(tag.id, { name: tag.name, count: tag.count })
      }
    }

    return Array.from(tagMap.entries()).map(([id, { name, count }]) =>
      new Tag(id, name, count)
    )
  }
}

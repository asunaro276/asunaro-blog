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

    // タグはNewtのもののみを使用し、カウントはローカルと合算
    const localTagMap = new Map<string, number>()

    // ローカルのタグをMapに格納（タグ名でマッチング）
    for (const tag of localTags) {
      localTagMap.set(tag.name, tag.count)
    }

    // Newtのタグにローカルのカウントを加算
    return newtTags.map(newtTag => {
      const localCount = localTagMap.get(newtTag.name) || 0
      return new Tag(newtTag.id, newtTag.name, newtTag.count + localCount)
    }).sort((a, b) => b.count - a.count)
  }
}

import { newtClient } from '../client'
import type { TagItem } from '/types'

export const fetchTags = async (): Promise<TagItem[]> => {
  const tags = (
    await newtClient.getContents<TagItem>({
      appUid: 'asunaroblog',
      modelUid: 'tag',
      query: {
        limit: 100,
        depth: 0
      },
    })
  ).items.sort((a, b) => b.ref.length - a.ref.length)
  return tags
}

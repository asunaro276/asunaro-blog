import { newtClient } from '../client'
import type { CategoryItem } from '/types'

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const categories = (
    await newtClient.getContents<CategoryItem>({
      appUid: 'asunaroblog',
      modelUid: 'category',
      query: {
        order: ['-_sys.customOrder'],
        depth: 1
      },
    })
  ).items
  return categories
}

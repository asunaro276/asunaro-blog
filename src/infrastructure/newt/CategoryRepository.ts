import { appUid, newtClient } from "./Client";
import type { CategoryItem } from "./types";
import type { ICategoryRepository } from "/domain/interfaces/repository/ICategoryRepository";
import { Category } from "/domain/models/article/category/Category";

const modelUid = 'category'
const params = {
  appUid,
  modelUid
}

export class NewtCategoryRepository implements ICategoryRepository {
  async fetchCategories() {
    const categories = (
      await newtClient.getContents<CategoryItem>({
        ...params,
        query: {
          limit: 100,
          depth: 0,
          order: ["-_sys.customOrder"]
        },
      })
    )
    return categories.items.map(v => new Category(
      v._id,
      v.displayedName
    ))
  }
}

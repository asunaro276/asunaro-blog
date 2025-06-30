import type { Category } from "/domain/models/article/category/Category";

export interface ICategoryRepository {
  fetchCategories(): Promise<Category[]>
}

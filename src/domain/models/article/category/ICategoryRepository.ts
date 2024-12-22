import type { Category } from "./Category";

export interface ICategoryRepository {
  fetchCategories(): Promise<Category[]>
}

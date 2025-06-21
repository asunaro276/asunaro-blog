import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { IArticleRepository } from '/domain/models/article/IArticleRepository';
import { ArticleListDTO } from './DTO';
import { Path } from '/domain/models/path/Path';
import type { Page } from '/domain/models/page/Page';

type FetchArticleCommand = { categoryName: string, page: Page }

export class GetCategoryArticleList {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute({ categoryName, page }: FetchArticleCommand): Promise<ArticleListDTO> {
    const categories = await this.categoryRepository.fetchCategories()
    const category = categories.find(cat => cat.name.toLowerCase() === categoryName)
    if (!category) {
      throw new Error('Category not found')
    }
    const { articles, totalCount } = await this.articleRepository.fetchArticlesByCategory(category, page)
    const tags = await this.tagRepository.fetchTags()
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    
    const currentPage = page
    const currentPath = new Path("category", category.name.toLowerCase(), page)

    return new ArticleListDTO(
      articles,
      tags,
      categories,
      yearmonths,
      totalCount,
      currentPage,
      currentPath,
      category
    )
  }
}

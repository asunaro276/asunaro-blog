import type { IYearMonthRepository } from '/domain/interfaces/article/IYearMonthRepository';
import type { ITagRepository } from '/domain/interfaces/article/ITagRepository';
import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository';
import type { IArticleRepository } from '/domain/interfaces/article/IArticleRepository';
import { ArticleListDTO } from './DTO';
import { Path } from '/domain/models/path/Path';
import type { Page } from '/domain/models/page/Page';

type FetchArticleCommand = { page: Page }

export class GetArticleList {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute({ page }: FetchArticleCommand): Promise<ArticleListDTO> {
    const { articles, totalCount } = await this.articleRepository.fetchArticles(page)
    const categories = await this.categoryRepository.fetchCategories()
    const tags = await this.tagRepository.fetchTags()
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    
    const currentPage = page
    const currentPath = new Path("", "", page)

    return new ArticleListDTO(
      articles,
      tags,
      categories,
      yearmonths,
      totalCount,
      currentPage,
      currentPath,
    )
  }
}

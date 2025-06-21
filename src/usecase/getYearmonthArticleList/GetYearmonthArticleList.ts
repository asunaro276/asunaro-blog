import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { IArticleRepository } from '/domain/models/article/IArticleRepository';
import { Path } from '/domain/models/path/Path';
import type { Page } from '/domain/models/page/Page';
import { ArticleListDTO } from './DTO';

type FetchArticleCommand = { yearmonth: string, page: Page }

export class GetYearmonthArticleList {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute({ yearmonth, page }: FetchArticleCommand): Promise<ArticleListDTO> {
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    const yearmonthModel = yearmonths.find(ym => ym.value === yearmonth)
    if (!yearmonthModel) {
      throw new Error('Yearmonth not found')
    }
    const { articles, totalCount } = await this.articleRepository.fetchArticlesByYearMonth(yearmonthModel, page)
    const categories = await this.categoryRepository.fetchCategories()
    const tags = await this.tagRepository.fetchTags()
    
    const currentPage = page;
    const currentPath = new Path("yearmonth", yearmonthModel.value, page)      
    const filteredArticles = articles.filter(article => article.yearmonth.equals(yearmonthModel))

    return new ArticleListDTO(
      filteredArticles,
      tags,
      categories,
      yearmonths,
      totalCount,
      currentPage,
      currentPath,
      yearmonthModel
    )
  }
}

import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { FetchArticleCommand, IArticleRepository } from '/domain/models/article/IArticleRepository';
import { PostDataDTO } from './DTO';

export class GetPostData {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}
  async execute(command: FetchArticleCommand): Promise<PostDataDTO> {
    const { articles, totalCount } = await this.articleRepository.fetchArticle(command)
    const categories = await this.categoryRepository.fetchCategories()
    const tags = await this.tagRepository.fetchTags()
    const yearmonth = await this.yearmonthRepository.fetchYearMonths()
    return new PostDataDTO(
      articles,
      tags,
      categories,
      yearmonth,
      totalCount
    )
  }
}

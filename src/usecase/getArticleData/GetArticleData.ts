import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { FetchArticleCommand, IArticleRepository } from '/domain/models/article/IArticleRepository';
import { ArticleDataDTO } from './DTO';
import type { Page } from '/domain/models/page/Page';

export class GetArticleData {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute(articleId: string): Promise<ArticleDataDTO> {
    const article = await this.articleRepository.fetchArticleById(articleId)
    const categories = await this.categoryRepository.fetchCategories()
    const tags = await this.tagRepository.fetchTags()
    const yearmonth = await this.yearmonthRepository.fetchYearMonths()

    await article.parseBody()
    return new ArticleDataDTO(
      article,
      tags,
      categories,
      yearmonth,
    )
  }

  private hasPage(command: FetchArticleCommand): command is Extract<FetchArticleCommand, { page: Page }> {
    return 'page' in command;
  }
}

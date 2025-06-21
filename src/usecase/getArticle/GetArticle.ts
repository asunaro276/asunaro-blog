import type { IYearMonthRepository } from '/domain/interfaces/article/IYearMonthRepository';
import type { ITagRepository } from '/domain/interfaces/article/ITagRepository';
import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository';
import type { IArticleRepository } from '/domain/interfaces/article/IArticleRepository';
import { ArticleDataDTO } from './DTO';

export class GetArticle {
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

    await article.parseArticle()
    return new ArticleDataDTO(
      article,
      tags,
      categories,
      yearmonth,
    )
  }
}

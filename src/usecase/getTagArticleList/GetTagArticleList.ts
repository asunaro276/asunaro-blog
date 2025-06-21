import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { IArticleRepository } from '/domain/models/article/IArticleRepository';
import { ArticleListDTO } from './DTO';
import { Path } from '/domain/models/path/Path';
import type { Page } from '/domain/models/page/Page';

type FetchArticleCommand = { tagId: string, page: Page }

export class GetTagArticleList {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute({ tagId, page }: FetchArticleCommand): Promise<ArticleListDTO> {
    const tags = await this.tagRepository.fetchTags()
    const tag = tags.find(t => t.id === tagId)
    if (!tag) {
      throw new Error('Tag not found')
    }
    const { articles, totalCount } = await this.articleRepository.fetchArticlesByTag(tag, page)
    tag.count = totalCount
    const categories = await this.categoryRepository.fetchCategories()
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    
    const currentPage = page;
    const currentPath = new Path("tag", tag.name.toLowerCase(), page)      

    return new ArticleListDTO(
      articles,
      tags,
      categories,
      yearmonths,
      totalCount,
      currentPage,
      currentPath,
      tag
    )
  }
}

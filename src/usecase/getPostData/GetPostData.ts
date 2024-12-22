import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { FetchArticleCommand, IArticleRepository } from '/domain/models/article/IArticleRepository';
import { PostDataDTO } from './DTO';
import { Path } from '/domain/models/path/Path';

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
    let currentPage
    let currentPath
    if ('page' in command) {
      currentPage = command.page
      if ('tag' in command) {
        currentPath = new Path("tag", command.tag.name, command.page)      
      } else if ('category' in command) {
        currentPath = new Path("category", command.category.name, command.page)      
      } else if ('yearmonth' in command) {
        currentPath = new Path("yearmonth", command.yearmonth.value, command.page)      
      } else {
        currentPath = new Path('', '', command.page)      
      }
    }
    return new PostDataDTO(
      articles,
      tags,
      categories,
      yearmonth,
      totalCount,
      currentPage,
      currentPath,
    )
  }
}

import type { IYearMonthRepository } from '/domain/models/article/yearmonth/IYearMonthRepository';
import type { ITagRepository } from '/domain/models/article/tag/ITagRepository';
import type { ICategoryRepository } from '/domain/models/article/category/ICategoryRepository';
import type { IArticleRepository } from '/domain/models/article/IArticleRepository';
import { PostDataDTO } from './DTO';
import { Path } from '/domain/models/path/Path';
import type { Page } from '/domain/models/page/Page';
import type { Article } from '/domain/models/article/Article';

type FetchArticleCommand = { tagId: string, page: Page } | { categoryName: string, page: Page } | { yearmonth: string, page: Page } | { page: Page }

export class GetArticleListData {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository
  ) {}

  async execute(command: FetchArticleCommand): Promise<PostDataDTO> {
    if (!this.hasPage(command)) {
      throw new Error('Command is invalid for category page');
    }
    const { articles, totalCount } = await this.articleRepository.fetchArticlesByCategory(command.categoryName, command.page)
    const categories = await this.categoryRepository.fetchCategories()
    const tags = await this.tagRepository.fetchTags()
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    

    // TypeScriptはここでcommandが確実にpageプロパティを持つことを理解する
    const currentPage = command.page;
    let currentPath: Path;
    let filteredArticles: Article[] = [];

    if ('tagId' in command) {
      const tag = tags.find(t => t.id === command.tagId)
      if (!tag) {
        throw new Error('Tag not found')
      }
      currentPath = new Path("tag", tag.name.toLowerCase(), command.page)      
      filteredArticles = articles.filter(article => article.tags.some(t => t.equals(tag)))
    } else if ('categoryName' in command) {
      const category = categories.find(cat => cat.name.toLowerCase() === command.categoryName)
      if (!category) {
        throw new Error('Category not found')
      }
      currentPath = new Path("category", category.name.toLowerCase(), command.page)
      filteredArticles = articles.filter(article => article.category.equals(category))
    } else if ('yearmonth' in command) {
      const yearmonth = yearmonths.find(ym => ym.value === command.yearmonth)
      if (!yearmonth) {
        throw new Error('Yearmonth not found')
      }
      currentPath = new Path("yearmonth", yearmonth.value, command.page)      
      filteredArticles = articles.filter(article => article.yearmonth.equals(yearmonth))
    } else {
      currentPath = new Path('', '', command.page)      
      filteredArticles = articles
    }

    return new PostDataDTO(
      filteredArticles,
      tags,
      categories,
      yearmonths,
      totalCount,
      currentPage,
      currentPath,
    )
  }

  private hasPage(command: FetchArticleCommand): command is Extract<FetchArticleCommand, { page: Page }> {
    return 'page' in command;
  }
}

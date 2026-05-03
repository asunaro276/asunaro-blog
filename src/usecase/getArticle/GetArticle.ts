import type { IYearMonthRepository } from '/domain/interfaces/article/IYearMonthRepository';
import type { ITagRepository } from '/domain/interfaces/article/ITagRepository';
import type { ICategoryRepository } from '/domain/interfaces/article/ICategoryRepository';
import type { IArticleRepository } from '/domain/interfaces/article/IArticleRepository';
import { Article } from '/domain/models/article/Article';
import { ArticleDataDTO } from './DTO';
import type { HtmlParser } from '/domain/interfaces/article/IHtmlParser';

export class GetArticle {
  constructor(
    private articleRepository: IArticleRepository,
    private categoryRepository: ICategoryRepository,
    private tagRepository: ITagRepository,
    private yearmonthRepository: IYearMonthRepository,
    private htmlParser: HtmlParser
  ) {}

  async execute(articleId: string): Promise<ArticleDataDTO> {
    const [article, { articles: allArticles }, categories, tags, yearmonth] = await Promise.all([
      this.articleRepository.fetchArticleById(articleId),
      this.articleRepository.fetchAllArticles(),
      this.categoryRepository.fetchCategories(),
      this.tagRepository.fetchTags(),
      this.yearmonthRepository.fetchYearMonths(),
    ])

    article.htmlBody = await this.htmlParser.parseBody(article.htmlBody)
    article.tableOfContents = this.htmlParser.parseHeadings(article.htmlBody)

    const suggestedArticles = Article.selectSuggested(article, allArticles)

    return new ArticleDataDTO(
      article,
      tags,
      categories,
      yearmonth,
      suggestedArticles,
    )
  }
}

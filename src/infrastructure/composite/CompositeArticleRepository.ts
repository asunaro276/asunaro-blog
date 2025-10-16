import type { IArticleRepository, ArticleInfo } from '/domain/interfaces/article/IArticleRepository'
import { Article } from '/domain/models/article/Article'
import { Category } from '/domain/models/article/category/Category'
import { Tag } from '/domain/models/article/tag/Tag'
import { Page } from '/domain/models/page/Page'
import type { YearMonth } from '/domain/models/article/yearmonth/YearMonth'

export class CompositeArticleRepository implements IArticleRepository {
  constructor(
    private readonly localRepository: IArticleRepository,
    private readonly newtRepository: IArticleRepository
  ) {}

  async fetchArticleById(articleId: string): Promise<Article> {
    // ローカルを優先
    try {
      return await this.localRepository.fetchArticleById(articleId)
    } catch (error) {
      // ローカルに存在しない場合はNewtから取得
      return await this.newtRepository.fetchArticleById(articleId)
    }
  }

  async fetchArticlesByCategory(category: Category, page: Page): Promise<ArticleInfo> {
    const [localInfo, newtInfo] = await Promise.all([
      this.localRepository.fetchArticlesByCategory(category, new Page(1)),
      this.newtRepository.fetchArticlesByCategory(category, new Page(1))
    ])

    const merged = this._mergeArticleInfo(localInfo, newtInfo)
    return this._paginate(merged, page)
  }

  async fetchArticlesByTag(tag: Tag, page: Page): Promise<ArticleInfo> {
    const [localInfo, newtInfo] = await Promise.all([
      this.localRepository.fetchArticlesByTag(tag, new Page(1)),
      this.newtRepository.fetchArticlesByTag(tag, new Page(1))
    ])

    const merged = this._mergeArticleInfo(localInfo, newtInfo)
    return this._paginate(merged, page)
  }

  async fetchArticlesByYearMonth(yearmonth: YearMonth, page: Page): Promise<ArticleInfo> {
    const [localInfo, newtInfo] = await Promise.all([
      this.localRepository.fetchArticlesByYearMonth(yearmonth, new Page(1)),
      this.newtRepository.fetchArticlesByYearMonth(yearmonth, new Page(1))
    ])

    const merged = this._mergeArticleInfo(localInfo, newtInfo)
    return this._paginate(merged, page)
  }

  async fetchArticles(page: Page): Promise<ArticleInfo> {
    const [localInfo, newtInfo] = await Promise.all([
      this.localRepository.fetchArticles(new Page(1)),
      this.newtRepository.fetchArticles(new Page(1))
    ])

    const merged = this._mergeArticleInfo(localInfo, newtInfo)
    return this._paginate(merged, page)
  }

  async fetchAllArticles(): Promise<ArticleInfo> {
    const [localInfo, newtInfo] = await Promise.all([
      this.localRepository.fetchAllArticles(),
      this.newtRepository.fetchAllArticles()
    ])

    return this._mergeArticleInfo(localInfo, newtInfo)
  }

  /**
   * 2つのArticleInfoをマージ（ローカル優先、重複排除）
   */
  private _mergeArticleInfo(localInfo: ArticleInfo, newtInfo: ArticleInfo): ArticleInfo {
    const articleMap = new Map<string, Article>()

    // まずローカルの記事を全て追加
    for (const article of localInfo.articles) {
      articleMap.set(article.articleId, article)
    }

    // Newtの記事で重複しないものだけ追加
    for (const article of newtInfo.articles) {
      if (!articleMap.has(article.articleId)) {
        articleMap.set(article.articleId, article)
      }
    }

    const mergedArticles = Array.from(articleMap.values())

    // publishedAtで降順ソート
    mergedArticles.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return {
      articles: mergedArticles,
      totalCount: mergedArticles.length
    }
  }

  /**
   * マージされた記事をページネーション
   */
  private _paginate(articleInfo: ArticleInfo, page: Page): ArticleInfo {
    const skip = page.hasPrev() ? page.prev.value * Page.ARTICLE_NUM_PER_PAGE : 0
    const paginatedArticles = articleInfo.articles.slice(skip, skip + Page.ARTICLE_NUM_PER_PAGE)

    return {
      articles: paginatedArticles,
      totalCount: articleInfo.totalCount
    }
  }
}

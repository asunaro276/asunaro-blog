import { getCollection, getEntry } from 'astro:content'
import { marked } from 'marked'
import type { IArticleRepository, ArticleInfo } from '/domain/interfaces/article/IArticleRepository'
import { Article } from '/domain/models/article/Article'
import { Category } from '/domain/models/article/category/Category'
import { Tag } from '/domain/models/article/tag/Tag'
import { CoverImage } from '/domain/models/article/cover-image/CoverImage'
import { Page } from '/domain/models/page/Page'
import type { YearMonth } from '/domain/models/article/yearmonth/YearMonth'

export class LocalMarkdownArticleRepository implements IArticleRepository {
  async fetchArticleById(articleId: string): Promise<Article> {
    const entry = (await getEntry('posts', articleId)) as any

    if (!entry) {
      throw new Error(`Article not found: ${articleId}`)
    }

    const htmlBody = await marked.parse(entry.body)

    return Article.create(
      entry.id,
      entry.data.title,
      entry.data.description,
      new CoverImage(
        entry.data.title, // title
        entry.data.coverImageAlt || entry.data.title, // altText
        entry.data.description, // description
        entry.data.coverImage.src.split('/').pop() || 'cover.jpg', // fileName
        entry.data.coverImage.height, // height
        entry.data.coverImage.width, // width
        entry.data.coverImage.src, // src - 後方互換性のため
        entry.data.coverImage // image - Astroの画像オブジェクト
      ),
      new Category(entry.data.category, entry.data.category),
      entry.data.tags.map((t: string) => new Tag(t, t)),
      htmlBody,
      entry.data.updatedAt?.toISOString() || entry.data.publishedAt.toISOString(),
      entry.data.publishedAt.toISOString()
    )
  }

  async fetchArticlesByCategory(category: Category, page: Page): Promise<ArticleInfo> {
    const allArticles = await this.fetchAllArticles()
    const filtered = allArticles.articles.filter(
      a => a.category.id === category.id
    )

    return this._paginate(filtered, page)
  }

  async fetchArticlesByTag(tag: Tag, page: Page): Promise<ArticleInfo> {
    const allArticles = await this.fetchAllArticles()
    const filtered = allArticles.articles.filter(
      a => a.tags.some(t => t.id === tag.id)
    )

    return this._paginate(filtered, page)
  }

  async fetchArticlesByYearMonth(yearmonth: YearMonth, page: Page): Promise<ArticleInfo> {
    const allArticles = await this.fetchAllArticles()
    const filtered = allArticles.articles.filter(
      a => a.yearmonth.value === yearmonth.value
    )

    return this._paginate(filtered, page)
  }

  async fetchArticles(page: Page): Promise<ArticleInfo> {
    const allArticles = await this.fetchAllArticles()
    return this._paginate(allArticles.articles, page)
  }

  async fetchAllArticles(): Promise<ArticleInfo> {
    const entries = (await getCollection('posts')) as any[]

    const articles = await Promise.all(
      entries.map(async (entry: any) => {
        const htmlBody = await marked.parse(entry.body)

        return Article.create(
          entry.id,
          entry.data.title,
          entry.data.description,
          new CoverImage(
            entry.data.title,
            entry.data.coverImageAlt || entry.data.title,
            entry.data.description,
            entry.data.coverImage.src.split('/').pop() || 'cover.jpg',
            entry.data.coverImage.height,
            entry.data.coverImage.width,
            entry.data.coverImage.src, // src - 後方互換性のため
            entry.data.coverImage // image - Astroの画像オブジェクト
          ),
          new Category(entry.data.category, entry.data.category),
          entry.data.tags.map((t: string) => new Tag(t, t)),
          htmlBody,
          entry.data.updatedAt?.toISOString() || entry.data.publishedAt.toISOString(),
          entry.data.publishedAt.toISOString()
        )
      })
    )

    // publishedAtで降順ソート
    articles.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return {
      articles,
      totalCount: articles.length
    }
  }

  private _paginate(articles: Article[], page: Page): ArticleInfo {
    const skip = page.hasPrev() ? page.prev.value * Page.ARTICLE_NUM_PER_PAGE : 0
    const paginatedArticles = articles.slice(skip, skip + Page.ARTICLE_NUM_PER_PAGE)

    return {
      articles: paginatedArticles,
      totalCount: articles.length
    }
  }
}

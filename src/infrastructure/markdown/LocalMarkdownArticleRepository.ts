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
    const entry = await getEntry('posts', articleId)

    if (!entry) {
      throw new Error(`Article not found: ${articleId}`)
    }

    const htmlBody = await marked.parse(entry.body ?? "本文はまだ書かれていません")

    // coverImageがない場合のデフォルト処理
    const coverImage = entry.data.coverImage
      ? new CoverImage(
          entry.data.title,
          entry.data.coverImageAlt || entry.data.title,
          entry.data.description,
          typeof entry.data.coverImage === 'string'
            ? entry.data.coverImage.split('/').pop() || 'cover.jpg'
            : entry.data.coverImage.src.split('/').pop() || 'cover.jpg',
          typeof entry.data.coverImage === 'string' ? 630 : entry.data.coverImage.height,
          typeof entry.data.coverImage === 'string' ? 1200 : entry.data.coverImage.width,
          typeof entry.data.coverImage === 'string' ? entry.data.coverImage : entry.data.coverImage.src,
          typeof entry.data.coverImage === 'string' ? undefined : entry.data.coverImage
        )
      : new CoverImage(
          entry.data.title,
          entry.data.coverImageAlt || entry.data.title,
          entry.data.description,
          'default-cover.jpg',
          630,
          1200,
          '/images/default-cover.jpg',
          undefined
        )

    return Article.create(
      entry.id,
      entry.data.title,
      entry.data.description,
      coverImage,
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
    const entries = await getCollection('posts')

    const articles = await Promise.all(
      entries.map(async (entry: any) => {
        const htmlBody = await marked.parse(entry.body)

        // coverImageがない場合のデフォルト処理
        const coverImage = entry.data.coverImage
          ? new CoverImage(
              entry.data.title,
              entry.data.coverImageAlt || entry.data.title,
              entry.data.description,
              typeof entry.data.coverImage === 'string'
                ? entry.data.coverImage.split('/').pop() || 'cover.jpg'
                : entry.data.coverImage.src.split('/').pop() || 'cover.jpg',
              typeof entry.data.coverImage === 'string' ? 630 : entry.data.coverImage.height,
              typeof entry.data.coverImage === 'string' ? 1200 : entry.data.coverImage.width,
              typeof entry.data.coverImage === 'string' ? entry.data.coverImage : entry.data.coverImage.src,
              typeof entry.data.coverImage === 'string' ? undefined : entry.data.coverImage
            )
          : new CoverImage(
              entry.data.title,
              entry.data.coverImageAlt || entry.data.title,
              entry.data.description,
              'default-cover.jpg',
              630,
              1200,
              '/images/default-cover.jpg',
              undefined
            )

        return Article.create(
          entry.id,
          entry.data.title,
          entry.data.description,
          coverImage,
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

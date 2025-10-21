import { getCollection, getEntry } from 'astro:content'
import { marked } from 'marked'
import type { IArticleRepository, ArticleInfo } from '/domain/interfaces/article/IArticleRepository'
import { Article } from '/domain/models/article/Article'
import { Category } from '/domain/models/article/category/Category'
import { Tag } from '/domain/models/article/tag/Tag'
import { CoverImage } from '/domain/models/article/cover-image/CoverImage'
import { Page } from '/domain/models/page/Page'
import type { YearMonth } from '/domain/models/article/yearmonth/YearMonth'

/**
 * Markdown内の相対パス画像を絶対パスに変換
 * - ../assets/image.png → /assets/image.png
 */
function transformMarkdownImagePaths(markdown: string): string {
  return markdown.replace(/!\[([^\]]*)\]\(\.\.\/assets\/([^)]+)\)/g, '![$1](/assets/$2)')
}

/**
 * coverImageの相対パスを絶対パスに変換
 * - ../assets/cover.png → /assets/cover.png
 */
function transformCoverImagePath(coverImagePath: string): string {
  return coverImagePath.replace(/^\.\.\/assets\//, '/assets/')
}

export class LocalMarkdownArticleRepository implements IArticleRepository {
  async fetchArticleById(articleId: string): Promise<Article> {
    const entry = await getEntry('posts', articleId)

    if (!entry) {
      throw new Error(`Article not found: ${articleId}`)
    }

    // Markdown内の画像パスを変換してからHTMLに変換
    const transformedMarkdown = transformMarkdownImagePaths(entry.body ?? "本文はまだ書かれていません")
    const htmlBody = await marked.parse(transformedMarkdown)

    // coverImageの処理（Astroのimage()型またはURL文字列）
    let coverImage: CoverImage
    if (!entry.data.coverImage) {
      // coverImageがない場合のデフォルト
      coverImage = new CoverImage(
        entry.data.title,
        entry.data.coverImageAlt || entry.data.title,
        entry.data.description,
        'default-cover.jpg',
        630,
        1200,
        '/images/default-cover.jpg',
        undefined
      )
    } else if (typeof entry.data.coverImage === 'string') {
      // R2やNewtからのURL文字列、または相対パス
      const coverImageUrl = transformCoverImagePath(entry.data.coverImage)
      coverImage = new CoverImage(
        entry.data.title,
        entry.data.coverImageAlt || entry.data.title,
        entry.data.description,
        coverImageUrl.split('/').pop() || 'cover.jpg',
        630,
        1200,
        coverImageUrl,
        undefined
      )
    } else {
      // Astroの画像オブジェクト（globローダー使用時）
      coverImage = new CoverImage(
        entry.data.title,
        entry.data.coverImageAlt || entry.data.title,
        entry.data.description,
        'cover.jpg',
        entry.data.coverImage.height || 630,
        entry.data.coverImage.width || 1200,
        entry.data.coverImage.src || '',
        entry.data.coverImage // Astroの画像オブジェクト全体を渡す
      )
    }

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
    const entries = await getCollection('posts', (entry) => {
      // 本番環境では公開記事のみ、開発環境では全記事を取得
      if (import.meta.env.PROD) {
        return entry.data.status === 'published'
      }
      return true
    })

    const articles = await Promise.all(
      entries.map(async (entry: any) => {
        // Markdown内の画像パスを変換してからHTMLに変換
        const transformedMarkdown = transformMarkdownImagePaths(entry.body ?? "")
        const htmlBody = await marked.parse(transformedMarkdown)

        // coverImageの処理（Astroのimage()型またはURL文字列）
        let coverImage: CoverImage
        if (!entry.data.coverImage) {
          // coverImageがない場合のデフォルト
          coverImage = new CoverImage(
            entry.data.title,
            entry.data.coverImageAlt || entry.data.title,
            entry.data.description,
            'default-cover.jpg',
            630,
            1200,
            '/images/default-cover.jpg',
            undefined
          )
        } else if (typeof entry.data.coverImage === 'string') {
          // R2やNewtからのURL文字列、または相対パス
          const coverImageUrl = transformCoverImagePath(entry.data.coverImage)
          coverImage = new CoverImage(
            entry.data.title,
            entry.data.coverImageAlt || entry.data.title,
            entry.data.description,
            coverImageUrl.split('/').pop() || 'cover.jpg',
            630,
            1200,
            coverImageUrl,
            undefined
          )
        } else {
          // Astroの画像オブジェクト（globローダー使用時）
          coverImage = new CoverImage(
            entry.data.title,
            entry.data.coverImageAlt || entry.data.title,
            entry.data.description,
            'cover.jpg',
            entry.data.coverImage.height || 630,
            entry.data.coverImage.width || 1200,
            entry.data.coverImage.src || '',
            entry.data.coverImage // Astroの画像オブジェクト全体を渡す
          )
        }

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

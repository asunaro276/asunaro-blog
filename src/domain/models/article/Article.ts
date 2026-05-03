import { YearMonth } from "./yearmonth/YearMonth";
import type { CoverImage } from "./cover-image/CoverImage";
import type { Tag } from "./tag/Tag";
import type { Category } from "./category/Category";
import type { Heading } from "./heading/Heading";

export class Article {
  readonly yearmonth: YearMonth
  tableOfContents?: Heading[]

  private constructor(
    readonly articleId: string,
    readonly title: string,
    readonly description: string,
    readonly coverImage: CoverImage,
    readonly category: Category,
    readonly tags: Tag[],
    private _htmlBody: string,
    readonly updateAt: string,
    readonly publishedAt: string
  ) {
    const publishedAtDate = new Date(publishedAt)
    this.yearmonth = new YearMonth(publishedAtDate.getFullYear(), publishedAtDate.getMonth() + 1)
  }

  get htmlBody(): string {
    return this._htmlBody
  }

  set htmlBody(htmlBody: string) {
    this._htmlBody = htmlBody
  }

  static create(
    articleId: string,
    title: string,
    description: string,
    coverImage: CoverImage,
    category: Category,
    tags: Tag[],
    htmlBody: string,
    updateAt: string,
    publishedAt: string
  ) {
    return new Article(articleId, title, description, coverImage, category, tags, htmlBody, updateAt, publishedAt)
  }

  serialize(): Article {
    return Object.assign(this)
  }
  
  static selectSuggested(current: Article, all: Article[]): Article[] {
    const others = all.filter(a => a.articleId !== current.articleId)
    const byDate = (a: Article, b: Article) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

    const result: Article[] = []
    const added = new Set<string>()

    const fill = (candidates: Article[]) => {
      for (const a of [...candidates].sort(byDate)) {
        if (result.length >= 10) break
        if (!added.has(a.articleId)) {
          result.push(a)
          added.add(a.articleId)
        }
      }
    }

    // 1. 同一タグ
    fill(others.filter(a => a.tags.some(t => current.tags.some(ct => ct.id === t.id))))
    // 2. 同一カテゴリ
    if (result.length < 10) fill(others.filter(a => a.category.equals(current.category)))
    // 3. 全記事
    if (result.length < 10) fill(others)

    return result
  }

  static formatDate(date: string): string {
    if (date === null) {
      return ''
    }
    const date_converted = date.split('-')
    return `${date_converted[0]}.${date_converted[1]}.${date_converted[2].split('T')[0]}`
  }
}

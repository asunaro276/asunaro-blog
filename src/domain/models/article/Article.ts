import { YearMonth } from "./yearmonth/YearMonth";
import type { CoverImage } from "./cover-image/CoverImage";
import type { Tag } from "./tag/Tag";
import type { Category } from "./category/Category";

export class Article {
  readonly yearmonth: YearMonth

  private constructor(
    readonly articleId: string,
    readonly title: string,
    readonly description: string,
    readonly coverImage: CoverImage,
    readonly category: Category,
    readonly tags: Tag[],
    readonly htmlBody: string,
    readonly updateAt: string,
    readonly publishedAt: string
  ) {
    const publishedAtDate = new Date(publishedAt)
    this.yearmonth = new YearMonth(publishedAtDate.getFullYear(), publishedAtDate.getMonth())
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

  static reconstruct(
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
}

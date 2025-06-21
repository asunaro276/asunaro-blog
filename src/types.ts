
// 記事本文に関する型
export type ArticleId = string
export type Article = {
  title: string
  description: string
  coverImage: CoverImage
  category: CategoryItem
  tags: TagItem[]
  body: string
}
export type ArticleItem = NewtItems<Article>
export type ArticleResponse = NewtResponse<ArticleItem>

// タグに関する型
export type TagId = string
export type Tag = {
  tag: string
  ref: ArticleId[] | ArticleItem[]
  // ref: ArticleItem[]
}
export type TagItem = NewtItems<Tag>
export type TagResponse = NewtResponse<TagItem>

// 年月に関する型
export type YearMonthId = string
export type YearMonth = {
  yearmonth: string
  ref: ArticleId[] | ArticleItem[]
  // ref: ArticleItem[]
}
export type YearMonthItem = NewtItems<YearMonth>
export type YearMonthResponse = NewtResponse<YearMonthItem>


export type CategoryId = string
// カテゴリーに関する型
export type Category = {
  displayedName: string
  name: string
  // ref: ArticleItem[]
  ref: ArticleId[] | ArticleItem[]
}
export type CategoryItem = NewtItems<Category>
export type CategoryResponse = NewtResponse<CategoryItem>

export type CoverImage = {
  _id: string
  altText: string
  description: string
  fileName: string
  fileSize: number
  fileType: string
  height: number
  metadata: object
  src: string
  title: string
  width: number
}

export type Sys = {
  raw: {
    createdAt: string
    updatedAt: string
    firstPublishedAt: string
    publishedAt: string
  }
  customOrder: number
  createdAt: string
  updatedAt: string
}

export type OGP = {
  title: string
  description: string
  image: string
  [key: string]: string
}

export type NewtResponse<T> = {
  skip: number
  limit: number
  total: number
  items: T[]
}

export type NewtItems<T> = {
  _id: ArticleId | TagId | CategoryId | YearMonthId
  _sys: Sys
} & T

export type Page = number

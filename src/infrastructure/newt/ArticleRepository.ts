import { URL } from "url";
import { appUid, newtClient } from "./Client";
import type { ArticleItem } from "./types";
import { Article } from "/domain/models/article/Article";
import { Category } from "/domain/models/article/category/Category";
import { CoverImage } from "/domain/models/article/cover-image/CoverImage";
import type { ArticleInfo, IArticleRepository } from "/domain/interfaces/article/IArticleRepository";
import { Page } from '/domain/models/page/Page';
import { Tag } from "/domain/models/article/tag/Tag";
import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

const modelUid = 'article'
const params = {
  appUid,
  modelUid
}

export class NewtArticleRepository implements IArticleRepository {
  async fetchArticleById(articleId: string): Promise<Article> {
    const article = await newtClient.getContent<ArticleItem>({
      ...params,
      contentId: articleId,
    })
    return Article.create(
      article._id,
      article.title,
      article.description,
      new CoverImage(
        article.coverImage.title,
        article.coverImage.altText,
        article.coverImage.description,
        article.coverImage.fileName,
        article.coverImage.height,
        article.coverImage.width,
        new URL(article.coverImage.src)
      ),
      new Category(article.category._id, article.category.displayedName),
      article.tags.map(t => new Tag(t._id, t.tag)),
      article.body,
      article._sys.raw.updatedAt,
      article._sys.raw.publishedAt
    )
  }

  async fetchArticles(page: Page): Promise<ArticleInfo> {
    const articles = await newtClient.getContents<ArticleItem>({
      ...params,
      query: {
        skip: page.hasPrev() ? page.prev.value * Page.ARTICLE_NUM_PER_PAGE : 0,
        limit: Page.ARTICLE_NUM_PER_PAGE
      }
    })
    return {
      articles: articles.items.map(a => Article.create(
        a._id,
        a.title,
        a.description,
        new CoverImage(
          a.coverImage.title,
          a.coverImage.altText,
          a.coverImage.description,
          a.coverImage.fileName,
          a.coverImage.height,
          a.coverImage.width,
          new URL(a.coverImage.src)
        ),
        new Category(a.category._id, a.category.displayedName),
        a.tags.map(t => new Tag(t._id, t.tag)),
        a.body,
        a._sys.raw.updatedAt,
        a._sys.raw.publishedAt
      )),
      totalCount: articles.total
    }
  }
  async fetchArticlesByTag(tag: Tag, page: Page): Promise<ArticleInfo> {
    const articles = await newtClient.getContents<ArticleItem>({
      ...params,
      query: {
        tags: { in: [tag.id] },
        skip: (page.value - 1) * Page.ARTICLE_NUM_PER_PAGE,
        limit: Page.ARTICLE_NUM_PER_PAGE
      },
    })
    return {
      articles: articles.items.map(
        a => Article.create(
          a._id,
          a.title,
          a.description,
          new CoverImage(a.coverImage.title, a.coverImage.altText, a.coverImage.description, a.coverImage.fileName, a.coverImage.height, a.coverImage.width, new URL(a.coverImage.src)),
          new Category(a.category._id, a.category.displayedName),
          a.tags.map(t => new Tag(t._id, t.tag)),
          a.body,
          a._sys.raw.updatedAt,
          a._sys.raw.publishedAt
        )
      ),
      totalCount: articles.total
    }
  }
  async fetchArticlesByCategory(category: Category, page: Page): Promise<ArticleInfo> {
    const articles = await newtClient.getContents<ArticleItem>({
      ...params,
      query: {
        category: category.id,
        skip: (page.value - 1) * Page.ARTICLE_NUM_PER_PAGE,
        limit: Page.ARTICLE_NUM_PER_PAGE
      }
    })
    return {
      articles: articles.items.map(
        a => Article.create(
          a._id,
          a.title,
          a.description,
          new CoverImage(a.coverImage.title, a.coverImage.altText, a.coverImage.description, a.coverImage.fileName, a.coverImage.height, a.coverImage.width, new URL(a.coverImage.src)),
          new Category(a.category._id, a.category.displayedName),
          a.tags.map(t => new Tag(t._id, t.tag)),
          a.body,
          a._sys.raw.updatedAt,
          a._sys.raw.publishedAt
        )
      ),
      totalCount: articles.total
    }
  }
  async fetchArticlesByYearMonth(yearmonth: YearMonth, page: Page): Promise<ArticleInfo> {
    const articles = await newtClient.getContents<ArticleItem>({
      ...params,
      query: { "_sys.raw.publishedAt": { gte: yearmonth.value, lt: yearmonth.next }, skip: (page.value - 1) * Page.ARTICLE_NUM_PER_PAGE, limit: Page.ARTICLE_NUM_PER_PAGE }
    })
    return {
      articles: articles.items.map(
        a => Article.create(
          a._id,
          a.title,
          a.description,
          new CoverImage(a.coverImage.title, a.coverImage.altText, a.coverImage.description, a.coverImage.fileName, a.coverImage.height, a.coverImage.width, new URL(a.coverImage.src)),
          new Category(a.category._id, a.category.displayedName),
          a.tags.map(t => new Tag(t._id, t.tag)),
          a.body,
          a._sys.raw.updatedAt,
          a._sys.raw.publishedAt
        )
      ), totalCount: articles.total
    }
  }
  async fetchAllArticles(): Promise<ArticleInfo> {
    const articles = await newtClient.getContents<ArticleItem>({
      ...params,
      query: { skip: 0, limit: 1000 }
    })
    return {
      articles: articles.items.map(
        a => Article.create(
          a._id,
          a.title,
          a.description,
          new CoverImage(a.coverImage.title, a.coverImage.altText, a.coverImage.description, a.coverImage.fileName, a.coverImage.height, a.coverImage.width, new URL(a.coverImage.src)),
          new Category(a.category._id, a.category.displayedName),
          a.tags.map(t => new Tag(t._id, t.tag)),
          a.body,
          a._sys.raw.updatedAt,
          a._sys.raw.publishedAt
        )
      ),
      totalCount: articles.total
    }
  }
}

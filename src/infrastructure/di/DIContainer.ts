import { NewtArticleRepository } from "/infrastructure/newt/ArticleRepository";
import { NewtCategoryRepository } from "/infrastructure/newt/CategoryRepository";
import { NewtTagRepository } from "/infrastructure/newt/TagRepository";
import { NewtYearMonthRepository } from "/infrastructure/newt/YearMonthRepository";
import { LocalMarkdownArticleRepository } from "/infrastructure/markdown/LocalMarkdownArticleRepository";
import { LocalMarkdownCategoryRepository } from "/infrastructure/markdown/LocalMarkdownCategoryRepository";
import { LocalMarkdownTagRepository } from "/infrastructure/markdown/LocalMarkdownTagRepository";
import { LocalMarkdownYearMonthRepository } from "/infrastructure/markdown/LocalMarkdownYearMonthRepository";
import { CompositeArticleRepository } from "/infrastructure/composite/CompositeArticleRepository";
import { CompositeCategoryRepository } from "/infrastructure/composite/CompositeCategoryRepository";
import { CompositeTagRepository } from "/infrastructure/composite/CompositeTagRepository";
import { CompositeYearMonthRepository } from "/infrastructure/composite/CompositeYearMonthRepository";
import { GetArticle } from "/usecase/getArticle/GetArticle";
import { GetCategoryArticleList } from "/usecase/getCategoryArticleList/GetCategoryArticleList";
import { GetTagArticleList } from "/usecase/getTagArticleList/GetTagArticleList";
import { GetYearmonthArticleList } from "/usecase/getYearmonthArticleList/GetYearmonthArticleList";
import { GetPagePaths } from "/usecase/getPagePaths/GetPagePaths";
import { GetCategoryPaths } from "/usecase/getCategoryPaths/GetCategoryPaths";
import { GetTagPaths } from "/usecase/getTagPaths/GetTagPaths";
import { GetYearmonthPaths } from "/usecase/getYearmonthPaths/GetYearmonthPaths";
import type { IArticleRepository } from "/domain/interfaces/article/IArticleRepository";
import type { ICategoryRepository } from "/domain/interfaces/article/ICategoryRepository";
import type { ITagRepository } from "/domain/interfaces/article/ITagRepository";
import type { IYearMonthRepository } from "/domain/interfaces/article/IYearMonthRepository";
import { GetArticleList } from "/usecase/getArticleList/GetArticleList";
import type { HtmlParser } from "/domain/interfaces/article/IHtmlParser";
import { cheerioParser } from "../htmlParser/cheerioParser";

/**
 * 依存関係注入コンテナ
 * 全てのRepositoryとUseCaseのインスタンス作成を一元管理
 */
export class DIContainer {
  static htmlParser: HtmlParser = cheerioParser;
  // Repositories (シングルトン)
  private static _articleRepository: IArticleRepository;
  private static _categoryRepository: ICategoryRepository;
  private static _tagRepository: ITagRepository;
  private static _yearMonthRepository: IYearMonthRepository;

  static get articleRepository(): IArticleRepository {
    if (!this._articleRepository) {
      const localRepo = new LocalMarkdownArticleRepository();
      const newtRepo = new NewtArticleRepository();
      this._articleRepository = new CompositeArticleRepository(localRepo, newtRepo);
    }
    return this._articleRepository;
  }

  static get categoryRepository(): ICategoryRepository {
    if (!this._categoryRepository) {
      const localRepo = new LocalMarkdownCategoryRepository();
      const newtRepo = new NewtCategoryRepository();
      this._categoryRepository = new CompositeCategoryRepository(localRepo, newtRepo);
    }
    return this._categoryRepository;
  }

  static get tagRepository(): ITagRepository {
    if (!this._tagRepository) {
      const localRepo = new LocalMarkdownTagRepository();
      const newtRepo = new NewtTagRepository();
      this._tagRepository = new CompositeTagRepository(localRepo, newtRepo);
    }
    return this._tagRepository;
  }

  static get yearMonthRepository(): IYearMonthRepository {
    if (!this._yearMonthRepository) {
      const localRepo = new LocalMarkdownYearMonthRepository();
      const newtRepo = new NewtYearMonthRepository();
      this._yearMonthRepository = new CompositeYearMonthRepository(localRepo, newtRepo);
    }
    return this._yearMonthRepository;
  }

  // UseCases
  static createGetArticle(): GetArticle {
    return new GetArticle(
      this.articleRepository,
      this.categoryRepository,
      this.tagRepository,
      this.yearMonthRepository,
      this.htmlParser
    );
  }

  static createGetArticleList(): GetArticleList {
    return new GetArticleList(
      this.articleRepository,
      this.categoryRepository,
      this.tagRepository,
      this.yearMonthRepository
    );
  }

  static createGetCategoryArticleList(): GetCategoryArticleList {
    return new GetCategoryArticleList(
      this.articleRepository,
      this.categoryRepository,
      this.tagRepository,
      this.yearMonthRepository
    );
  }

  static createGetTagArticleList(): GetTagArticleList {
    return new GetTagArticleList(
      this.articleRepository,
      this.categoryRepository,
      this.tagRepository,
      this.yearMonthRepository
    );
  }

  static createGetYearmonthArticleList(): GetYearmonthArticleList {
    return new GetYearmonthArticleList(
      this.articleRepository,
      this.categoryRepository,
      this.tagRepository,
      this.yearMonthRepository
    );
  }

  static createGetPagePaths(): GetPagePaths {
    return new GetPagePaths(this.articleRepository);
  }

  static createGetCategoryPaths(): GetCategoryPaths {
    return new GetCategoryPaths(this.articleRepository, this.categoryRepository);
  }

  static createGetTagPaths(): GetTagPaths {
    return new GetTagPaths(this.articleRepository, this.tagRepository);
  }

  static createGetYearmonthPaths(): GetYearmonthPaths {
    return new GetYearmonthPaths(this.articleRepository, this.yearMonthRepository);
  }
} 

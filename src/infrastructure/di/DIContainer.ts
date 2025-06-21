import { NewtArticleRepository } from "/infrastructure/newt/ArticleRepository";
import { NewtCategoryRepository } from "/infrastructure/newt/CategoryRepository";
import { NewtTagRepository } from "/infrastructure/newt/TagRepository";
import { NewtYearMonthRepository } from "/infrastructure/newt/YearMonthRepository";
import { GetArticleData } from "/usecase/getArticleData/GetArticleData";
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

/**
 * 依存関係注入コンテナ
 * 全てのRepositoryとUseCaseのインスタンス作成を一元管理
 */
export class DIContainer {
  // Repositories (シングルトン)
  private static _articleRepository: IArticleRepository;
  private static _categoryRepository: ICategoryRepository;
  private static _tagRepository: ITagRepository;
  private static _yearMonthRepository: IYearMonthRepository;

  static get articleRepository(): IArticleRepository {
    if (!this._articleRepository) {
      this._articleRepository = new NewtArticleRepository();
    }
    return this._articleRepository;
  }

  static get categoryRepository(): ICategoryRepository {
    if (!this._categoryRepository) {
      this._categoryRepository = new NewtCategoryRepository();
    }
    return this._categoryRepository;
  }

  static get tagRepository(): ITagRepository {
    if (!this._tagRepository) {
      this._tagRepository = new NewtTagRepository();
    }
    return this._tagRepository;
  }

  static get yearMonthRepository(): IYearMonthRepository {
    if (!this._yearMonthRepository) {
      this._yearMonthRepository = new NewtYearMonthRepository();
    }
    return this._yearMonthRepository;
  }

  // UseCases
  static createGetArticleData(): GetArticleData {
    return new GetArticleData(
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

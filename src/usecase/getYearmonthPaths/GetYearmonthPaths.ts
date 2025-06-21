import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { PathDTO } from "./DTO";
import type { IYearMonthRepository } from "/domain/models/article/yearmonth/IYearMonthRepository";


export class GetYearmonthPaths {
  constructor(
    private articleRepository: IArticleRepository,
    private yearmonthRepository: IYearMonthRepository,
  ) {}
  async execute(): Promise<PathDTO[]> {
    const { articles } = await this.articleRepository.fetchAllArticles()
    const yearmonths = await this.yearmonthRepository.fetchYearMonths()
    const articlesByYearmonth = yearmonths.map(yearmonth => ({
      yearmonth: yearmonth,
      articles: articles.filter((article) => article.yearmonth.equals(yearmonth))
    }))
    return articlesByYearmonth
  }
}

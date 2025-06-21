import type { YearMonth } from "/domain/models/article/yearmonth/YearMonth";
import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type GetYearMonthPathsCommand = { yearmonth: YearMonth, page: Page }

export class GetYearMonthPaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command: GetYearMonthPathsCommand): Promise<Path[]> {
    const { articles } = await this.articleRepository.fetchArticle(command)
    const paths = articles.map(_ => new Path('yearmonth', command.yearmonth.value, command.page));
    return paths
  }
}

import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type GetPagePathsCommand = { page: Page }

export class GetPagePaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command: GetPagePathsCommand): Promise<Path[]> {
    const { articles } = await this.articleRepository.fetchArticle(command)
    const paths = articles.map(v => new Path('', '', command.page));
    return paths
  }
}

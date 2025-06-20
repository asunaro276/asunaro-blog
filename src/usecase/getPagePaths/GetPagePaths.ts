import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type GetPagePathsCommand = { page: Page }

export class GetPagePaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command: GetPagePathsCommand): Promise<Path[]> {
    const { totalCount } = await this.articleRepository.fetchArticle(command)
    const paths = [...Array(totalCount - command.page.value + 1)].map((_, i) => new Path('', '', new Page(command.page.value + i)))
    return paths
  }
}

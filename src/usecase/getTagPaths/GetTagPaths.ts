import type { Tag } from "/domain/models/article/tag/Tag";
import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type GetTagPathsCommand = { tag: Tag, page: Page }

export class GetTagPaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command: GetTagPathsCommand): Promise<Path[]> {
    const { articles } = await this.articleRepository.fetchArticle(command)
    const paths = articles.map(v => new Path('tag', command.tag.name, command.page));
    return paths
  }
}

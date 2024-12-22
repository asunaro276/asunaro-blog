import type { Category } from "/domain/models/article/category/Category";
import type { IArticleRepository } from "/domain/models/article/IArticleRepository";
import type { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type GetCategoryPathsCommand = { category: Category, page: Page }

export class GetCategoryPaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(command: GetCategoryPathsCommand): Promise<Path[]> {
    const { articles } = await this.articleRepository.fetchArticle(command)
    const paths = articles.map(v => new Path('category', command.category.name, command.page));
    return paths
  }
}

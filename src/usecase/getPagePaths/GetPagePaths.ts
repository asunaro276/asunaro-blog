import type { IArticleRepository } from "/domain/interfaces/article/IArticleRepository";
import type { PathDTO } from "./DTO";

export class GetPagePaths {
  constructor(
    private articleRepository: IArticleRepository,
  ) {}
  async execute(): Promise<PathDTO[]> {
    const { articles } = await this.articleRepository.fetchAllArticles()
    return articles.map(article => ({articles: [article]}))
  }
}

import type { IArticleRepository } from "/domain/interfaces/article/IArticleRepository";
import type { ITagRepository } from "/domain/interfaces/article/ITagRepository";
import type { PathDTO } from "./DTO";

export class GetTagPaths {
  constructor(
    private articleRepository: IArticleRepository,
    private tagRepository: ITagRepository,
  ) {}
  async execute(): Promise<PathDTO[]> {
    const { articles } = await this.articleRepository.fetchAllArticles()
    const tags = await this.tagRepository.fetchTags()
    const articlesByTag = tags.map(tag => ({
      tag: tag,
      articles: articles.filter((article) => article.tags.some(t => t.equals(tag)))
    }))
    return articlesByTag
  }
}

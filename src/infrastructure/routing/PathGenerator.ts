import type { PathGenerator as IPathGenerator, PathInfo } from "/domain/interfaces/routing/PathGenerator";

const Directory = ['', 'blog', 'tag', 'category', 'yearmonth'] as const;
type Directory = typeof Directory[number];

export class PathGenerator implements IPathGenerator {
  generatePath(pathInfo: PathInfo): string {
    this.validate(pathInfo.directory, pathInfo.id);
    
    const pathElements = [pathInfo.directory, pathInfo.id, pathInfo.page.str].filter(v => Boolean(v));
    if (pathInfo.directory === '' && pathInfo.id === '' && pathInfo.page.value === 1) {
      return '/';
    } else {
      return '/' + pathElements.join("/");
    }
  }

  generateNextPagePath(pathInfo: PathInfo): string {
    return this.generatePath({
      ...pathInfo,
      page: pathInfo.page.next
    });
  }

  generatePrevPagePath(pathInfo: PathInfo): string {
    return this.generatePath({
      ...pathInfo,
      page: pathInfo.page.prev
    });
  }

  private validate(directory: string, id: string): void {
    if (directory === '' && id !== '') {
      throw new Error('全記事一覧にIDは指定できません');
    }

    if (directory !== '' && id === '') {
      throw new Error(`パス（${directory}）にはIDを指定する必要があります`);
    }
  }
} 

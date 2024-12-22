import { isEqual } from "lodash"
import type { Page } from "../page/Page"

const Directory = ['', 'blog', 'tag', 'category', 'yearmonth'] as const
type Directory = typeof Directory[number]

export class Path {
  constructor(
    readonly directory: Directory,
    readonly id: string,
    readonly page: Page
  ) {
    this.validate(directory, id, page)
  }

  private validate(directory: Directory, id: string, page: Page): void {
    if(directory === '' && id !== '') {
      throw new Error('全記事一覧にIDは指定できません')
    }

    if(directory !== '' && id === '') {
      throw new Error(`パス（${directory}）にはIDを指定する必要があります`)
    }
  }

  equals(other: Path): boolean {
    return isEqual(this.value, other.value)
  }

  get nextPage(): Path {
    return new Path(this.directory, this.id, this.page.next)
  }

  get prevPage(): Path {
    return new Path(this.directory, this.id, this.page.prev)
  }

  get value(): string {
    const pathElements = [this.directory, this.id, this.page.str].filter(v => Boolean(v))
    return '/' + pathElements.join("/")
  }
}

import isEqual from "lodash/isEqual"
import { Page } from "../page/Page"

const Directory = ['', 'blog', 'tag', 'category', 'yearmonth'] as const
type Directory = typeof Directory[number]

export class Path {
  constructor(
    readonly directory: Directory,
    readonly id: string,
    readonly page: Page
  ) {
    this.validate(directory, id)
  }

  private validate(directory: Directory, id: string): void {
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
    const pathElements = [this.directory, this.id, this.page.value].filter(v => Boolean(v))
    if (this.directory === '' && this.id === '' && this.page.value === 1) {
      return '/'
    } else {
      return '/' + pathElements.join("/")
    }
  }
}

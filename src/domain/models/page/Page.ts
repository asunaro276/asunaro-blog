import { isEqual } from "lodash"

export class Page {
  static ARTICLE_NUM_PER_PAGE = 10
  constructor(
    private readonly _value: number
  ) {
    this.validate(_value)
  }

  private validate(value: number): void {
    if (!(Number.isInteger(value) && value > 0)) {
      throw new Error('ページ番号が自然数ではありません')
    }
  }

  equals(other: Page): boolean {
    return isEqual(this._value, other._value)
  }

  get str(): string {
    if (this.hasPrev()) {
      return String(this._value)
    } else {
      return ''
    }
  }

  get value(): number {
    return this._value
  }

  get next(): Page {
    return new Page(this._value + 1)
  }

  get prev(): Page {
    return new Page(this._value - 1)
  }

  hasPrev(): boolean {
    return this._value > 1
  }
}

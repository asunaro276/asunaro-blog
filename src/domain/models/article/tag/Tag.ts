import isEqual from "lodash/isEqual"

export class Tag {
  private _count: number = 0

  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  equals(other: Tag): boolean {
    return isEqual(this.id, other.id)
  }

  get count(): number {
    return this._count
  }

  set count(count: number) {
    this._count = count
  }
}

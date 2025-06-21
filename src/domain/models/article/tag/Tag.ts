import isEqual from "lodash/isEqual"

export class Tag {
  constructor(
    readonly id: string,
    readonly name: string,
    private _count?: number
  ) {}

  equals(other: Tag): boolean {
    return isEqual(this.id, other.id)
  }

  get count(): number {
    return this._count ?? 0
  }

  set count(count: number) {
    this._count = count
  }
}

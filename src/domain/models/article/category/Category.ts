import isEqual from "lodash/isEqual"

export class Category {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  get urlSlug(): string {
    return this.id.toLowerCase()
  }

  equals(other: Category): boolean {
    return isEqual(this.id, other.id)
  }
}

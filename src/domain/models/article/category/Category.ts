import { isEqual } from "lodash"

export class Category {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  equals(other: Category): boolean {
    return isEqual(this.id, other.id)
  }
}

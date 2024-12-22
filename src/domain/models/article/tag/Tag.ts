import { isEqual } from "lodash"

export class Tag {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  equals(other: Tag): boolean {
    return isEqual(this.id, other.id)
  }
}

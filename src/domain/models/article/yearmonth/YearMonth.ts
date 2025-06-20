import isEqual from "lodash/isEqual"

export class YearMonth {
  static startYear = 2023
  static thisYear= (new Date()).getFullYear()
  static monthList = Array.from({length: 12}, (_, k) => k + 1)

  constructor(
    private readonly _year: number,
    private readonly _month: number
  ) {
    this._year = _year
    this._month = _month
    this.validate(this._year, this._month)
  }

  private validate(year: number, month: number): void {
    if (!YearMonth.monthList.find(v => v === month)) {
      throw new Error('monthが有効ではありません')
    }

    if (!Number.isInteger(year)) {
      throw new Error('yearが整数ではありません')
    }

    if (year < YearMonth.startYear || YearMonth.thisYear < year) {
      throw new Error(`year(${year})は有効範囲（${YearMonth.startYear} ~ ${YearMonth.thisYear}）の外です`)
    }

  }

  equals(other: YearMonth): boolean {
    return isEqual(this.value, other.value)
  }

  get next(): string {
    if (this._month === 12) {
      return `${this._year + 1}-1`
    } else {
      return `${this._year}-${this._month + 1}`
    }
  }

  get value(): string {
    return `${this._year}-${this._month}`
  }

  get year(): number {
    return this._year
  }

  get month(): number {
    return this._month
  }
}

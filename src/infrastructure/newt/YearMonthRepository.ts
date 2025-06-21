import { appUid, newtClient } from "./Client";
import type { YearMonthItem } from "./types";
import type { IYearMonthRepository } from "/domain/interfaces/article/IYearMonthRepository";
import { YearMonth } from "/domain/models/article/yearmonth/YearMonth";

const modelUid = 'yearmonth'
const params = {
  appUid,
  modelUid
}

export class NewtYearMonthRepository implements IYearMonthRepository {
  async fetchYearMonths() {
    const yearmonths = (
      await newtClient.getContents<YearMonthItem>({
        ...params,
        query: {
          limit: 100,
          depth: 0
        },
      })
    )

    return yearmonths.items.map(v => {
      const [year, month] = v.yearmonth.split('-')
      return new YearMonth(Number(year), Number(month), v._id, v.ref.length)
    })
  }
}

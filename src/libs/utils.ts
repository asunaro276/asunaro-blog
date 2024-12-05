export const range = (n: number) => Array.from(Array(n), (_, k) => k + 1)

export const getNextYearmonth = (year: number, month: number): string => {
  if (month === 12) {
    return `${year + 1}-${month}`
  } else {
    return `${year}-${month + 1}`
  }
}

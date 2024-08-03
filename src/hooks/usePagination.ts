import { ARTICLE_NUM_PER_PAGE } from "/constants";

export function usePagination(currentPage: number, totalCount: number) {
  const totalPages = Math.ceil(totalCount / ARTICLE_NUM_PER_PAGE)
  const delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    range = [],
    rangeWithDots = []
  let l = 0

  for (let i = 1; i <= totalPages; i++) {
    if (i == 1 || i == totalPages || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return {
    pages: rangeWithDots,
    totalPages
  };
}

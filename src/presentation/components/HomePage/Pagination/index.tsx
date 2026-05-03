import { usePagination } from "../../../hooks/usePagination";
import { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type Props = {
  currentPath: Path;
  currentPage: Page;
  totalCount: number;
};

const Pagination = ({ currentPage, currentPath, totalCount }: Props) => {
  const { pages, totalPages } = usePagination(currentPage.value, totalCount);
  const hasPrev = currentPage.hasPrev();
  const hasNext = currentPage.value < totalPages;

  return (
    <nav data-pagination aria-label="ページナビゲーション" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      {/* Previous ボタン */}
      <a
        data-pagination-prev
        href={hasPrev ? currentPath.prevPage.value : undefined}
        aria-disabled={!hasPrev}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--fg-2)',
          textDecoration: 'none',
          borderRadius: 6,
          border: '1px solid var(--rule)',
          opacity: hasPrev ? 1 : 0.4,
          pointerEvents: hasPrev ? 'auto' : 'none',
          transition: 'opacity 0.15s',
        }}
      >
        ← Previous
      </a>

      {/* ページ番号チップ */}
      <div style={{ display: 'flex', gap: 4 }}>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dot-${index}`} style={{ display: 'flex', alignItems: 'center', padding: '0 4px', fontSize: 13, color: 'var(--fg-3)' }}>
                …
              </span>
            );
          }
          const pageNum = Number(page);
          const isCurrentPage = pageNum === currentPage.value;
          const to = new Path(currentPath.directory, currentPath.id, new Page(pageNum)).value;
          return (
            <a
              key={pageNum}
              href={to}
              data-page-current={isCurrentPage ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 6,
                fontSize: 13,
                fontWeight: isCurrentPage ? 600 : 400,
                textDecoration: 'none',
                transition: 'background-color 0.15s, color 0.15s',
                backgroundColor: isCurrentPage ? 'var(--accent)' : 'transparent',
                color: isCurrentPage ? 'var(--bg)' : 'var(--fg-2)',
              }}
            >
              {page}
            </a>
          );
        })}
      </div>

      {/* Next ボタン */}
      <a
        href={hasNext ? currentPath.nextPage.value : undefined}
        aria-disabled={!hasNext}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--fg-2)',
          textDecoration: 'none',
          borderRadius: 6,
          border: '1px solid var(--rule)',
          opacity: hasNext ? 1 : 0.4,
          pointerEvents: hasNext ? 'auto' : 'none',
          transition: 'opacity 0.15s',
        }}
      >
        Next →
      </a>
    </nav>
  );
};

export default Pagination;

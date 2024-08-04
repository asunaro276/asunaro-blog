import { usePagination } from "/hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { COLOR } from "/constants";

type Props = {
  dir: string;
  pageNumber: number;
  totalCount: number;
};

const Pagination = ({ dir, pageNumber, totalCount }: Props) => {
  const { pages, totalPages } = usePagination(pageNumber, totalCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-center gap-x-1.5 flex">
        <PaginationItem
          to={`${dir}/${pageNumber - 1}`}
          disabled={pageNumber === 1 ? true : false}
          hover={pageNumber === 1 ? false : true}
        >
          <span
            className="material-icons"
            style={{
              fontSize: "16px",
              color: COLOR.textColor.primary,
              opacity: pageNumber === 1 ? '0.4' : '1'
            }}
          >
            chevron_left
          </span>
        </PaginationItem>
        {
          pages.map((page, index) => {
            const to = (() => {
              if (dir === "") {
                return page === 1 ? `/` : `/${page}`
              } else {
                return `${dir}/${page}`
              }
            })();
            if (page === "...") {
              return (
                <li
                  key={index}
                  style={{
                    padding: "10px 10px 0px 10px",
                    color: COLOR.textColor.primary,
                  }}
                >
                  {page}
                </li>
              );
            }
            if (page === pageNumber) {
              return (
                <PaginationItem key={index + 1} to={to} disabled number>
                  {page}
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={index + 1} to={to} hover>
                {page}
              </PaginationItem>
            );
          })
        }
        <PaginationItem
          to={`${dir}/${pageNumber + 1}`}
          disabled={pageNumber === totalPages ? true : false}
          hover={pageNumber === totalPages ? false : true}
        >
          <span
            className="material-icons"
            style={{
              fontSize: "16px",
              color: COLOR.textColor.primary,
              opacity: pageNumber === totalPages ? '0.4' : '1'
            }}
          >
            chevron_right
          </span>
        </PaginationItem>
      </ul>
    </nav>
  )
}

export default Pagination

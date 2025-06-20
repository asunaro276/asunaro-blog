import { usePagination } from "../../../hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { COLOR } from "/constants";
import { Page } from "/domain/models/page/Page";
import { Path } from "/domain/models/path/Path";

type Props = {
  currentPath: Path;
  currentPage: Page
  totalCount: number;
};

const Pagination = ({ currentPage, currentPath, totalCount }: Props) => {
  const { pages, totalPages } = usePagination(currentPage.value, totalCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-center gap-x-1.5 flex">
        <PaginationItem
          to={''}
          disabled={!currentPage.hasPrev()}
          hover={currentPage.hasPrev()}
        >
          <span
            className="material-icons"
            style={{
              fontSize: "16px",
              color: COLOR.text.base,
              opacity: !currentPage.hasPrev() ? '0.4' : '1'
            }}
          >
            chevron_left
          </span>
        </PaginationItem>
        {
          pages.map((page, index) => {
            const to = new Path(currentPath.directory, currentPath.id, new Page(Number(page))).value;
            if (page === "...") {
              return (
                <li
                  key={index}
                  style={{
                    padding: "10px 10px 0px 10px",
                    color: COLOR.text.base,
                  }}
                >
                  {page}
                </li>
              );
            }
            if (page === currentPage.value) {
              return (
                <PaginationItem key={index + 1} to={to} disabled number>
                  {page}
                </PaginationItem>
              )
            }
            return (
              <PaginationItem key={index + 1} to={to} hover>
                {page}
              </PaginationItem>
            );
          })
        }
        <PaginationItem
          to={currentPath.nextPage.value}
          disabled={currentPage.value === totalPages ? true : false}
          hover={currentPage.value === totalPages ? false : true}
        >
          <span
            className="material-icons"
            style={{
              fontSize: "16px",
              color: COLOR.text.base,
              opacity: currentPage.value === totalPages ? '0.4' : '1'
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

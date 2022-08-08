import React from "react";
import ArrowLeft from "../../svgs/ArrowLeft";
import ArrowRight from "../../svgs/ArrowRight";
function Pagination({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageIndex,
  pages,
  pageCount,
}) {
  return (
    <div className="pagination_wrapper">
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="page_btn"
      >
        <ArrowLeft />
      </button>
      {pageCount < 10 &&
        pages.map((val, index) => {
          return (
            <button
              key={index}
              value={val}
              onClick={() => gotoPage(index)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={
                index === pageIndex
                  ? "page_btn bg-[rgba(223,208,242)]"
                  : "page_btn"
              }
            >
              {val}
            </button>
          );
        })}
      {pageCount >= 10 && (
        <>
          <button
            onClick={() => gotoPage(0)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              0 === pageIndex ? "page_btn bg-[rgba(223,208,242)]" : "page_btn"
            }
          >
            {1}
          </button>
          <button
            onClick={() => gotoPage(1)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              1 === pageIndex ? "page_btn bg-[rgba(223,208,242)]" : "page_btn"
            }
          >
            {2}
          </button>
          <button className="page_btn">{"..."}</button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className={
              pageCount - 1 === pageIndex
                ? "page_btn bg-[rgba(223,208,242)]"
                : "page_btn"
            }
          >
            {pageCount}
          </button>
        </>
      )}
      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="page_btn"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default Pagination;

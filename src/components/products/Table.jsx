import React from "react";
import ArrowDown from "../../svgs/ArrowDown";
import ArrowUp from "../../svgs/ArrowUp";
import "./style.css";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";
import GlobalFilter from "./GlobalFilter";
import Edit from "../../svgs/Edit";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { useEffect, useState } from "react";
function Table({ columns, data }) {
  // add extra row to contain buttons
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "journal",
        Header: "journal",
        Cell: ({ row }) => (
          <button
            className="small_btn"
            onClick={() => {
              alert("editing product with id :", row.values.id);
            }}
          >
            <div>
              <Edit />
            </div>
          </button>
        ),
      },
    ]);
  };

  // implemetation of the table using useTable hook
  const table = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageSize: 2 },
    },
    useGlobalFilter,
    useFilters,
    tableHooks,
    useSortBy,
    usePagination
  );
  // destructuring needed props and variables to controle the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    preFilteredRows,
    state,
    setFilter,
  } = table;
  const { pageIndex } = state;

  const pages = Array.from(new Array(pageCount), (val, index) => 1 + index);
  const [columnFilterValue, setColumnFilterValue] = useState("");
  // listen to filter value changes outside
  useEffect(() => {
    if (columnFilterValue !== "") {
      setFilter(
        "category",
        columnFilterValue === "all" ? undefined : columnFilterValue
      );
    }
  }, [columnFilterValue, setFilter]);
  return (
    <>
      <div className="w-full flex flex-row justify-evenly items-center  ">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <CategoryFilter
          setColumnFilterValue={setColumnFilterValue}
          preFilteredRows={preFilteredRows}
        />
      </div>
      <table {...getTableProps()}>
        <thead className="head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex flex-row items-center">
                    {column.render("Header")}
                    {column.Header !== "journal" ? (
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDown />
                        ) : (
                          <ArrowUp />
                        )
                      ) : (
                        <ArrowDown />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        pages={pages}
        pageCount={pageCount}
      />
    </>
  );
}

export default Table;

import Pagination from "./Pagination";
import {ReactNode, useMemo, useRef, useState} from "react";
import {sortRows, filterRows, paginateRows, isEmpty} from "../../utils/helpers";
import {Checkbox, Input} from "../Input";
import TableRow from './TableRow';

interface PropsTable {
  fitContent?: boolean,
  checkboxSelection?: boolean,
  onChangeCheckbox?: () => object[],
  rowsPerPageOptions?: [],
  searchInputSelection?: boolean,
  columns: [{
    render: ReactNode,
    align: string,
    key: string | number
    id: number,
    title: string,
  }],
  rows: [],
  rowsPerPage?: number,
  align?: 'center' | 'left' | 'right',
  hidePagination?: boolean,
}

const Table = (props: PropsTable) => {
  const {
    columns = [], rows = [],
    rowsPerPageOptions = [],
    rowsPerPage: rowsPerPageFromProps = 10,
    hidePagination,
    onChangeCheckbox,
    searchInputSelection,
    checkboxSelection, ...res
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(!isEmpty(rowsPerPageOptions) ? rowsPerPageOptions[0] : rowsPerPageFromProps)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({order: 'asc', orderBy: 'id'})
  const [rowsChecked, setRowsChecked] = useState([])
  const [searchInput, setSearchInput] = useState("");

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

  const filteredRows = useMemo(() => filterRows(rows ?? [], filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  // const calculatedRows = paginateRows(sortedRows, currentPage, rowsPerPage)

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = sortedRows.filter((item) => {
        return Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilters(filteredData);
    } else {
      setFilters(currentItems);
    }
  }

  const handleSort = (id) => {
    setCurrentPage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === id ? 'desc' : 'asc',
      orderBy: id,
    }))
  }

  const handleCheckAllBox = () => {
    if (rowsChecked.length > 0) {
      const result = rowsChecked.findIndex(e => e.checked === true) !== -1
      console.log('result', result)
      if (result) {
        return true
      } else {
        return false
      }
    }
  }

  // const handleCheckbox = (select) => {
  //   const status = select.target.checked;
  //   if (status) {
  //     const result = rows.map(row => row._id)
  //     setRowsChecked(result)
  //   } else {
  //     setRowsChecked([])
  //   }
  // }

  const TableColumn = () => {
    return (
      <thead>
            <tr>
              {checkboxSelection &&
                <th>
                  <Checkbox
                    classes='checked:bg-none'
                    name='idsRow'
                    defaultChecked={handleCheckAllBox()}
                    // defaultChecked={}
                    // onChange={handleCheckbox}
                  />
                </th>
              }
              {columns.map((column) => {
                const sortIcon = () => {
                  if (column.id === sort.orderBy) {
                    if (sort.order === 'asc') {
                      return <i className="fa-solid fa-chevron-up"/>
                    }
                    return <i className="fa-solid fa-chevron-down"/>
                  }
                }
                return (
                  <th key={column.id}
                      onClick={() => handleSort(column.id)}
                      className={`text-left text-${column.align}`}>
                    {
                      column.id === 'actions' ?
                        rowsChecked.length > 0 ?
                          <i className="fa-solid fa-trash-can text-xs"
                             onClick={() => onChangeCheckbox(rowsChecked)}
                          />
                          : ''
                        :
                        <span className='mr-2'>{column.title}</span>
                    }
                    {column.id !== 'actions' && <span>{sortIcon()}</span>}
                  </th>
                )
              })}
            </tr>
      </thead>
    )
  }

  return (
    <section className="table-container">
      <div className={`table-wrapper ${res.fitContent && 'w-fit'}`}>
        {searchInputSelection &&
          <div className='w-1/4'>
            <Input
              name='' placeholder='Search by name'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        }
        <table className="table ">
          {TableColumn()}
          <tbody>
            <TableRow
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              quantityRows={rows.length}
              checkboxSelection={checkboxSelection}
              setRowsChecked={setRowsChecked}
              rowsChecked={rowsChecked}
              columns={columns}
              // rows={currentRows}
              rows={!isEmpty(filters) ? filters : currentItems}
            />
          </tbody>
        </table>
      </div>
      {hidePagination || currentItems.length === 0
        ? ''
        : <Pagination
          checkboxSelection={checkboxSelection}
          rowsPerPageOptions={rowsPerPageOptions}
          setRowsPerPage={setRowsPerPage}
          rowsPerPageFromProps={rowsPerPageFromProps}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          rowsChecked={rowsChecked.length}
          // totalNumberOfRows={rows.length}
          quantityRows={rows.length}
          onPageChange={page => setCurrentPage(page)}
        />
      }
    </section>
  );
};

export default Table;

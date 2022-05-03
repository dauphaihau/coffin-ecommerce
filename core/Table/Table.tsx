import Pagination from "./Pagination";
import {ReactNode, useMemo, useRef, useState} from "react";
import {sortRows, filterRows, paginateRows, isEmpty} from "../../utils/helpers";
import {Checkbox, Input} from "../Input";
import {toast} from "react-hot-toast";
import {productService} from "@services/products";

interface Props {
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

const TableRow = (props) => {
  const {
    rows, columns, rowsChecked,
    setRowsChecked, checkboxSelection,
  } = props;

  const inputRef = useRef(null);
  const [checked, setChecked] = useState(false)

  const handleChange = (select) => {
    const temp = [...rowsChecked]
    const status = select.target.checked
    const idSelect = select.target.value

    if (!status) {
      const result = temp.filter(e => e.id !== idSelect)
      setRowsChecked(result)
    } else {
      setRowsChecked([...temp,
        {
          id: idSelect,
          checked: status
        }
      ])
    }
  }

  return (
    <>
      {rows?.map((row, index) => {
        return (
          <tr key={index}>
            {
              checkboxSelection &&
              (
                <td onClick={() => setChecked(!checked)}>
                  <Checkbox
                    ref={inputRef}
                    name={row._id}
                    // defaultChecked={checked}
                    // defaultChecked={itemsSelected.length === 0 ? false : true}
                    onChange={handleChange} value={row._id}/>
                </td>
              )
            }
            {columns.map((column) => {
              // console.log('column', column)
              if (column.render) {
                return <td className={`text-${column.align}`} key={column.id}>
                  <div className={`${column.align === 'center' && 'flex-center'}`}>
                    {column.render(row, index + 1)}
                  </div>
                </td>
              }
              if (column.key) {
                return <td className={`text-${column.align}`} key={column.id}>{index + 1}</td>
              }
              return <td className={`text-${column.align}`} key={column.id}>{row[column.id]}</td>
            })}
          </tr>
        )
      })}
      {!rows &&
        <tr>
           <td colSpan={columns.length} className="text-center">
              <div className="spinner-border spinner-border-lg align-center"/>
           </td>
        </tr>
      }
      {rows && !rows.length &&
        <tr>
          <td colSpan={columns.length} className="text-center">
              <div className="p-2">No data to display</div>
          </td>
        </tr>
      }
    </>
  )
};

const Table = (props: Props) => {
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
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageFromProps)
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
          <tbody>
            <TableRow
              checkboxSelection={checkboxSelection}
              setRowsChecked={setRowsChecked}
              rowsChecked={rowsChecked}
              columns={columns}
              // rows={currentRows}
              rows={!isEmpty(filters) ? filters : currentItems}
            />
          </tbody>
        </table>
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
            totalNumberOfRows={rows.length}
            onPageChange={page => setCurrentPage(page)}
          />
        }
      </div>
    </section>
  );
};

export default Table;

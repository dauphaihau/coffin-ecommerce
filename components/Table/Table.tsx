import Pagination from "./Pagination";
import {ReactNode, useMemo, useState} from "react";
import {sortRows, filterRows, paginateRows, isEmpty} from "../../utils/helpers";
import {Checkbox, Input} from "../Input";
import {toast} from "react-hot-toast";
import {productService} from "@services/products";

interface Props {
  fitContent?: boolean,
  checkboxSelection?: boolean,
  onChangeSelected?: () => object[],
  itemsPerPageOptions?: [],
  searchInputSelection?: boolean,
  columns: [{
    render: ReactNode,
    align: string,
    key: string | number
    id: number,
    title: string,
  }],
  rows: [],
  itemsPerPage?: number,
  align?: 'center' | 'left' | 'right',
  hidePagination?: boolean,
}

const TableRow = (props) => {
  const {
    rows, columns, itemsSelected, setItemsSelected, checkboxSelection,
  } = props;

  const handleChange = (select) => {
    const temp = [...itemsSelected]
    const status = select.target.checked
    const idSelect = select.target.value

    console.log('status', status)
    if (!status) {
      const result = temp.filter(e => e.id !== idSelect)
      setItemsSelected(result)
    } else {
      setItemsSelected([...temp,
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
              <td>
                <Checkbox
                  name=''
                  // defaultChecked={itemsSelected.length === 0 ? false : true}
                  onChange={handleChange} value={row._id}/>
              </td>
            }
            {columns.map((column) => {
              if (column.render) {
                return <td className={`text-${column.align}`} key={column.id}>{column.render(row, index + 1)}</td>
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
    itemsPerPage: itemsPerPageFromProps = 10,
    hidePagination,
    itemsPerPageOptions = [],
    onChangeSelected,
    searchInputSelection,
    checkboxSelection, ...res
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromProps)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({order: 'asc', orderBy: 'id'})
  const [itemsSelected, setItemsSelected] = useState([])
  const [searchInput, setSearchInput] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

  const filteredRows = useMemo(() => filterRows(rows ?? [], filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  // const calculatedRows = paginateRows(sortedRows, currentPage, itemsPerPage)

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
    if (itemsSelected.length > 0) {
      const result = itemsSelected.findIndex(e => e.checked === true) !== -1
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
  //     setItemsSelected(result)
  //   } else {
  //     setItemsSelected([])
  //   }
  // }

  return (
    <div className="table-container">
      <section className={res.fitContent && 'w-fit'}>
        {searchInputSelection &&
          <div className='w-1/4'>
            <Input
              name='' placeholder='Search item...'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        }
        <table className="table">
          <thead>
            <tr>
              {checkboxSelection &&
                <th>
                  <Checkbox
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
                        itemsSelected.length > 0 ?
                          <i className="fa-solid fa-trash-can text-base"
                             onClick={() => onChangeSelected(itemsSelected)}
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
              setItemsSelected={setItemsSelected}
              itemsSelected={itemsSelected}
              columns={columns}
              // rows={currentItems}
              rows={!isEmpty(filters) ? filters : currentItems}
            />
          </tbody>
        </table>
        {hidePagination || currentItems.length === 0
          ? ''
          : <Pagination
            itemsPerPageOptions={itemsPerPageOptions}
            setItemsPerPage={setItemsPerPage}
            itemsPerPageFromProps={itemsPerPageFromProps}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            rows={rows}
            onPageChange={(page) => setCurrentPage(page)}
          />
        }
      </section>
    </div>
  );
};

export default Table;

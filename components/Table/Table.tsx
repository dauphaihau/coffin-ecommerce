import Pagination from "./Pagination";
import {ReactNode, useMemo, useState} from "react";
import {sortRows, filterRows, paginateRows} from "../../utils/helpers";
import {Checkbox} from "../Input";

interface Props {
  fitContent?: boolean,
  checkboxSelection?: boolean,
  onChangeSelected?: () => object[],
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
  const {rows, columns, itemsSelected, setItemsSelected, checkboxSelection} = props;
  // console.log('rows', rows)

  const handleChange = (e) => {
    // console.log('e', e.target.value)


    console.log('e-target-checked', e.target.checked)
    console.log(e.target.name, e.target.checked)
    setItemsSelected([...itemsSelected, e.target.value])
  }


  return (
    <>
      {rows?.map((row, index) => {
        return (
          <tr key={index}>
            {
              checkboxSelection &&
              <td>
                <Checkbox name={row._id} onChange={handleChange} value={row._id}/>
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
    columns = [], rows = [], itemsPerPage = 10, hidePagination,
    onChangeSelected,
    checkboxSelection, ...res
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({order: 'asc', orderBy: 'id'})
  const [itemsSelected, setItemsSelected] = useState([])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

  const filteredRows = useMemo(() => filterRows(rows ?? [], filters), [rows, filters])
  // console.log('filtered-rows', filteredRows)
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  // console.log('sorted-rows', sortedRows)
  // const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  // const calculatedRows = paginateRows(sortedRows, currentPage, itemsPerPage)
  // const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const handleSort = (id) => {
    setCurrentPage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === id ? 'desc' : 'asc',
      orderBy: id,
    }))
  }

  const handleCheckbox = (e) => {
    console.log('e-target-value', e.target.value)
    console.log('e-target-checked', e.target.checked)
  }

  // console.log('checkbox-selection', checkboxSelection)
  console.log('items-selected', itemsSelected)

  return (
    <div className="table-container">
      <section className={res.fitContent && 'w-fit'}>
        <table className="table">
          <thead>
            <tr>
              {checkboxSelection &&
                <th>
                  <Checkbox name='idsRow' value='1' onChange={handleCheckbox}/>
                </th>
              }
              {columns.map((column) => {
                console.log('column', column)
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
                    {column.id === 'actions' ?
                      <i className="fa-solid fa-trash-can" onClick={() => onChangeSelected(itemsSelected)}/>
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
              rows={currentItems}
            />
          </tbody>
        </table>
        {hidePagination || currentItems.length === 0
          ? ''
          : <Pagination
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

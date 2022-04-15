import Pagination from "./Pagination";
import {ReactNode, useState} from "react";

interface TableProps {
  fitContent?: boolean,
  columns: [{
    render: ReactNode,
    align: string,
    key: string | number
    id: number,
    title: string,
  }],
  rows: [],
  itemsPerPage?: number,
  align?: string,
  hidePagination?: boolean,
}


const TableRow = (props) => {
  const {rows, columns} = props;
  return (
    <>
      {rows?.map((row, index) => {
        return (
          <tr key={index}>
            {columns.map((column) => {
              if (column.render) {
                return <td className={column.align} key={column.id}>{column.render(row, index + 1)}</td>
              }
              if (column.key) {
                return <td className={column.align} key={column.id}>{index + 1}</td>
              }
              return <td className={column.align} key={column.id}>{row[column.id]}</td>
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
              <div className="p-2">No products to display</div>
          </td>
        </tr>
      }
    </>
  )
};

const Table = (props: TableProps) => {

  const {columns, rows, itemsPerPage = 10, hidePagination, ...res} = props;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="table-container">
      <section className={res.fitContent && 'w-fit'}>
        <table className="table">
          <thead>
             <tr>
               {columns.map(column => (
                 <th scope="col" key={column.id}
                     className={`text-left ${column.align}`}
                 >
                   {column.title}
                 </th>
               ))}
            </tr>
          </thead>
          <tbody>
            <TableRow
              columns={columns}
              rows={currentItems}
            />
          </tbody>
        </table>
        {hidePagination
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

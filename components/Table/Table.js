import Pagination from "./Pagination";
import {useState} from "react";
import PropTypes from "prop-types";

const propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    itemsPerPage: PropTypes.number,
    align: PropTypes.string,
}

const TableRow = (props) => {
    const {rows, columns} = props;
    return (
        <>
            {rows?.map((row, index) => {
                return (
                    <tr key={row.id}>
                      {columns.map((column) => {
                          if (column.render) {
                              return <td className={column.align} key={column.id}>{column.render(row)}</td>
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

const Table = (props) => {

    const {columns, rows, itemsPerPage = 10} = props;

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="table-container">
            <section>
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
                <Pagination
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    rows={rows}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </section>
        </div>
    );
};

Table.propsType = propTypes;

export default Table;

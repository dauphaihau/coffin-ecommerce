import {useRef, useState} from "react";
import {Checkbox} from "../Input";

const TableRow = (props) => {
  const {
    rows, columns, rowsChecked,
    setRowsChecked, checkboxSelection,
    currentPage, quantityRows, rowsPerPage
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

  // console.log('current-page', currentPage)
  // console.log('quantity-rows', quantityRows)
  // console.log('rows-per-page', rowsPerPage)
  const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - quantityRows) : 0;
  // console.log('empty-rows', emptyRows)

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
      {/*{emptyRows > 0 && (*/}
      {/*  <tr*/}
      {/*    style={{*/}
      {/*      height: 43 * emptyRows,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <td colSpan={1}/>*/}
      {/*  </tr>*/}
      {/*)}*/}
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

export default TableRow


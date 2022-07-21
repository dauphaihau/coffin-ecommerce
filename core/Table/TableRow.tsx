import { useRef, useState } from 'react';
import { Checkbox } from '../Input';
import { Loading } from '../Loading';

enum TEXT_ALIGN {
  LEFT = 'start',
  RIGHT = 'end',
  CENTER = 'center',
}

const TEXT_ALIGN_MAPS: Record<TEXT_ALIGN, string> = {
  [TEXT_ALIGN.CENTER]: 'text-center',
  [TEXT_ALIGN.RIGHT]: 'text-right',
  [TEXT_ALIGN.LEFT]: 'text-left',
};

const TableRow = (props) => {
  const {
    rows, columns, rowsChecked,
    setRowsChecked, checkboxSelection,
    currentPage, quantityRows, rowsPerPage,
    loading
  } = props;

  const inputRef = useRef(null);
  const [checked, setChecked] = useState(false)

  const handleOnChange = (selected) => {
    const status = selected.target.checked
    const idSelected = selected.target.value

    if (!status) {
      const result = rowsChecked.filter(o => o !== idSelected)
      setRowsChecked(result)
    } else setRowsChecked([...rowsChecked, idSelected])
  }

  const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - quantityRows) : 0;
  // console.log('empty-rows', emptyRows)

  return (
    <>
      {
        loading ? (<tr>
           <td colSpan={columns.length} className='text-center'>
              {/*<div className='spinner-border spinner-border-lg align-center'/>*/}
             <Loading/>
           </td>
        </tr>
          ) :
          // loading ? (<tr className='col-span-4'><td>{<Loading/>}</td></tr>) :
          rows && rows.length > 0 ? (
            rows?.map((row, index) => {
                return (
                  <tr key={index}>
                    {
                      checkboxSelection && (
                        <td onClick={() => setChecked(!checked)}>
                          <Checkbox
                            ref={inputRef}
                            name={row._id}
                            defaultChecked={rowsChecked.includes(row._id)}
                            onChange={handleOnChange} value={row._id}/>
                        </td>
                      )
                    }
                    {columns.map((column) => {
                      if (column.render) {
                        return <td className={TEXT_ALIGN_MAPS[column.align]} key={column.id}>
                          {/*return <td className={`text-${column.align}`} key={column.id}>*/}
                          <div className={`${column.align === 'center' && 'flex-center'}`}>
                            {column.render(row, index + 1)}
                          </div>
                        </td>
                      }
                      if (column.key) {
                        return <td className={TEXT_ALIGN_MAPS[column.align]} key={column.id}>{index + 1}</td>
                      }
                      return <td className={TEXT_ALIGN_MAPS[column.align]} key={column.id}>{row[column.id]}</td>
                    })}
                  </tr>
                )
              }
            )
          ) : (
            <tr>
          <td colSpan={columns.length} className='text-center'>
              <div className='p-2'>Item/data not found or data not existing</div>
          </td>
        </tr>
          )
      }
      {/*{emptyRows > 0 && (*/}
      {/*  <tr*/}
      {/*    style={{*/}
      {/*      height: 43 * emptyRows,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <td colSpan={1}/>*/}
      {/*  </tr>*/}
      {/*)}*/}
    </>
  )
};

export default TableRow


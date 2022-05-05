import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/outline";
import {Select} from "../Input";
// import {rowsPerPageOpts} from "../../assets/data/options";
import {isEmpty, isNil} from "../../utils/helpers";
import Text from "../Text";
import {usePagination, DOTS} from '../../utils/hooks/usePagination';

interface Props {
  quantityRows: number,
  rowsPerPage: number,
  onPageChange: (page: number) => void,
  setRowsPerPage: (value: number) => void | {},
  currentPage: number,
  rowsChecked: number,
  checkboxSelection: boolean,
  rowsPerPageFromProps: number,
  rowsPerPageOptions?: [],
}

const Pagination = (props: Props) => {

  const {
    quantityRows,
    rowsPerPage,
    rowsPerPageOptions,
    onPageChange,
    setRowsPerPage,
    rowsPerPageFromProps,
    checkboxSelection,
    rowsChecked,
    currentPage,
  } = props;

  const siblingCount = 1

  let options = [];
  if (!isEmpty(rowsPerPageOptions)) {
    options = rowsPerPageOptions.map((options) => ({
      label: options,
      value: options
    }))
    // setRowsPerPage(rowsPerPageOptions[0])
  }

  const pageNumbers = usePagination({
    currentPage,
    quantityRows,
    siblingCount,
    rowsPerPage
  });

  return (
    <div className="pagination">
      <div className='pagination__left'>
        {checkboxSelection && <Text>{rowsChecked} selected</Text>}
        <Text>
          {currentPage === 1 ? 1 : (currentPage - 1) * rowsPerPage}
          –
          {rowsPerPage * currentPage > quantityRows ? quantityRows : rowsPerPage * currentPage} of {quantityRows}
        </Text>
      </div>
      <div className='pagination__right'>
        <div className='pagination__entries'>
          <Text>Rows per page:</Text>
          {options.length !== 0 ?
            <Select
              classesOptions='laptop:pr-0'
              hideIconOptions
              classesSpace='mb-0'
              classesBtn='pr-8'
              borderLight
              size='medium'
              options={options}
              onChange={(e) => setRowsPerPage(e.value)}
            />
            :
            <Text classes='ml-3'>{rowsPerPageFromProps}</Text>
          }
        </div>
        {/*<p className='pagination__entries'>*/}
        {/*  Rows per page: <span className='ml-3'>{quantityRows}</span></p>*/}
        <div className="pagination__num">
          <div className="pagination__num__item">
            <button
              disabled={currentPage === 1}
              className={currentPage === 1 ? 'disabled' : ''}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeftIcon height={15} width={15}/>
            </button>
            {pageNumbers.map(pageNumber => {
              {
                pageNumber === DOTS && <button key={pageNumber}>{pageNumber}</button>
              }
              return (
                <button
                  key={pageNumber} onClick={() => onPageChange(pageNumber)}
                  className={currentPage === pageNumber ? 'selected' : ''}>
                  {pageNumber}
                </button>
              )
            })}
            <button
              disabled={currentPage === pageNumbers.length}
              className={currentPage === pageNumbers?.length ? 'disabled' : ''}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRightIcon height={15} width={15}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination;
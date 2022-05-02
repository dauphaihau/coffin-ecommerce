import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/outline";
import {Select} from "../Input";
// import {rowsPerPageOpts} from "../../assets/data/options";
import {isEmpty, isNil} from "../../utils/helpers";
import Text from "../../components/Text";

interface Props {
  rows: [],
  itemsPerPage: number,
  onPageChange: (page: number) => void,
  setItemsPerPage: (value: number) => {},
  currentPage: number,
  itemsPerPageOptions?: [],
}

const Pagination = (props: Props) => {

  const {
    rows = [],
    itemsPerPage,
    itemsPerPageOptions,
    onPageChange,
    setItemsPerPage,
    itemsPerPageFromProps,
    currentPage,
  } = props;

  let options = [];
  if (!isEmpty(itemsPerPageOptions)) {
    options = itemsPerPageOptions.map((options) => ({
      label: options,
      value: options
    }))
  }
  // else {
  //   options = rowsPerPageOpts
  // }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rows?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
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
            onChange={(e) => setItemsPerPage(e.value)}
          />
          :
          <Text classes='ml-3'>{itemsPerPageFromProps}</Text>
        }
      </div>
      {/*<p className='pagination__entries'>*/}
      {/*  Rows per page: <span className='ml-3'>{rows?.length}</span></p>*/}
      <div className="pagination__num">
        <div className="pagination__num__item">
          <button
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'disabled' : ''}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon height={15} width={15}/>
          </button>
          {pageNumbers.map(pageNumber => (
            <div key={pageNumber}>
              <a className={currentPage === pageNumber ? 'selected' : ''}
                 onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </a>
            </div>
          ))}
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
  )
}

export default Pagination;
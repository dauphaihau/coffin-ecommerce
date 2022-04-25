import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/outline";

interface Props {
  rows: [],
  itemsPerPage: number,
  onPageChange: (currentPage: number) => void,
  currentPage: number,
}

const Pagination = (props: Props) => {

  const {
    rows = [],
    itemsPerPage,
    onPageChange,
    currentPage,
  } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(rows?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/*<p className='pagination__entries'>Rows per page: {rows?.length}</p>*/}
      <div></div>
      <div className="pagination__num">
        <div className="pagination__num__item">
          <figure
            className={currentPage === 1 ? 'disabled' : ''}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon height={15} width={15}/>
          </figure>
          {pageNumbers.map(pageNumber => (
            <div key={pageNumber}>
              <a className={currentPage === pageNumber ? 'selected' : ''}
                 onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </a>
            </div>
          ))}
          <figure
            className={currentPage === pageNumbers?.length ? 'disabled' : ''}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon height={15} width={15}/>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Pagination;
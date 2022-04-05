import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/outline";
import PropTypes from "prop-types";

const propTypes = {
  rows: PropTypes.array,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
}

const defaultProps = {
  onPageChange: () => {},
};

const Pagination = (props) => {

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
            <ChevronLeftIcon height={30} width={30}/>
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
            <ChevronRightIcon height={30} width={30}/>
          </figure>
        </div>
      </div>
    </div>
  )
}

Pagination.defaultProps = defaultProps;
Pagination.propTypes = propTypes;

export default Pagination;
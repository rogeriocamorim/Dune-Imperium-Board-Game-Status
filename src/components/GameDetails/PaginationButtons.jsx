import React from 'react';

const PaginationButtons = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => (
    <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            Next
        </button>
        <div className="pagination-info">
            <p>Page {currentPage} of {totalPages}</p>
        </div>
    </div>
);

export default PaginationButtons;

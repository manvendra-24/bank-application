import React from 'react';

const Pagination = ({ noOfPages, currentPage, setPageNo }) => {
    // Handle page number changes
    const handlePageChange = (page) => {
        if (page >= 1 && page <= noOfPages) {
            setPageNo(page);
        }
    };

    // Calculate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        if (noOfPages <= 1) return pages;

        // Previous page
        if (currentPage > 1) {
            pages.push(currentPage - 1);
        }

        // Current page
        pages.push(currentPage);

        // Next page
        if (currentPage < noOfPages) {
            pages.push(currentPage + 1);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li 
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <span className="page-link">
                        <i className="bi bi-chevron-left"></i> {/* Previous icon */}
                    </span>
                </li>
                {pageNumbers.map(p => (
                    <li
                        key={p}
                        className={`page-item ${p === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(p)}
                    >
                        <span className="page-link">{p}</span>
                    </li>
                ))}
                <li 
                    className={`page-item ${currentPage === noOfPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <span className="page-link">
                        <i className="bi bi-chevron-right"></i> {/* Next icon */}
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

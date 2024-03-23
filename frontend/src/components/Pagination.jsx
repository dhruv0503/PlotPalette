import React  from 'react';
import { useApi } from '../Context/Contxt';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Start page of the pagination bar
    const { pagesToShow, startPage, setStartPage } = useApi();
    const handleClick = (page) => {
        console.log(page)
        onPageChange(page);
    };

    const renderPagination = () => {
        const pagination = [];
        for (let i = startPage; i <= totalPages && pagination.length < pagesToShow; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`px-3 py-1 mx-1 rounded ${i === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pagination;
    };
    const handlePrevClick = () => {
        if (startPage > 1) {
            setStartPage(startPage - 1);
        }
    };

    const handleNextClick = () => {
        if (startPage + pagesToShow - 1 < totalPages) {
            setStartPage(startPage + 1);
        }
    };

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={handlePrevClick}
                disabled={startPage === 1}
                className="px-3 py-1 mr-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Prev
            </button>
            {renderPagination()}
            <button
                onClick={handleNextClick}
                disabled={startPage + pagesToShow - 1 >= totalPages}
                className="px-3 py-1 ml-2 rounded bg-gray-200 hover:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

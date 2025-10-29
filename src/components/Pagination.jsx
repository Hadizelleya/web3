import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  styles = "",
}) {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const generateVisiblePages = () => {
      const pages = [];
      const half = Math.floor(maxVisiblePages / 2);

      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);

      if (end - start + 1 < maxVisiblePages) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisiblePages - 1);
        } else {
          start = Math.max(1, end - maxVisiblePages - 1);
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      setVisiblePages(pages);
    };

    generateVisiblePages();
  }, [currentPage, maxVisiblePages, totalPages]);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center gap-2 justify-center ${styles}`}>
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ease-in ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-(--color-white) text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
        Previous
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            className="px-3 py-2 rounded-md text-sm cursor-pointer font-medium bg-(--color-white) text-gray-700  transition-all duration-200 hover:bg-gray-50 ease-in"
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        </>
      )}

      {visiblePages[0] > 2 && (
        <>
          <span className="px-2 py-2 text-gray-500">
            <FaEllipsisH className="w-4 h-4" />
          </span>
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`flex items-center gap-1 cursor-pointer py-2 px-3 rounded-md text-sm transition-all duration-200 ease-in ${
            page === currentPage
              ? "bg-(--color-black) text-red-500 cursor-not-allowed"
              : "bg-(--color-white) text-gray-700 hover:bg-gray-50 border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <span className="px-2 py-2 text-gray-500">
              <FaEllipsisH className="w-4 h-4" />
            </span>
          )}

          <button
            onClick={() => handlePageClick(totalPages)}
            className={`px-3 py-2 rounded-md text-sm cursor-pointer font-medium bg-(--color-white) text-gray-700  transition-all duration-200 hover:bg-gray-50 ease-in`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ease-in ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-(--color-white) text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
        <FaChevronRight />
      </button>
    </div>
  );
}

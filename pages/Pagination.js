import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // 计算起始和结束页码
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // 添加 "上一页" 和 "第一页" 按钮
    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageClick(1)}
          className="mx-1 rounded px-4 py-2"
        >
          &lt;&lt;
        </button>,
        <button
          key="prev"
          onClick={() => handlePageClick(currentPage - 1)}
          className="mx-1 rounded px-4 py-2"
        >
          &lt;
        </button>
      );
    }

    // 添加页码
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 rounded px-4 py-2 ${
            currentPage === i ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // 添加 "下一页" 和 "最后一页" 按钮
    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => handlePageClick(currentPage + 1)}
          className="mx-1 rounded px-4 py-2"
        >
          &gt;
        </button>,
        <button
          key="last"
          onClick={() => handlePageClick(totalPages)}
          className="mx-1 rounded px-4 py-2"
        >
          &gt;&gt;
        </button>
      );
    }

    return pageNumbers;
  };

  return <div className="mt-4 flex justify-center">{renderPageNumbers()}</div>;
};

export default Pagination;

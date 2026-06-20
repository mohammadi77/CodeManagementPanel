import './Pagination.css';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageButtons = () => {
    const buttons = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (startPage > 1) {
      buttons.unshift('...');
      buttons.unshift(1);
    }

    if (endPage < totalPages) {
      buttons.push('...');
      buttons.push(totalPages);
    }

    return [...new Set(buttons)];
  };

  const pageButtons = getPageButtons();

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        قبلی
      </button>

      {pageButtons.map((btn, idx) =>
        btn === '...' ? (
          <span key={`dots-${idx}`} className="pagination-dots">
            …
          </span>
        ) : (
          <button
            key={btn}
            className={`pagination-btn ${currentPage === btn ? 'active' : ''}`}
            onClick={() => onPageChange(btn)}
          >
            {/* ✅ تبدیل عدد به فارسی */}
            {ToPersianWithSeparator(btn)}
          </button>
        )
      )}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;

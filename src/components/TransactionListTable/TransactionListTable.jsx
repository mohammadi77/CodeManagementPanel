// TransactionListTable.jsx
import { useState } from 'react';
import './TransactionListTable.css';
import TrashIcon from '../../assets/icons/qlementine.svg';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import Pagination from '../Pagination/Pagination';

function TransactionListTable({ transactions, onMenuClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div className="empty-table">هیچ تراکنشی یافت نشد</div>;
  }

  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = transactions.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <table className="transaction-table">
        <thead>
          <tr>
            <th className="grid-Date">تاریخ</th>
            <th className="grid-Income">درآمد (تومان)</th>
            <th className="grid-Cost">هزینه (تومان)</th>
            <th className="grid-Description">شرح</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item) => {
            const isIncome = item.type === 'income';
            const amountValue = item.amount || 0;
            const incomeValue = isIncome ? amountValue : 0;
            const costValue = !isIncome ? amountValue : 0;

            const textIncome = incomeValue === 0 ? ' ' : `${ToPersianWithSeparator(incomeValue)}+`;
            const textCost = costValue === 0 ? ' ' : `${ToPersianWithSeparator(costValue)}-`;

            const incomeClass = incomeValue === 0 ? 'hide-on-mobile' : 'show-on-mobile';
            const costClass = costValue === 0 ? 'hide-on-mobile' : 'show-on-mobile';

            return (
              <tr key={item.id}>
                <td className="td-Date grid-Date">{item.date || '—'}</td>
                <td className={`td-Income grid-Income ${incomeClass}`}>
                  <span>{textIncome}</span> <span id="text-Cost">تومان</span>
                </td>
                <td className={`td-Cost grid-Cost ${costClass}`}>
                  <span>{textCost}</span> <span id="text-Cost">تومان</span>
                </td>
                <td className="td-Description grid-Description">
                  {item.description || item.title || '—'}
                </td>
                <td className="grid-trash">
                  <img
                    src={TrashIcon}
                    alt="حذف"
                    className="cursor-pointer"
                    onClick={(e) => onMenuClick(e, item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default TransactionListTable;

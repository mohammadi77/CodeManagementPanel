import { FaToEnNumber } from './FaToEnNumber ';

// تبدیل رشته تاریخ به Date معتبر (بدون ساعت)
const toValidDate = (dateString) => {
  if (!dateString) return null;
  const normalized = FaToEnNumber(String(dateString));
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

// فیلتر بر اساس بازه تاریخ (از تاریخ - تا تاریخ)
export const filterByDateRange = (transactions, fromDate, toDate) => {
  if (!Array.isArray(transactions)) return [];
  if (!fromDate && !toDate) return transactions;

  const from = fromDate ? toValidDate(fromDate) : null;
  const to = toDate ? toValidDate(toDate) : null;

  return transactions.filter((tx) => {
    const txDate = toValidDate(tx.date);
    if (!txDate) return false;
    if (from && txDate < from) return false;
    if (to && txDate > to) return false;
    return true;
  });
};

// مرتب‌سازی فقط بر اساس تاریخ (با ترتیب صعودی یا نزولی)
export const sortTransactions = (transactions, sortOrder = 'desc') => {
  if (!Array.isArray(transactions)) return [];
  const sorted = [...transactions];
  sorted.sort((a, b) => {
    const aVal = toValidDate(a.date);
    const bVal = toValidDate(b.date);
    if (!aVal && !bVal) return 0;
    if (!aVal) return 1;
    if (!bVal) return -1;
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });
  return sorted;
};

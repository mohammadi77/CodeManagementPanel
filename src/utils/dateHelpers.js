import { FaToEnNumber } from './FaToEnNumber ';

// =========================
// DATE NORMALIZER
// =========================
const toValidDate = (dateString) => {
  if (!dateString) return null;

  const normalized = FaToEnNumber(String(dateString));
  const date = new Date(normalized);

  if (isNaN(date.getTime())) return null;

  date.setHours(0, 0, 0, 0);
  return date;
};

// =========================
// FILTER BY DATE RANGE
// =========================
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

// =========================
// SORT TRANSACTIONS
// =========================
export const sortTransactions = (transactions, sortType = 'desc') => {
  if (!Array.isArray(transactions)) return [];

  const sorted = [...transactions];

  sorted.sort((a, b) => {
    // =====================
    // SORT BY DATE
    // =====================
    if (sortType === 'asc' || sortType === 'desc') {
      const aVal = toValidDate(a.date);
      const bVal = toValidDate(b.date);

      if (!aVal && !bVal) return 0;
      if (!aVal) return 1;
      if (!bVal) return -1;

      return sortType === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // =====================
    // SORT BY CREATED TIME
    // =====================
    if (sortType === 'newest' || sortType === 'oldest') {
      const aVal = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bVal = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (!aVal && !bVal) return 0;
      if (!aVal) return 1;
      if (!bVal) return -1;

      return sortType === 'newest' ? bVal - aVal : aVal - bVal;
    }

    return 0;
  });

  return sorted;
};

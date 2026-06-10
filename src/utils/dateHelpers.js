import { FaToEnNumber } from './FaToEnNumber';

// =========================
// DATE NORMALIZER
// =========================
const toValidDate = (dateString) => {
  if (!dateString) return 0;

  const normalized = FaToEnNumber(String(dateString));
  const date = new Date(normalized);

  if (isNaN(date.getTime())) return 0;

  date.setHours(0, 0, 0, 0);
  return date.getTime();
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
// SORT TRANSACTIONS (FIXED & TESTED)
// =========================
export const sortTransactions = (transactions, sortType = 'newest') => {
  if (!Array.isArray(transactions)) return [];

  const sorted = [...transactions];

  // =====================
  // NEWEST / OLDEST (SAFE MODE)
  // =====================
  if (sortType === 'newest' || sortType === 'oldest') {
    const base = sorted.sort((a, b) => {
      const aVal = Number(a.createdAt) || toValidDate(a.date);
      const bVal = Number(b.createdAt) || toValidDate(b.date);

      return bVal - aVal;
    });

    return sortType === 'newest' ? base : base.reverse();
  }

  // =====================
  // DATE SORT
  // =====================
  if (sortType === 'asc' || sortType === 'desc') {
    return sorted.sort((a, b) => {
      const aVal = toValidDate(a.date);
      const bVal = toValidDate(b.date);

      return sortType === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }

  // =====================
  // AMOUNT SORT
  // =====================
  if (
    sortType === 'highest_expense' ||
    sortType === 'lowest_expense' ||
    sortType === 'highest_income' ||
    sortType === 'lowest_income'
  ) {
    const targetType = sortType.includes('expense') ? 'expense' : 'income';

    const filtered = sorted.filter((t) => t.type === targetType);

    return filtered.sort((a, b) => {
      const aAmount = Number(a.amount) || 0;
      const bAmount = Number(b.amount) || 0;

      if (sortType.includes('highest')) {
        return bAmount - aAmount;
      }

      return aAmount - bAmount;
    });
  }

  return sorted;
};

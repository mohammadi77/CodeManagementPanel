export const filterTransactionsByDateRange = (transactions, selectedYear, fromMonth, toMonth) => {
  const toEnglishNumber = (str) => {
    return String(str).replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  };

  return transactions.filter((transaction) => {
    if (!transaction.date) return false;

    const [year, month] = toEnglishNumber(transaction.date).split('/').map(Number);

    const yearMatch = !selectedYear || year === Number(selectedYear);

    const fromMatch = !fromMonth || month >= Number(fromMonth);

    const toMatch = !toMonth || month <= Number(toMonth);

    return yearMatch && fromMatch && toMatch;
  });
};

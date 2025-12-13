import "./TransactionListTableCells.css";
function TransactionListTableCells({ transaction }) {
  const toPersianWithSeparator = (number) => {
    if (number === null || number === undefined) return "";

    return number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // جداکننده هزارگان
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); // تبدیل به فارسی
  };

  const checkIncome = transaction?.income == 0;
  const textIncome = checkIncome
    ? " "
    : `${toPersianWithSeparator(transaction?.income)}+`;
  const incomeClass =
    transaction?.income === 0 ? "hide-on-mobile" : "show-on-mobile";
  const checkCost = transaction?.cost == 0;
  const textCost = checkCost
    ? " "
    : `${toPersianWithSeparator(transaction?.cost)}-`;
  const costClass =
    transaction?.cost === 0 ? "hide-on-mobile" : "show-on-mobile ";

  return (
    <tr>
      <td className="td-Date grid-Date">
        ` {toPersianWithSeparator(transaction?.date)}
      </td>
      <td className={`td-Incom grid-Income ${incomeClass}`}>
        {textIncome}
        <span>تومان</span>
      </td>
      <td className={`td-Cost grid-Cost ${costClass}`}>
        {textCost} <span>تومان</span>
      </td>
      <td className="td-Description grid-Description">
        {transaction?.description}
      </td>
    </tr>
  );
}

export default TransactionListTableCells;

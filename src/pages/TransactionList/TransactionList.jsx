import TransactionListTable from "../../components/TransactionListTable/TransactionListTable";
import TransactionListTableCells from "../../components/TransactionListTableCells/TransactionListTableCells";

import "./TransactionList.css";
function TransactionList() {
  const transactions = [
    {
      date: "۱۴۰۴/۰۶/۳۱",
      income: 3100000,
      cost: 0,
      description: "قسط آخر پروژه کاریار",
    },
    {
      date: "۱۴۰۴/۰۶/۲۷",
      income: 0,
      cost: 1230000,
      description: "خرید لباس",
    },
    {
      date: "۱۴۰۴/۰۶/۲۵",
      income: 17000,
      cost: 0,
      description: "سود سپرده",
    },
    {
      date: "۱۴۰۴/۰۶/۲۰",
      income: 0,
      cost: 440000,
      description: "غذا",
    },
    {
      date: "۱۴۰۴/۰۶/۱۴",
      income: 0,
      cost: 562200,
      description: "سوپرمارکت",
    },
    {
      date: "۱۴۰۴/۰۶/۰۶",
      income: 0,
      cost: 136000,
      description: "پارکینگ",
    },
    {
      date: "۱۴۰۴/۰۶/۰۴",
      income: 0,
      cost: 55000,
      description: "شارژایرانسل",
    },
    {
      date: "۱۴۰۴/۰۶/۰۱",
      income: 5000000,
      cost: 0,
      description: "کادو تولد",
    },
    {
      date: "۱۴۰۴/۰۵/۲۵",
      income: 0,
      cost: 9800000,
      description: "دندانپزشکی",
    },
    {
      date: "۱۴۰۴/۰۵/۲۰",
      income: 0,
      cost: 250000,
      description: "غذا",
    },
    {
      date: "۱۴۰۴/۰۵/۱۷",
      income: 0,
      cost: 758000,
      description: "سوپرمارکت",
    },
    {
      date: "۱۴۰۴/۰۵/۱۷",
      income: 0,
      cost: 110000,
      description: "غذا",
    },
    {
      date: "۱۴۰۴/۰۵/۱۶",
      income: 3100000,
      cost: 0,
      description: "قسط سوم پروژه کاریار",
    },
  ];
  return (
    <div className="div-First">
      <h2>تراکنش ها</h2>
      <TransactionListTable>
        {transactions.map((item, index) => (
          <TransactionListTableCells key={index} transaction={item} />
        ))}
      </TransactionListTable>
    </div>
  );
}

export default TransactionList;

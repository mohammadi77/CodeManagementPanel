import "./TransactionListTable.css";
import React from "react";

function TransactionListTable({ children }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="grid-Date">تاریخ</th>
          <th className="grid-Income">درآمد (تومان)</th>
          <th className="grid-Cost">هزینه (تومان)</th>
          <th className="grid-Description">شرح</th>
          <td></td>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default TransactionListTable;

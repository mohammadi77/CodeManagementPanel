import "./TransactionListTableCells.css";
import React, { useState } from "react";
import TrashIcon from "../../assets/icons/Delete.svg";
import Modal from "../Modal/Modal";
import Delete from "../Delete/Delete";

function TransactionListTableCells({ data, onDelete }) {
  const toPersianWithSeparator = (number) => {
    if (number === null || number === undefined) return "";

    return number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // جداکننده هزارگان
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); // تبدیل به فارسی
  };

  const checkIncome = data?.income == 0;
  const textIncome = checkIncome
    ? " "
    : `${toPersianWithSeparator(data?.income)}+ تومان`;
  const incomeClass = data?.income === 0 ? "hide-on-mobile" : "show-on-mobile";
  const checkCost = data?.cost == 0;
  const textCost = checkCost
    ? " "
    : `${toPersianWithSeparator(data?.cost)}- تومان`;
  const costClass = data?.cost === 0 ? "hide-on-mobile" : "show-on-mobile ";
  const [modal, setModal] = useState(false);
  const toogleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <tr>
        <td className="td-Date grid-Date">
          {toPersianWithSeparator(data?.date)}
        </td>
        <td className={`td-Income grid-Income ${incomeClass}`}>
          <span> {textIncome}</span>
        </td>
        <td className={`td-Cost grid-Cost ${costClass}`}>
          <span>{textCost}</span>
        </td>
        <td className="td-Description grid-Description">{data?.description}</td>
        <td className="grid-trash">
          <img
            src={TrashIcon}
            id="icon"
            alt=""
            onClick={onDelete}
            className="cursor-pointer"
          />
        </td>
      </tr>
    </>
  );
}

export default TransactionListTableCells;

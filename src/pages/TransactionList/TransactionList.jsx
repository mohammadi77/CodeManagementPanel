import React, { useState } from "react";
import TransactionListTable from "../../components/TransactionListTable/TransactionListTable";
import TransactionListTableCells from "../../components/TransactionListTableCells/TransactionListTableCells";
import { getTransactions } from "../../contest/Transaction";
import DangerIcon from "../../assets/icons/Danger Circle.svg";
import plus from "../../assets/icons/Plus.svg";
import "./TransactionList.css";
import Modal from "../../components/Modal/Modal";
function TransactionList() {
  const [modal, setModal] = useState();
  const toogleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="div-Home">
        <div className="div-First">
          <div className="header-list">
            <h2>تراکنش ها</h2>
            <button onClick={toogleModal}>
              <img src={plus} id="icon" alt="" />
              افزودن تراکنش
            </button>
          </div>
          {getTransactions().length === 0 && (
            <>
              <div className="empty">
                <img src={DangerIcon} id="icon" alt="" />
                <p> شما هنوز تراکنشی وارد نکرده‌اید</p>
              </div>
            </>
          )}
          {getTransactions().length !== 0 && (
            <TransactionListTable>
              {getTransactions().map((item, index) => (
                <TransactionListTableCells key={index} transaction={item} />
              ))}
            </TransactionListTable>
          )}{" "}
        </div>
      </div>
      {modal && <Modal toogleModal={toogleModal} />}
    </>
  );
}

export default TransactionList;

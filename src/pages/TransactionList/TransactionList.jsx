import React from "react";
import { useState } from "react";
import TransactionListTable from "../../components/TransactionListTable/TransactionListTable";
import TransactionListTableCells from "../../components/TransactionListTableCells/TransactionListTableCells";
import Modal from "../../components/Modal/Modal";
import AddTransactionModal from "../../components/AddTransactionModal/AddTransactionModal";
import Delete from "../../components/Delete/Delete";

import DangerIcon from "../../assets/icons/Danger Circle.svg";
import plus from "../../assets/icons/Plus.svg";

import "./TransactionList.css";

function TransactionList({ data, dataDelete, dataAdd }) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(null);
  const toggleAddModal = () => setModalAdd(!modalAdd);

  return (
    <>
      <div className="div-Home">
        <div className="div-First">
          <div className="header-list">
            <h2>تراکنش ها</h2>
            <button onClick={toggleAddModal} className="cursor-pointer ">
              <img src={plus} id="icon" alt="" />
              افزودن تراکنش
            </button>
          </div>

          {data.length === 0 ? (
            <div className="empty">
              <img src={DangerIcon} id="icon" alt="" />
              <p>شما هنوز تراکنشی وارد نکرده‌اید</p>
            </div>
          ) : (
            <TransactionListTable>
              {data.map((item, index) => (
                <TransactionListTableCells
                  key={index}
                  data={item}
                  onDelete={() => setModalDelete(index)}
                />
              ))}
            </TransactionListTable>
          )}
        </div>
      </div>

      {/* مودال افزودن تراکنش */}
      {modalAdd && (
        <Modal toggleModal={toggleAddModal}>
          <AddTransactionModal toggleModal={toggleAddModal} dataAdd={dataAdd} />
        </Modal>
      )}

      {/* مودال حذف تراکنش */}
      {modalDelete !== null && (
        <Modal toggleModal={() => setModalDelete(null)}>
          <Delete
            id={modalDelete}
            dataDelete={dataDelete}
            toggleModal={() => setModalDelete(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default TransactionList;

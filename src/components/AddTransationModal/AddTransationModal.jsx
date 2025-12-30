import React, { useState } from "react";
import CloseIconD from "../../assets/icons/Button Close.svg";
import CloseIconM from "../../assets/icons/Line 1.svg";
import "./AddTransationModal.css";

function AddTransationModal({ toogleModal, dataAdd }) {
  const [errorDate, setErrorDate] = useState("");
  const [errorCost, setErrorCost] = useState("");
  const [errorDic, setErrorDic] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    description: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorDate("");
    setErrorCost("");
    setErrorDic("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.date) {
      setErrorDate("تاریخ را وارد کنید");
      hasError = true;
    }

    if (
      formData.amount === "" ||
      isNaN(formData.amount) ||
      Number(formData.amount) < 0
    ) {
      setErrorCost("مبلغ معتبر وارد کنید");
      hasError = true;
    }

    if (!formData.description) {
      setErrorDic("توضیحات را وارد کنید");
      hasError = true;
    }

    if (hasError) return;

    const newData = {
      date: formData.date,
      income: formData.type === "income" ? Number(formData.amount) : 0,
      cost: formData.type === "expense" ? Number(formData.amount) : 0,
      description: formData.description,
    };

    dataAdd(newData);
    toogleModal();

    setErrorDate("");
    setErrorCost("");
    setErrorDic("");
  };

  return (
    <div className="add-Transation">
      <div className="header-modal">
        <img
          src={CloseIconM}
          alt="بستن"
          onClick={toogleModal}
          id="CloseIconM"
          className="cursor-pointer "
        />
        <h4>افزودن تراکنش</h4>
        <img
          src={CloseIconD}
          alt="بستن"
          onClick={toogleModal}
          id="CloseIconD"
          className="cursor-pointer "
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">
            تاریخ
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={inputChange}
            />
          </label>
          {errorDate && <small className="error-text">{errorDate}</small>}
        </div>
        <div>
          <label htmlFor="amount">
            مبلغ (تومان)
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={inputChange}
              id="amount"
            />
          </label>
          {errorCost && <small className="error-text">{errorCost}</small>}
        </div>

        <div id="type">
          <span>نوع تراکنش</span>
          <div>
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={inputChange}
              />
              درآمد
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={inputChange}
              />
              هزینه
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="description">
            شرح
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={inputChange}
            />
          </label>
          {errorDic && <small className="error-text">{errorDic}</small>}
        </div>

        <div className="modal-buttons">
          <button
            className="cursor-pointer "
            type="button"
            onClick={toogleModal}
          >
            انصراف
          </button>
          <button
            type="submit"
            className="cursor-pointer   disabled={errorDate || errorCost || errorDic}"
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransationModal;

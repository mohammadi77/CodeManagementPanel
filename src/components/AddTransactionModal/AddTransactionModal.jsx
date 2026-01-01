import { useRef, useState } from "react";
import CloseIconD from "../../assets/icons/Button Close.svg";
import CloseIconM from "../../assets/icons/Line 1.svg";
import CalendarIcon from "../../assets/icons/Calendar.svg";
import "./AddTransactionModal.css";

function AddTransactionModal({ toggleModal, dataAdd }) {
  const dateRef = useRef(null);

  const [errorDate, setErrorDate] = useState("");
  const [errorCost, setErrorCost] = useState("");
  const [errorDic, setErrorDic] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    description: "",
  });

  const faToEnNumber = (value) =>
    value
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorDate("");
    setErrorCost("");
    setErrorDic("");
  };

  const openDatePicker = () => {
    if (dateRef.current?.showPicker) {
      dateRef.current.showPicker();
    } else {
      dateRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!formData.date) {
      setErrorDate("تاریخ را وارد کنید");
      hasError = true;
    }

    const amountEn = faToEnNumber(formData.amount);
    if (amountEn === "" || isNaN(amountEn) || Number(amountEn) <= 0) {
      setErrorCost("مبلغ معتبر وارد کنید");
      hasError = true;
    }

    if (!formData.description) {
      setErrorDic("توضیحات را وارد کنید");
      hasError = true;
    }

    if (hasError) return;

    dataAdd({
      date: formData.date,
      income: formData.type === "income" ? Number(amountEn) : 0,
      cost: formData.type === "expense" ? Number(amountEn) : 0,
      description: formData.description,
    });

    toggleModal();
  };

  return (
    <div className="add-Transaction">
      <div className="header-modal">
        <img
          src={CloseIconM}
          id="CloseIconM"
          onClick={toggleModal}
          className="cursor-pointer"
        />
        <h4>افزودن تراکنش</h4>
        <img
          src={CloseIconD}
          id="CloseIconD"
          onClick={toggleModal}
          className="cursor-pointer"
        />
      </div>

      <form onSubmit={handleSubmit}>
        {/* DATE */}
        <div className="date-input">
          <label>
            تاریخ
            {/* input نمایشی */}
            <input
              type="text"
              className="date-input-text"
              placeholder="   "
              value={formData.date}
              readOnly
              onClick={openDatePicker}
            />
            {/* آیکون */}
            <img
              src={CalendarIcon}
              className="calendar-icon"
              onClick={openDatePicker}
            />
            {/* input واقعی date */}
            <input
              type="date"
              ref={dateRef}
              className="hidden-date-input"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </label>
          {errorDate && <small className="error-text">{errorDate}</small>}
        </div>

        {/* AMOUNT */}
        <div>
          <label>
            مبلغ (تومان)
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={inputChange}
            />
          </label>
          {errorCost && <small className="error-text">{errorCost}</small>}
        </div>

        {/* TYPE */}
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

        {/* DESCRIPTION */}
        <div>
          <label>
            شرح
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={inputChange}
            />
          </label>
          {errorDic && <small className="error-text">{errorDic}</small>}
        </div>

        {/* BUTTONS */}
        <div className="modal-buttons">
          <button
            type="button"
            onClick={toggleModal}
            className="cursor-pointer"
          >
            انصراف
          </button>
          <button type="submit" className="cursor-pointer">
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionModal;

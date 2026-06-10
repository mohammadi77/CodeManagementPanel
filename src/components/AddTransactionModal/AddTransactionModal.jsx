// AddTransactionModal.js
import { useState } from 'react';
import CloseIconD from '../../assets/icons/Button Close.svg';
import CloseIconM from '../../assets/icons/Line 1.svg';
import CalendarIcon from '../../assets/icons/Calendar.svg';
import { FaToEnNumber } from '../../utils/FaToEnNumber ';
import { ToPersianWithSeparator } from '../../utils/ToPersianWithSeparator';
import Modal from '../Modal/Modal';
import './AddTransactionModal.css';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const convertDigitsToPersian = (str) => {
  if (!str) return '';
  return String(str).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function AddTransactionModal({ toggleModal, dataAdd, dataEdit, editData }) {
  const isEditMode = !!editData;

  const [errorDate, setErrorDate] = useState('');
  const [errorAmount, setErrorAmount] = useState('');
  const [errorDesc, setErrorDesc] = useState('');

  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    type: 'income',
    description: '',
  });

  const [displayDate, setDisplayDate] = useState('');

  const handleSetFormData = (newData) => setFormData(newData);
  const handleSetDisplayDate = (date) => setDisplayDate(date);

  const inputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      const rawDigits = value.replace(/[^۰-۹0-9]/g, '');

      const persianDigits = rawDigits.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

      const formatted = ToPersianWithSeparator(persianDigits);

      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));

      setErrorAmount('');
    } else if (name === 'description') {
      const persianDesc = convertDigitsToPersian(value);

      setFormData((prev) => ({
        ...prev,
        [name]: persianDesc,
      }));

      setErrorDesc('');
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.date) {
      setErrorDate('تاریخ را وارد کنید');
      hasError = true;
    }

    const rawPersian = formData.amount.replace(/,/g, '');

    const amountEn = FaToEnNumber(rawPersian);

    const amountNumber = Number(amountEn);

    if (!amountEn || isNaN(amountNumber) || amountNumber <= 0) {
      setErrorAmount('مبلغ معتبر وارد کنید');
      hasError = true;
    }

    if (!formData.description.trim()) {
      setErrorDesc('توضیحات را وارد کنید');
      hasError = true;
    }

    if (hasError) return;

    const transactionData = {
      date: formData.date,
      amount: amountNumber,
      type: formData.type,
      description: formData.description,
      title: formData.description,
    };

    if (isEditMode && dataEdit) {
      dataEdit(editData.id, transactionData);
    } else {
      dataAdd(transactionData);
    }

    toggleModal();
  };

  return (
    <Modal
      toggleModal={toggleModal}
      editData={editData}
      onSetFormData={handleSetFormData}
      onSetDisplayDate={handleSetDisplayDate}
      convertDigitsToPersian={convertDigitsToPersian}
      ToPersianWithSeparator={ToPersianWithSeparator}
    >
      <div className="add-Transaction">
        <div className="header-modal">
          <img
            src={CloseIconM}
            id="CloseIconM"
            onClick={toggleModal}
            className="cursor-pointer"
            alt="close"
          />

          <h4>{isEditMode ? 'ویرایش تراکنش' : 'افزودن تراکنش'}</h4>

          <img
            src={CloseIconD}
            id="CloseIconD"
            onClick={toggleModal}
            className="cursor-pointer"
            alt="close"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* DATE */}
          <div className="date-input">
            <label htmlFor="transaction-date">
              تاریخ
              <DatePicker
                value={formData.date}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                calendarPosition="bottom-right"
                onChange={(date) => {
                  if (!date) return;

                  const dateString = date.format('YYYY/MM/DD');

                  setFormData((prev) => ({
                    ...prev,
                    date: dateString,
                  }));

                  setDisplayDate(convertDigitsToPersian(dateString));
                  setErrorDate('');

                  // ✅ بستن تقویم (روش سازگار با نسخه تو)
                  setTimeout(() => {
                    document.body.click();
                  }, 80);
                }}
                render={(value, openCalendar) => (
                  <div style={{ position: 'relative' }}>
                    <input
                      id="transaction-date"
                      type="text"
                      className="date-input-text"
                      value={value || ''}
                      placeholder="انتخاب تاریخ"
                      readOnly
                      onClick={openCalendar}
                    />

                    <img
                      src={CalendarIcon}
                      className="calendar-icon"
                      onClick={openCalendar}
                      alt="calendar"
                    />
                  </div>
                )}
              />
            </label>

            {errorDate && <small className="error-text">{errorDate}</small>}
          </div>

          {/* AMOUNT */}
          <div>
            <label htmlFor="transaction-amount">
              مبلغ (تومان)
              <input
                id="transaction-amount"
                type="text"
                name="amount"
                value={formData.amount}
                onChange={inputChange}
                placeholder="مثال: ۱,۲۵۰,۰۰۰"
              />
            </label>

            {errorAmount && <small className="error-text">{errorAmount}</small>}
          </div>

          {/* TYPE */}
          <div id="type">
            <span>نوع تراکنش</span>

            <div>
              <label htmlFor="income">
                <input
                  id="income"
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={inputChange}
                />
                درآمد
              </label>

              <label htmlFor="expense">
                <input
                  id="expense"
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={inputChange}
                />
                هزینه
              </label>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="transaction-description">
              شرح
              <input
                id="transaction-description"
                type="text"
                name="description"
                value={formData.description}
                onChange={inputChange}
                placeholder="مثال: خرید ۱۲ عدد کتاب"
              />
            </label>

            {errorDesc && <small className="error-text">{errorDesc}</small>}
          </div>

          {/* BUTTONS */}
          <div className="modal-buttons">
            <button type="button" onClick={toggleModal} className="cursor-pointer">
              انصراف
            </button>

            <button type="submit" className="cursor-pointer">
              {isEditMode ? 'ثبت تغییرات' : 'ثبت'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddTransactionModal;

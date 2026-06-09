// Modal.js
import { useEffect } from 'react';
import './Modal.css';

function Modal({
  toggleModal,
  children,
  editData, // داده‌های حالت ویرایش
  onSetFormData, // تابع برای تنظیم formData
  onSetDisplayDate, // تابع برای تنظیم displayDate
  convertDigitsToPersian, // تابع تبدیل اعداد به فارسی
  ToPersianWithSeparator, // تابع فرمت مبلغ
}) {
  // useEffect ای که قبلاً در AddTransactionModal بود، حالا اینجاست
  useEffect(() => {
    if (editData && onSetFormData && onSetDisplayDate) {
      onSetFormData({
        date: editData.date || '',
        amount: editData.amount ? ToPersianWithSeparator(editData.amount) : '',
        type: editData.type || 'income',
        description: editData.description || '',
      });
      onSetDisplayDate(convertDigitsToPersian(editData.date || ''));
    }
  }, [editData, onSetFormData, onSetDisplayDate, convertDigitsToPersian, ToPersianWithSeparator]);

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;

import { useEffect, useRef } from 'react';
import './Modal.css';

function Modal({
  toggleModal,
  children,
  editData,
  onSetFormData,
  onSetDisplayDate,
  convertDigitsToPersian,
  ToPersianWithSeparator,
}) {
  // 👇 جلوگیری از اجرای دوباره useEffect
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!editData) {
      hasHydrated.current = false;
      return;
    }

    // 👇 فقط یک بار اجرا شود
    if (hasHydrated.current) return;

    onSetFormData({
      date: editData.date || '',
      amount: editData.amount ? ToPersianWithSeparator(editData.amount) : '',
      type: editData.type || 'income',
      description: editData.description || '',
    });

    onSetDisplayDate(convertDigitsToPersian(editData.date || ''));

    hasHydrated.current = true;
  }, [editData]);

  return (
    <div className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;

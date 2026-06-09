// src/components/Button_Date/Button_Date.jsx
import { useRef } from 'react';
import CalendarIcon from '../../assets/icons/Calendar.svg';
import './Button_Date.css';

function Button_Date({
  value = '',
  onChange,
  label = 'از تاریخ', // prop جدید برای متن لیبل
  placeholder = '   ', // (اختیاری) قابلیت تغییر placeholder
}) {
  const dateRef = useRef(null);

  const openDatePicker = () => {
    dateRef.current?.showPicker();
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    onChange?.(newDate);
  };

  return (
    <div id="Button_Date">
      <div className="date-input">
        <label>
          <span>{label}</span> {/* استفاده از prop به جای متن ثابت */}
          <input
            type="text"
            className="date-input-text"
            placeholder={placeholder}
            value={value}
            readOnly
            onClick={openDatePicker}
          />
          <img
            src={CalendarIcon}
            className="calendar-icon"
            onClick={openDatePicker}
            alt="انتخاب تاریخ"
          />
          <input
            type="date"
            ref={dateRef}
            className="hidden-date-input"
            value={value}
            onChange={handleDateChange}
          />
        </label>
      </div>
    </div>
  );
}

export default Button_Date;

// src/components/Button_Date/Button_Date.jsx

import CalendarIcon from '../../assets/icons/Calendar.svg';

import './ButtonDate.css';

import DatePicker from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';

import persian_fa from 'react-date-object/locales/persian_fa';

function ButtonDate({ value, onChange, label, placeholder = 'انتخاب تاریخ' }) {
  return (
    <div id="Button_Date">
      <div className="date-input">
        <label>
          <span>{label}</span>

          <div className="date-picker-wrapper">
            <DatePicker
              value={value}
              onChange={onChange}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass="date-input-text"
              placeholder={placeholder}
            />

            <img src={CalendarIcon} className="calendar-icon" alt="انتخاب تاریخ" />
          </div>
        </label>
      </div>
    </div>
  );
}

export default ButtonDate;

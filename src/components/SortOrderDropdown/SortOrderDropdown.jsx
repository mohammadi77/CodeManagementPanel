import { useState, useRef, useEffect } from 'react';
import './SortOrderDropdown.css';

import arrowIcon from '../../assets/icons/Arrow - Down 2.svg';

function SortOrderDropdown({ value, onChange, placeholder = 'انتخاب کنید' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: '', label: 'انتخاب کنید' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'oldest', label: 'قدیمی‌ترین' },
    { value: 'highest_expense', label: 'بالاترین هزینه' },
    { value: 'lowest_expense', label: 'کمترین هزینه' },
    { value: 'highest_income', label: 'بالاترین درآمد' },
    { value: 'lowest_income', label: 'کمترین درآمد' },
  ];

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-order-dropdown" ref={dropdownRef}>
      <span>ترتیب نمایش</span>

      <button type="button" className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}

        <img src={arrowIcon} alt="arrow" className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`dropdown-item ${value === opt.value ? 'active' : ''}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortOrderDropdown;

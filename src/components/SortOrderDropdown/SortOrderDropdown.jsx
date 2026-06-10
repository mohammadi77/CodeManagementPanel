import { useState, useRef, useEffect } from 'react';
import './SortOrderDropdown.css';

function SortOrderDropdown({ value, onChange, placeholder = 'انتخاب کنید' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'asc', label: 'صعودی' },
    { value: 'desc', label: 'نزولی' },
    { value: 'newest', label: 'جدیدترین' },
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sort-order-dropdown" ref={dropdownRef}>
      <span>ترتیب نمایش</span>

      <button type="button" className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <span className="dropdown-arrow">{isOpen ? ' ▲' : ' ▼'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
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
      )}
    </div>
  );
}

export default SortOrderDropdown;

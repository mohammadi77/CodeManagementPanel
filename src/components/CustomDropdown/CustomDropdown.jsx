import { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

import arrowIcon from '../../assets/icons/Arrow - Down 2.svg';

function CustomDropdown({ value, options, onChange, placeholder = 'انتخاب کنید' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel = options.find((item) => item.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button type="button" className="custom-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}

        <img src={arrowIcon} alt="arrow" className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>

      <div className={`custom-dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((item) => (
          <div
            key={item.value}
            className={`custom-dropdown-item ${value === item.value ? 'active' : ''}`}
            onClick={() => {
              onChange(item.value);
              setIsOpen(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomDropdown;

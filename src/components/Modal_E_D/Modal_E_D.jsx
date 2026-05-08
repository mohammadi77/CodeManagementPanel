import { forwardRef } from "react";
import "./Modal_E_D.css";

import IconEdit from "../../assets/icons/Edit Square.svg";
import IconDelete from "../../assets/icons/Delete.svg";

const Modal_E_D = forwardRef(({ x, y, id, onEdit, onDelete, onClose }, ref) => {
  return (
    <div
      ref={ref}
      className="menu-container"
      style={{
        top: y,
        left: x,
        position: "absolute",
      }}
    >
      {/* Edit */}
      <div
        className="menu-item"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(id);
          onClose?.();
        }}
      >
        <img src={IconEdit} alt="edit" />
        <span>ویرایش</span>
      </div>

      <div
        className="menu-item delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(id);
          onClose?.();
        }}
      >
        <img src={IconDelete} alt="delete" />
        <span>حذف</span>
      </div>
    </div>
  );
});

export default Modal_E_D;

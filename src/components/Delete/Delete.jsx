import React from "react";
import "./Delete.css";
import CloseIconD from "../../assets/icons/Button Close.svg";
import CloseIconM from "../../assets/icons/Line 1.svg";

function Delete({ dataDelete, toogleModal, id }) {
  return (
    <div className="modal-Delete">
      <div id="title">
        <img
          src={CloseIconM}
          alt="بستن"
          onClick={toogleModal}
          id="CloseIconM"
          className="cursor-pointer"
        />
        <p>برای حذف مطمئن هستید؟</p>{" "}
        <img
          src={CloseIconD}
          alt=""
          onClick={toogleModal}
          id="CloseIconD"
          className="cursor-pointer"
        />{" "}
      </div>
      <div id="buttons">
        <button
          id="submit"
          onClick={() => {
            dataDelete(id);
            toogleModal();
          }}
          className="cursor-pointer"
        >
          <span>حذف</span>
        </button>
        <button id="cansel" onClick={toogleModal} className="cursor-pointer">
          <span>انصراف</span>
        </button>
      </div>
    </div>
  );
}
export default Delete;

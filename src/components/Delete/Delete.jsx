import "./Delete.css";
import CloseIconD from "../../assets/icons/Button Close.svg";
import CloseIconM from "../../assets/icons/Line 1.svg";

function Delete({ dataDelete, toggleModal, id }) {
  return (
    <div className="modal-Delete">
      <div id="title">
        <img
          src={CloseIconM}
          alt="بستن"
          onClick={toggleModal}
          id="CloseIconM"
          className="cursor-pointer"
        />
        <p>حذف تراکنش </p>
        <img
          src={CloseIconD}
          alt=""
          onClick={toggleModal}
          id="CloseIconD"
          className="cursor-pointer"
        />{" "}
      </div>
      <p id="text">برای حذف مطمئن هستید؟</p>

      <div id="buttons">
        <button id="cansel" onClick={toggleModal} className="cursor-pointer">
          <span>انصراف</span>
        </button>{" "}
        <button
          id="submit"
          onClick={() => {
            dataDelete(id);
            toggleModal();
          }}
          className="cursor-pointer"
        >
          <span>حذف</span>
        </button>
      </div>
    </div>
  );
}
export default Delete;

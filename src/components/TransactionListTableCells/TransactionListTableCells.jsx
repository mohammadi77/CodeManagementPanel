import "./TransactionListTableCells.css";
import TrashIcon from "../../assets/icons/Delete.svg";
import { ToPersianWithSeparator } from "../../utils/ToPersianWithSeparator";

function TransactionListTableCells({ data, onDeleteClick }) {
  const checkIncome = data?.income === 0;
  const textIncome = checkIncome
    ? " "
    : `${ToPersianWithSeparator(data?.income)}+`;
  const incomeClass = data?.income === 0 ? "hide-on-mobile" : "show-on-mobile";

  const checkCost = data?.cost === 0;
  const textCost = checkCost ? " " : `${ToPersianWithSeparator(data?.cost)}-`;
  const costClass = data?.cost === 0 ? "hide-on-mobile" : "show-on-mobile";

  return (
    <tr>
      <td className="td-Date grid-Date">{data?.date}</td>
      <td className={`td-Income grid-Income ${incomeClass}`}>
        <span>{textIncome}</span> <span id="text-Cost">تومان</span>
      </td>
      <td className={`td-Cost grid-Cost ${costClass}`}>
        <span>{textCost}</span> <span id="text-Cost">تومان</span>
      </td>
      <td className="td-Description grid-Description">{data?.description}</td>
      <td className="grid-trash">
        <img
          src={TrashIcon}
          id="icon"
          alt=""
          onClick={() => onDeleteClick(data.id)}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
}

export default TransactionListTableCells;

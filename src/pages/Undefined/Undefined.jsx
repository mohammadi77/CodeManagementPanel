import Logo from "../../assets/images/rafiki.svg";
import "./Undefined.css";
function Undefined() {
  return (
    <div className="UndefinedWrapper">
      <div className="Undefined">
        <img src={Logo} alt="" />
        <p>صفحه مورد نظر پیدا نشد!</p>
      </div>
    </div>
  );
}
export default Undefined;

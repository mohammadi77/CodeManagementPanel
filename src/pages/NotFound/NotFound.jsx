import Logo from "../../assets/images/rafiki.svg";
import "./NotFound.css";
function NotFound() {
  return (
    <div className="UndefinedWrapper">
      <div className="Undefined">
        <img src={Logo} alt="" />
        <p>صفحه مورد نظر پیدا نشد!</p>
      </div>
    </div>
  );
}
export default NotFound;

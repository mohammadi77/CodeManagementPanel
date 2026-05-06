import Logo from "../../assets/icons/Logo.svg";
import "./SingIn.css";
function SingIn() {
  return (
    <div className="sing-in">
      <img src={Logo} alt="" />

      <form action="">
        <label htmlFor="">
          <input type="text" />
        </label>
        <label htmlFor="">
          <input type="text" />
        </label>
        <input></input>
      </form>
    </div>
  );
}
export default SingIn;

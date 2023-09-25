import "./Footer.css";
import VandyLogo from "./VandyLogo.png";
function Footer() {
  return (
    <div className="Footer">
      <div>Brought to you by Students at Vanderbilt University</div>

      <img className="img" src={VandyLogo} alt="logo" />
    </div>
  );
}
export default Footer;

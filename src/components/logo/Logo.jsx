import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      <img className="logo__image" src={logo} alt="IMS Online Logo" />
      <span className="logo__title">Istokkit</span>
    </Link>
  );
}

export default Logo;
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import "./logo.css";

function Logo() {
  return (
    <section className="logo">
      <img className="logo__image" src={logo} alt="Logo" />
      <Link to={"/"} className="logo__title">IMS Online</Link>
    </section>
  );
}

export default Logo;

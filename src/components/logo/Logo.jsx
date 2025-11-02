import logo from "../../assets/logo.png";
import "./logo.css";

function Logo() {
  return (
    <section className="logo">
      <img className="logo__image" src={logo} alt="Logo" />
      <h5 className="logo__title">IMS Online</h5>
    </section>
  );
}

export default Logo;

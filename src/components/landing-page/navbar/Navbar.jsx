import Button from "../../common/button/Button";
import logo from "../../../assets/logo.png";
import "./navbar.css";

function Navbar() {
  return (
    <header className="header">
      <div className="header__container">
        <section className="header__title">
          <img className="header__logo-image" src={logo} alt="Logo" />
          <h5 className="header__logo-title">IMS Online</h5>
        </section>

        <nav className="header__nav">
          <div className="header__nav-links">
            <a className="header__nav-link" href="/">
              Features
            </a>
            <a className="header__nav-link" href="/about">
              About
            </a>
            <a className="header__nav-link" href="/services">
              Contact
            </a>
          </div>
          <hr />
          <div className="header__buttons">
            <Button label="Log in" className="header__button--login" />
            <Button label="Start for free" className="header__button--register" />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

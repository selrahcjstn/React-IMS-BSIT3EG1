import Logo from "../../../components/logo/Logo";
import { Link } from "react-router"; 
import "./navbar.css";

function Navbar() {

  return (
    <header className="header">
      <div className="header__container">
        <Logo />  
        <nav className="header__nav">
          <div className="header__nav-links">
            <Link className="header__nav-link" to="/">
              Features
            </Link>
            <Link className="header__nav-link" to="/about">
              About
            </Link>
            <Link className="header__nav-link" to="/services">
              Contact
            </Link>
          </div>
          <hr />
          <div className="header__buttons">
            <Link
              to={"/auth/login"}
              className="header__button--login"
            >Log in</Link>
            <Link
              to={"/auth/register"}
              className="header__button--register"
            >Start for free</Link>
          </div>
        </nav>  
      </div>
    </header>
  );
}

export default Navbar;

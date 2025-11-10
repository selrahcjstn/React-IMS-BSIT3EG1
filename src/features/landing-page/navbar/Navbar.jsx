import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../components/logo/Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <nav className="header__nav">
          <div className="header__nav-links">
            <Link className="header__nav-link" to="/" onClick={closeMenu}>
              Features
            </Link>
            <Link className="header__nav-link" to="/about" onClick={closeMenu}>
              About
            </Link>
            <Link className="header__nav-link" to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </div>
          <div className="header__divider"></div>
          <div className="header__buttons">
            <Link to="/auth/login" className="header__button--login" onClick={closeMenu}>
              Log in
            </Link>
            <Link to="/auth/register" className="header__button--register" onClick={closeMenu}>
              Start for free
            </Link>
          </div>
        </nav>

        <button
          className="header__hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`header__mobile-menu ${isOpen ? "is-open" : ""}`}>
        <div className="header__mobile-links">
          <Link className="header__mobile-link" to="/" onClick={closeMenu}>
            Features
          </Link>
          <Link className="header__mobile-link" to="/about" onClick={closeMenu}>
            About
          </Link>
          <Link className="header__mobile-link" to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </div>
        <div className="header__mobile-buttons">
          <Link to="/auth/login" className="header__mobile-button--login" onClick={closeMenu}>
            Log in
          </Link>
          <Link to="/auth/register" className="header__mobile-button--register" onClick={closeMenu}>
            Start for free
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
import { useState } from "react";
import Logo from "../../../components/logo/Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <nav className="header__nav">
          <div className="header__nav-links">
            <button className="header__nav-link" onClick={() => handleScroll("home")}>
              Home
            </button>
            <button className="header__nav-link" onClick={() => handleScroll("features")}>
              Features
            </button>
            <button className="header__nav-link" onClick={() => handleScroll("contact")}>
              Contact
            </button>
          </div>
          <div className="header__divider"></div>
          <div className="header__buttons">
            <a href="/auth/login" className="header__button--login" onClick={closeMenu}>
              Log in
            </a>
            <a href="/auth/register" className="header__button--register" onClick={closeMenu}>
              Start for free
            </a>
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
          <button className="header__mobile-link" onClick={() => handleScroll("home")}>
            Home
          </button>
          <button className="header__mobile-link" onClick={() => handleScroll("features")}>
            Features
          </button>
          <button className="header__mobile-link" onClick={() => handleScroll("contact")}>
            Contact
          </button>
        </div>
        <div className="header__mobile-buttons">
          <a href="/auth/login" className="header__mobile-button--login" onClick={closeMenu}>
            Log in
          </a>
          <a href="/auth/register" className="header__mobile-button--register" onClick={closeMenu}>
            Start for free
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

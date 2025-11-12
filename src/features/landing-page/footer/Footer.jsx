import "./footer.css"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__brand">Istokkit</h3>
            <p className="footer__description">
              Inventory Management System for efficient business operations.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__section-title">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__section-title">Legal</h4>
            <ul className="footer__links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Istokkit.app. All rights reserved.
          </p>
          <div className="footer__credit">
            <span>Built by </span>
            <a 
              href="https://github.com/selrahcjstn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer__github-link"
            >
              selrahcjstn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
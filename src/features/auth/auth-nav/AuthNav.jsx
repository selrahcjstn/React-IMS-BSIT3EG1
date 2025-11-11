import Logo from "../../../components/logo/Logo";
import "./auth-nav.css";

function AuthNav() {
  return (
    <header className="login__header container">
      <nav className="login__nav ">
        <Logo />
      </nav>
    </header>
  );
}

export default AuthNav;
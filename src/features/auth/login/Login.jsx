
import Logo from "../../../components/logo/Logo";
import "./login.css";
import illustrator from "../../../assets/auth/login.svg"
import LoginForm from "../../../components/auth/form/LoginForm";
function Login() {
  return (
    <div className="login container">
      <header>
        <nav className="login__nav">
          <Logo />
        </nav>
      </header>

      <main className="login__main">
        <LoginForm />
        <aside aria-label="Illustration">
          <img src={illustrator} alt="login-illustrator" className="illustrator"/>
        </aside>
      </main>
    </div>
  );
}

export default Login;


import Logo from "../../../components/logo/Logo";
import illustrator from "../../../assets/auth/register3.svg"
import RegisterForm from "../../../components/auth/register-form/RegisterForm";
import "./register.css";

function Register() {
  return (
    <div className="login container">
      <header>
        <nav className="login__nav">
          <Logo />
        </nav>
      </header>

      <main className="login__main">
        <RegisterForm />
        <aside aria-label="Illustration">
          <div className="blob-background"></div>
          <img src={illustrator} alt="login-illustrator" className="illustrator"/>
        </aside>
      </main>
    </div>
  );
}

export default Register;

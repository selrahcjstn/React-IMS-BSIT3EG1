
import Logo from "../../../components/logo/Logo";
import "../../../styles/auth.css"
import illustrator from "../../../assets/auth/login.svg"
import LoginForm from "../../../components/auth/login-form/LoginForm";
import ImageHolder from "../../../features/auth/ImageHolder";
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
        <ImageHolder illustrator={illustrator} />
      </main>
    </div>
  );
}

export default Login;

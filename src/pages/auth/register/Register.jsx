
import Logo from "../../../components/logo/Logo";
import illustrator from "../../../assets/auth/register3.svg"
import RegisterForm from "../../../features/auth/register-form/RegisterForm";
import ImageHolder from "../../../features/auth/image-holder/ImageHolder";
import "../../../styles/auth.css"

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
        <ImageHolder illustrator={illustrator} />
      </main>
    </div>
  );
}

export default Register;

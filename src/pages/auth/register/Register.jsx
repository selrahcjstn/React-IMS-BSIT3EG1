import illustrator from "../../../assets/auth/register3.svg";
import RegisterForm from "../../../features/auth/register-form/RegisterForm";
import ImageHolder from "../../../features/auth/image-holder/ImageHolder";
import { useAuth } from "../../../context/AuthContext";

function Register() {
  const { email, setEmail, password, setPassword } = useAuth();

  return (
    <div className="login container">
      <main className="login__main">
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <ImageHolder illustrator={illustrator} />
      </main>
    </div>
  );
}

export default Register;

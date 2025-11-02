import illustrator from "../../../assets/auth/register3.svg"
import RegisterForm from "../../../features/auth/register-form/RegisterForm";
import ImageHolder from "../../../features/auth/image-holder/ImageHolder";

function Register() {
  return (
    <div className="login container">
      <main className="login__main">
        <RegisterForm />
        <ImageHolder illustrator={illustrator} />
      </main>
    </div>
  );
}

export default Register;

import illustrator from "../../assets/auth/login.svg";
import LoginForm from "../../features/auth/login-form/LoginForm";
import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import "./common.css";
function Login() {
  return (
    <div className="illustrator__container container">
      <LoginForm />
      <ImageHolder illustrator={illustrator} />
    </div>
  );
}

export default Login;

import illustrator from "../../assets/auth/register3.svg";
import RegisterForm from "../../features/auth/register-form/RegisterForm";
import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import "./common.css";

function Register() {
  return (
    <div className="illustrator__container container">
      <RegisterForm/>
      <ImageHolder illustrator={illustrator} />
    </div>
  );
}

export default Register;

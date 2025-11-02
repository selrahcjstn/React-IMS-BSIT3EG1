import illustrator from "../../assets/auth/register3.svg";
import RegisterForm from "../../features/auth/register-form/RegisterForm";
import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import { useAuth } from "../../context/AuthContext";
import "./common.css";

function Verification() {
  const { email, setEmail, password, setPassword } = useAuth();

  return (
    <div className="illustrator__container container">
      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <ImageHolder illustrator={illustrator} />
    </div>
  );
}

export default Verification;

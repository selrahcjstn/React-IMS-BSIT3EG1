import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import VerificationForm from "../../features/auth/verification-form/VerificationForm";
import illustrator from "../../assets/auth/verify.svg"
import "./common.css";

function Verification() {
  return (
    <div className="illustrator__container container">
      <VerificationForm />
      <ImageHolder illustrator={illustrator} />
    </div>
  );
}

export default Verification;

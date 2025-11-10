import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import VerificationForm from "../../features/auth/verification-form/VerificationForm";
import illustration from "../../assets/auth/verify.svg"
import "./common.css";

function Verification() {
  return (
    <div className="illustrator__container container">
      <VerificationForm />
      <ImageHolder illustration={illustration} />
    </div>
  );
}

export default Verification;

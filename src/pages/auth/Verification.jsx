//import illustrator from "../../assets/auth/register3.svg";
import ImageHolder from "../../features/auth/image-holder/ImageHolder";
import VerificationForm from "../../features/auth/verification-form/VerificationForm";

import "./common.css";

function Verification() {
  return (
    <div className="illustrator__container container">
      <VerificationForm />
      <ImageHolder />
    </div>
  );
}

export default Verification;

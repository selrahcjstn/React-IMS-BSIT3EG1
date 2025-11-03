import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./verification-form.css";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";

function VerificationForm() {
  const { email } = useAuth();
  const [userEmail, setUserEmail] = useState(email || "");

  useEffect(() => {
    const sendVerification = async () => {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        console.log("Verification email sent to:", auth.currentUser.email);
        setUserEmail(auth.currentUser.email);
      }
    };

    sendVerification();
  }, []);

  const handleResend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      console.log("Resent verification email to:", auth.currentUser.email);
    }
  };

  return (
    <div className="verification">
      <div className="verification__left">
        <div className="verification__content">
          <h1 className="verification__title">Check your email</h1>
          <p className="verification__text">
            To start using <strong>IMS Online</strong>, we need you to confirm
            your account.
          </p>
          <p className="verification__subtext">
            Please click the link we sent to the following email:
          </p>

          <p className="verification__email">{userEmail}</p>

          <div className="verification__buttons">
            <button onClick={handleResend} className="verification__btn resend">
              Resend Email
            </button>

            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
              className="verification__btn open"
            >
              Open Email
            </a>
          </div>

          <div className="register__footer">
            <p className="verification__change">
              Not the right email?{" "}
              <Link to="/auth/register">Change account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;

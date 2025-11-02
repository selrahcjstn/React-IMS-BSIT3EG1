import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./verification.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";

function Verification() {
  const { email, password } = useAuth();
  const [userEmail, setUserEmail] = useState(email || "");

  useEffect(() => {
    let hasRun = false; // To prevent multiple executions

    const createAccount = async () => {
      if (hasRun) return;
      hasRun = true;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
        setUserEmail(userCredential.user.email);
        console.log("Verification email sent to:", userCredential.user.email);
      } catch (error) {
        console.error("Error creating account:", error.message);
      }
    };

    if (email && password) {
      createAccount();
    }
  }, [email, password]);

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

          <p className="verification__change">
            Not the right email? <Link to="/auth/register">Change account</Link>
          </p>
        </div>
      </div>
      <div className="verification__right">
        <div
          className="verification__illustration"
          aria-label="email verification illustration"
        ></div>
      </div>
    </div>
  );
}

export default Verification;

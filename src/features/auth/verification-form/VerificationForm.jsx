import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verification-form.css";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "../../../firebase/config";

function VerificationForm() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const sendVerification = async () => {
      if (!currentUser) {
        navigate("/auth/login");
        return;
      }

      if (currentUser.emailVerified === true) {
        navigate("/dashboard");
        return;
      }

      if (!userEmail) {
        try {
          await sendEmailVerification(currentUser);
          setUserEmail(currentUser.email);
        } catch (err) {
          console.error("Failed to send verification email:", err.message);
        }
      }
    };

    sendVerification();
  }, [currentUser, navigate, userEmail]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        try {
          await auth.currentUser.reload();
          
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            navigate("/auth/personal-info");
          }
        } catch (err) {
          console.error("Failed to reload user:", err.message);
          if (err.code === 'auth/user-token-expired') {
            await signOut(auth);
            navigate("/auth/login");
          }
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]); 

  const handleResend = async () => {
    if (!currentUser) return;
    try {
      await sendEmailVerification(currentUser);
    } catch (err) {
      console.error("Failed to resend verification email:", err.message);
    }
  };

  const handleChangeAccount = async () => {
    try {
      await signOut(auth);
      navigate("/auth/register");
    } catch (error) {
      console.error("Error signing out: ", error);
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

          <p className="verification__email">{userEmail || "Loading..."}</p>

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

          <div className="verification__footer">
            <p className="verification__change">
              Not the right email?{" "}
              <button
                onClick={handleChangeAccount}
                className="verification__change-link"
              >
                Change account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
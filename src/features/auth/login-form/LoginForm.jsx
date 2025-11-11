import LoginFormFields from "../../../components/auth/login-form-fields/LoginFormFields";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login-form.css";
import FormHelper from "../../../components/auth/form-helper/FormHelper";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      let friendlyErrorMessage = "An unknown error occurred. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          friendlyErrorMessage =
            "Invalid email format. Please check your spelling.";
          break;

        case "auth/user-not-found":
          friendlyErrorMessage = "No account found with this email.";
          break;

        case "auth/invalid-credential":
          friendlyErrorMessage = "Incorrect email or password. Please try again.";
          break;

        case "auth/too-many-requests":
          friendlyErrorMessage =
            "Too many failed attempts. Please reset your password or try again later.";
          break;

        default:
          console.error("Firebase login error:", error);
          friendlyErrorMessage = "Failed to log in. Please try again.";
      }

      setError(friendlyErrorMessage);
    }
  }

  return (
    <form className="login__form-container" onSubmit={handleSubmit} noValidate>
      <div className="login__header">
        <h1 id="login-heading" className="login__heading">
          Welcome
        </h1>
        <p className="login__message">
          Login to access your account and stay in control of your inventory.
        </p>
      </div>

      {error && <ErrorMessage error={error} />}

      <LoginFormFields
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setError={setError}
      />
      
      <FormHelper
        label="Register here"
        to="/auth/register"
        question="Don't have an account?"
      />
    </form>
  );
}

export default LoginForm;
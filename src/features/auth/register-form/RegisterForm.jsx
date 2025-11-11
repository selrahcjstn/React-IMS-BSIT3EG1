import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import RegisterFormFields from "../../../components/auth/register-form-fields/RegisterFormFields";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import "./register-form.css";
import FormHelper from "../../../components/auth/form-helper/FormHelper";
import { emailRegex } from "../../../validation/email-regex";
import { passwordRegex } from "../../../validation/password-regex";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    for (let rule of passwordRegex) {
      if (!rule.regex.test(password)) {
        setError(rule.message);
        return;
      }
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/auth/verify-account");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use!");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak!");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <form className="register__form-container" onSubmit={handleSubmit} noValidate>
      <div className="register__header">
        <h1 className="register__heading">Create Account</h1>
        <p className="register__message">
          Register to manage your inventory and grow your business efficiently.
        </p>
      </div>

      {error && <ErrorMessage error={error} />}

      <RegisterFormFields
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setError={setError}
      />

      <FormHelper
        label="Log in here"
        to="/auth/login"
        question="Already have an account?"
      />
    </form>
  );
}

export default RegisterForm;
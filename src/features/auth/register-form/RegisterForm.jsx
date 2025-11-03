import { Link, useNavigate } from "react-router-dom";
import RegisterFormFields from "../../../components/auth/register-form-fields/RegisterFormFields";
import { useState } from "react";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "../../../firebase/config";
import "./register-form.css";

function RegisterForm() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      navigate("/auth/verification"); 
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already used!");
        setEmail("");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak!");
        setPassword("");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <form className="register__form-container" onSubmit={handleSubmit}>
      <h1 id="register-heading" className="register__heading">
        Create Account
      </h1>
      <p className="register__message">
        Register to manage your inventory and grow your business efficiently.
      </p>

      {/* Fields component now updates context directly */}
      {error && <ErrorMessage error={error} />}
      <RegisterFormFields setEmail={setEmail} setPassword={setPassword} setError={setError} />

      <div className="register__footer">
        <p>
          Already have an account?{" "}
          <Link className="register__helper-login" to="/auth/login">
            Log in here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;

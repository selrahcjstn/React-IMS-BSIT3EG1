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
  const { setEmail, setPassword } = useAuth();
  const [error, setError] = useState("");

  const handleValidData = async ({ email, password }) => {
    setError("");
    setEmail(email);
    setPassword(password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      navigate("/auth/verify-account");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already used!");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak!");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="register__form-container">
      <h1 className="register__heading">Create Account</h1>
      <p className="register__message">
        Register to manage your inventory and grow your business efficiently.
      </p>
      {error && <ErrorMessage error={error} />}
      <RegisterFormFields onValidData={handleValidData} />
      <div className="register__footer">
        <p>
          Already have an account?{" "}
          <Link className="register__helper-login" to="/auth/login">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}


export default RegisterForm;

import { Link, useNavigate } from "react-router-dom";
import RegisterFormFields from "../../../components/auth/register-form-fields/RegisterFormFields";
import "./register-form.css";
import { useState } from "react";

function RegisterForm({ email, setEmail, password, setPassword }) {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setPassword(password);
    } else {
      setPassword("");
      alert("Passwords do not match!");
      return;
    }

    navigate("/auth/verify-account");
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    // For debugging purposes
    console.log({ email, password, confirmPassword });
  }

  return (
    <form className="register__form-container" onSubmit={handleSubmit}>
      <h1 id="register-heading" className="register__heading">
        Create Account
      </h1>
      <p className="register__message">
        Register to manage your inventory and grow your business efficiently.
      </p>

      <RegisterFormFields handleChange={handleChange} />

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

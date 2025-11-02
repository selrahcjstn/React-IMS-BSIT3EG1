import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import "./register-form.css";
import { useState } from "react";

function RegisterForm({ email, setEmail, setPassword }) {
  const navigate = useNavigate();
  const [tempPassword, setTempPassword] = useState ("");
  const [confirmPassword, setConfirmPassword] = useState ("");

  const handleSubmit = (e) => {
    e.preventDefault();

     if(tempPassword === confirmPassword){
      setPassword (tempPassword);
    }else{
      setPassword ("");
      alert ("Passwords do not match!");
      return;
    }

    navigate("/auth/verify-account");
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setTempPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    console.log({ email, tempPassword, confirmPassword });
  }

  return (
    <form className="register__form-container" onSubmit={handleSubmit}>
      <h1 id="register-heading" className="register__heading">
        Create Account
      </h1>
      <p className="register__message">
        Register to manage your inventory and grow your business efficiently.
      </p>

      <div className="register__form" noValidate>
        <CustomInput label="Email" icon={AiOutlineMail}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
            onChange={handleChange}
          />
        </CustomInput>

        <CustomInput label="Password" icon={AiOutlineLock}>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            onChange={handleChange}
          />
        </CustomInput>

        <CustomInput label="Confirm Password" icon={AiOutlineLock}>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            onChange={handleChange}
          />
        </CustomInput>

        <Button label="Register" type="submit" className="register__submit-btn" />

        <div className="register__social">
          <div className="register__divider">
            <span>or</span>
          </div>

          <button type="button" className="register__social-btn google">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>
          <button type="button" className="register__social-btn facebook">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
            />
            Continue with Facebook
          </button>
        </div>
      </div>

      <footer className="register__footer">
        <p>
          Already have an account?{" "}
          <Link className="register__helper-login" to="/auth/login">
            Log in here
          </Link>
        </p>
      </footer>
    </form>
  );
}

export default RegisterForm;

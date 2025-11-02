import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import { Link } from "react-router";
import "./register-form.css";

function RegisterForm() {
  return (
    <form className="register__form-container">
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

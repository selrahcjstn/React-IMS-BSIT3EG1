import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import { Link } from "react-router";
import "./login-form.css";

function LoginForm() {
  return (
    <form className="login__form-container">
      <h1 id="login-heading" className="login__heading">
        Welcome
      </h1>
      <p className="login__message">
        Login to access your account and stay in control of your inventory.
      </p>

      <div className="login__form" noValidate>
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
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </CustomInput>
        <Link className="login__forgot" to="/forgot-password">
          Forgot password?
        </Link>
        <Button label="Log in" type="submit" />
      </div>

      <div className="login__footer">
        <p>
          Don't have an account?{" "}
          <Link className="login__helper-signup" to="/auth/register">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;

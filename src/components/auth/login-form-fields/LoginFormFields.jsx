import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../common/button/Button";
import CustomInput from "../custom-input/CustomInput";
import Input from "../../common/input/Input";
import "./login-form-fields.css";
import Social from "../social/Social";

function LoginFormFields({email, password, setEmail, setPassword, setError}) {
  return (
    <div className="login__form-fields">
      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </CustomInput>

      <Link className="login__forgot" to="/forgot-password">
        Forgot password?
      </Link>

      <Button label="Log in" type="submit" />

      <Social setError={setError} />
    </div>
  );
}

export default LoginFormFields;
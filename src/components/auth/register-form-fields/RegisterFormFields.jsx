import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import "./register-form-fields.css";

function RegisterFormFields({ handleChange}) {
  return (
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
  )
}

export default RegisterFormFields
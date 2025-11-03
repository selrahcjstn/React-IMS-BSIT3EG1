import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
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

        <Social />
    </div>
  )
}

export default RegisterFormFields
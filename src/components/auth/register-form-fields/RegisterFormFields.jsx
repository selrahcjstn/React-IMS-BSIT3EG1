import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
import { passwordRegex } from "../../../validation/password-regex";
import { emailRegex } from "../../../validation/email-regex";
import "./register-form-fields.css";

function RegisterFormFields({ setError, setEmail, setPassword }) {

  const validateEmail = (e) => {
    const value = e.target.value;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      setEmail(value); 
    }
  };

  const validatePassword = (e) => {
    const value = e.target.value;
    for (let rule of passwordRegex) {
      if (!rule.regex.test(value)) {
        setError(rule.message);
        return;
      }
    }
    setError("");
  };

  const validationConfirmPassword = (e) => {
    const passwordValue = document.getElementById("password").value;
    const confirmPassword = e.target.value;
    if (confirmPassword !== passwordValue) {
      setError("Passwords do not match.");
    } else {
      setError("");
      setPassword(passwordValue); 
    }
  };

  return (
    <div className="field__container" noValidate>
      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          autoComplete="email"
          onChange={validateEmail}
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
          onChange={validatePassword}
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
          onChange={validationConfirmPassword}
        />
      </CustomInput>

      <Button label="Register" type="submit" className="register__submit-btn" />

      {/* Social Media Registration Options */}
      <Social />
    </div>
  );
}

export default RegisterFormFields;

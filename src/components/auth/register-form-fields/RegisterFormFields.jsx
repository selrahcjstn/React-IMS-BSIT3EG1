import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
import { emailRegex } from "../../../validation/email-regex";
import { passwordRegex } from "../../../validation/password-regex";
import "./register-form-fields.css";

function RegisterFormFields({ onSubmit, setError }) {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (!localEmail) return "Email is required.";
    if (!emailRegex.test(localEmail)) return "Please enter a valid email address.";

    if (!localPassword) return "Password is required.";
    for (let rule of passwordRegex) {
      if (!rule.regex.test(localPassword)) return rule.message;
    }

    if (!confirmPassword) return "Please confirm your password.";
    if (localPassword !== confirmPassword) return "Passwords do not match.";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(e, { email: localEmail.trim(), password: localPassword });
  };

  return (
    <div className="field__container">
      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          type="email"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value.trim())}
          placeholder="Enter your email"
          required
        />
      </CustomInput>

      <CustomInput label="Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
          placeholder="Create a password"
          required
        />
      </CustomInput>

      <CustomInput label="Confirm Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </CustomInput>

      <Button label="Register" type="button" onClick={handleSubmit} className="register__submit-btn" />

      <Social />
    </div>
  );
}

export default RegisterFormFields;

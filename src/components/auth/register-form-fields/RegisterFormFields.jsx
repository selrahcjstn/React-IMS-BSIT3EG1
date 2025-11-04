import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import { emailRegex } from "../../../validation/email-regex";
import { passwordRegex } from "../../../validation/password-regex";
import "./register-form-fields.css";

function RegisterFormFields({ onValidData }) {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setLocalEmail(value);

    if (!value) {
      setError("Email is required.");
    } else if (!emailRegex.test(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setLocalPassword(value);

    if (!value) {
      setError("Password is required.");
      return;
    }

    for (let rule of passwordRegex) {
      if (!rule.regex.test(value)) {
        setError(rule.message);
        return;
      }
    }
    setError("");
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) {
      setError("Please confirm your password.");
    } else if (value !== localPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && localEmail && localPassword && confirmPassword === localPassword) {
      onValidData({ email: localEmail.trim(), password: localPassword });
    } else if (!localEmail || !localPassword || !confirmPassword) {
      setError("Please fill out all fields correctly.");
    }
  };

  return (
    <form className="field__container" onSubmit={handleSubmit} noValidate>
      {error && <ErrorMessage error={error} />}

      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          type="email"
          value={localEmail}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
      </CustomInput>

      <CustomInput label="Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={localPassword}
          onChange={handlePasswordChange}
          placeholder="Create a password"
          required
        />
      </CustomInput>

      <CustomInput label="Confirm Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmChange}
          placeholder="Confirm your password"
          required
        />
      </CustomInput>

      <Button label="Register" type="submit" className="register__submit-btn" />
      <Social />
    </form>
  );
}

export default RegisterFormFields;

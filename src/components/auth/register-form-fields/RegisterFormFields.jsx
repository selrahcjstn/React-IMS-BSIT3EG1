import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
import ErrorMessage from "../../auth/error-message/ErrorMessage";
import { passwordRegex } from "../../../validation/password-regex";
import { emailRegex } from "../../../validation/email-regex";
import { useState } from "react";
import "./register-form-fields.css";

function RegisterFormFields({ handleChange }) {
  const [error, setError] = useState("");
  
  function validateEmail(e) {
    const email = e.target.value;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  }

  function validatePassword(e) {
    const password = e.target.value;
    for (let rule of passwordRegex) {
      if (!rule.regex.test(password)) {
        setError(rule.message);
        return;
      }
    }
    setError("");
  }

  function validationConfirmPassword(e) {
    const password = document.getElementById("password").value;
    const confirmPassword = e.target.value;
    if (confirmPassword !== password) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }

  return (
    <div className="form" noValidate>
      {error && <ErrorMessage error={error} />}
      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          autoComplete="email"
          onChange={(e) => {
            handleChange(e);
            validateEmail(e);
          }}
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
          onChange={(e) => {
            handleChange(e);
            validatePassword(e);
          }}
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
          onChange={(e) => {
            handleChange(e);
            validationConfirmPassword(e);
          }}
        />
      </CustomInput>

      <Button label="Register" type="submit" className="register__submit-btn" />
      {/* Social Media Registration Options */}
      <Social />
    </div>
  );
}

export default RegisterFormFields;

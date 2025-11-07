import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/button/Button";
import CustomInput from "../../../components/auth/custom-input/CustomInput";
import Social from "../../auth/social/Social";
import { emailRegex } from "../../../validation/email-regex";
import { passwordRegex } from "../../../validation/password-regex";
import "./register-form-fields.css";

function RegisterFormFields({ email, setEmail, password, setPassword, setError }) {
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Central validation logic
  const validateForm = (email, password, confirm) => {
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";

    if (!password) return "Password is required.";
    for (let rule of passwordRegex) {
      if (!rule.regex.test(password)) return rule.message;
    }

    if (!confirm) return "Please confirm your password.";
    if (password !== confirm) return "Passwords do not match.";

    return "";
  };

  // ✅ Live validation for each change
  const handleChange = (field, value) => {
    let newEmail = email;
    let newPassword = password;
    let newConfirm = confirmPassword;

    if (field === "email") newEmail = value.trim();
    if (field === "password") newPassword = value;
    if (field === "confirm") newConfirm = value;

    setEmail(newEmail);
    setPassword(newPassword);
    setConfirmPassword(newConfirm);

    const error = validateForm(newEmail, newPassword, newConfirm);
    setError(error);
  };

  return (
    <div className="field__container">
      <CustomInput label="Email" icon={AiOutlineMail}>
        <Input
          type="email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email"
          required
        />
      </CustomInput>

      <CustomInput label="Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Create a password"
          required
        />
      </CustomInput>

      <CustomInput label="Confirm Password" icon={AiOutlineLock}>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => handleChange("confirm", e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </CustomInput>

      <Button
        label="Register"
        type="submit"
        className="register__submit-btn"
      />

      <Social />
    </div>
  );
}

export default RegisterFormFields;

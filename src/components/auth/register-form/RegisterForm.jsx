import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import CustomInput from "../custom-input/CustomInput";
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
        <div className="register__name-group">
          <CustomInput label="First Name" icon={AiOutlineUser}>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              required
              autoComplete="given-name"
            />
          </CustomInput>

          <CustomInput label="Last Name" icon={AiOutlineUser}>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              required
              autoComplete="family-name"
            />
          </CustomInput>
        </div>

        <CustomInput label="Middle Name (Optional)" icon={AiOutlineUser}>
          <Input
            id="middleName"
            name="middleName"
            type="text"
            placeholder="Middle name"
            autoComplete="additional-name"
          />
        </CustomInput>

        <CustomInput label="Birthdate" icon={AiOutlineCalendar}>
          <Input
            id="birthdate"
            name="birthdate"
            type="date"
            required
            autoComplete="bday"
          />
        </CustomInput>

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

        <Button label="Register" type="submit" />
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

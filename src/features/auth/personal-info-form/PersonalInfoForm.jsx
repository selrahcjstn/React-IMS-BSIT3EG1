import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import PersonalInfoField from "../../../components/auth/personal-info-field/PersonalInfoField";
import "./personal-info-form.css";

function PersonalInfoForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !purpose) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log({
      firstName,
      middleName,
      lastName,
      purpose,
    });

    navigate("/auth/register");
  };

  return (
    <form className="personal__form-container" onSubmit={handleSubmit}>
      <h1 className="personal__heading">Personal Information</h1>
      <p className="personal__message">
        Provide your personal details to continue your registration.
      </p>

      {error && <ErrorMessage error={error} />}

      <PersonalInfoField
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        purpose={purpose}
        setFirstName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setPurpose={setPurpose}
      />

      <div className="personal__footer">
        <p>
          Already registered?{" "}
          <Link className="personal__helper-login" to="/auth/login">
            Log in here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default PersonalInfoForm;

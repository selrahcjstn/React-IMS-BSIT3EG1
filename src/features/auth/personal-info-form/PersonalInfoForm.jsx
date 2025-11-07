import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import { useAuth } from "../../../context/AuthContext";
import PersonalInfoField from "../../../components/auth/personal-info-field/PersonalInfoField";
import { getDatabase, ref, set } from "firebase/database";
import "./personal-info-form.css";


function PersonalInfoForm() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/auth/login");
    }

    if (!loading && currentUser && !currentUser.emailVerified) {
      navigate("/auth/login");
    }
  }, [currentUser, loading, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !purpose) {
      setError("Please fill in all required fields.");
      return;
    }
    
    const userData = {
      firstName,
      middleName,
      lastName,
      purpose,
      email: currentUser.email, 
      uid: currentUser.uid,
    };

    try {
      const db = getDatabase();
      await set(ref(db, "users/" + currentUser.uid), userData);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to save user data: " + error.message);
    }
  }

  if (loading || !currentUser) {
    return null; 
  }


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
    </form>
  );
}

export default PersonalInfoForm;
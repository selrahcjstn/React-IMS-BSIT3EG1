import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { nameRegex } from "../../../validation/name-regex";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import PersonalInfoField from "../../../components/auth/personal-info-field/PersonalInfoField";
import ErrorMessage from "../../../components/auth/error-message/ErrorMessage";
import "./personal-info-form.css";
import { auth } from "../../../firebase/config";

function PersonalInfoForm() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!currentUser) {
      navigate("/auth/login");
      return;
    }

    if (!currentUser.emailVerified) {
      navigate("/auth/login");
      return;
    }

    const checkProfile = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + currentUser.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        navigate("/dashboard");
      }
    };

    checkProfile().catch((error) => {
      setError("Error checking profile. Please try again.", error.message);
    });
  }, [currentUser, loading, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !purpose) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError(
        "Names must contain only letters and be at least 2 characters long."
      );
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

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
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
        error={error}
        setFirstName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setPurpose={setPurpose}
        setError={setError}
      />
    </form>
  );
}

export default PersonalInfoForm;
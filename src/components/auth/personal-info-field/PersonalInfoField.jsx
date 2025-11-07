import CustomInput from "../custom-input/CustomInput";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { nameRegex } from "../../../validation/name-regex";
import "./personal-info-field.css";

function PersonalInfoField({
  firstName,
  middleName,
  lastName,
  purpose,
  setFirstName,
  setMiddleName,
  setLastName,
  setPurpose,
  setError,
}) {
  const handleChange = (e, setter) => {
    const value = e.target.value;
    setter(value);

    if (!nameRegex.test(value)) {
      setError("Names must be letters only and at least 2 characters.");
    } else {
      setError("");
    }
  };

  return (
    <div className="personal__form">
      <CustomInput label="First Name">
        <Input
          type="text"
          value={firstName}
          onChange={(e) => handleChange(e, setFirstName)}
          required
        />
      </CustomInput>

      <CustomInput label="Middle Name (optional)">
        <Input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </CustomInput>

      <CustomInput label="Last Name">
        <Input
          type="text"
          value={lastName}
          onChange={(e) => handleChange(e, setLastName)}
          required
        />
      </CustomInput>

      <div className="personal__select-container">
        <label htmlFor="purpose" className="personal__label">
          Purpose of Using
        </label>
        <select
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="personal__select"
          required
        >
          <option value="">Select purpose</option>
          <option value="manage-finances">To manage my finances</option>
          <option value="organize-business">To organize my business</option>
          <option value="track-loans">To track my savings and loans</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Button label="Continue" type="submit" />
    </div>
  );
}

export default PersonalInfoField;

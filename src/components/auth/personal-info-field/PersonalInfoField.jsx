import CustomInput from "../custom-input/CustomInput";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";

function PersonalInfoField({
  firstName,
  middleName,
  lastName,
  purpose,
  setFirstName,
  setMiddleName,
  setLastName,
  setPurpose,
}) {
  return (
    <div className="personal__form" noValidate>
      <CustomInput label="First Name">
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="given-name"
        />
      </CustomInput>

      <CustomInput label="Middle Name (optional)">
        <Input
          id="middleName"
          name="middleName"
          type="text"
          placeholder="Enter your middle name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          autoComplete="additional-name"
        />
      </CustomInput>

      <CustomInput label="Last Name">
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="family-name"
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

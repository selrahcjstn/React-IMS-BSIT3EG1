import "./edit-profile.css"
import { FiAlertCircle, FiCheck, FiX } from "react-icons/fi"

function EditProfileForm({
  formData,
  isSaving,
  hasChanges,
  saveError,
  purposeOptions,
  onChange,
  onCancel,
  onSave
}) {
  return (
    <form
      className="account-settings__edit-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="account-settings__form-section">
        <h3 className="account-settings__form-section-title">Personal Details</h3>

        <div className="account-settings__form-group">
          <label htmlFor="email" className="account-settings__form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="account-settings__input"
            value={formData.email}
            disabled
            title="Email cannot be changed"
          />
        </div>

        <div className="account-settings__form-row">
          <div className="account-settings__form-group">
            <label htmlFor="firstName" className="account-settings__form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="account-settings__input"
              value={formData.firstName}
              onChange={onChange}
              placeholder="e.g., John"
              disabled={isSaving}
            />
          </div>

          <div className="account-settings__form-group">
            <label htmlFor="lastName" className="account-settings__form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="account-settings__input"
              value={formData.lastName}
              onChange={onChange}
              placeholder="e.g., Doe"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="account-settings__form-group">
          <label htmlFor="middleName" className="account-settings__form-label">
            Middle Name <span className="account-settings__optional">(Optional)</span>
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            className="account-settings__input"
            value={formData.middleName}
            onChange={onChange}
            placeholder="e.g., A."
            disabled={isSaving}
          />
        </div>
      </div>

      <div className="account-settings__form-section">
        <h3 className="account-settings__form-section-title">Preferences</h3>
        <div className="account-settings__form-group">
          <label htmlFor="purpose" className="account-settings__form-label">
            Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            className="account-settings__select"
            value={formData.purpose}
            onChange={onChange}
            disabled={isSaving}
          >
            {purposeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {saveError && (
        <div className="account-settings__alert account-settings__alert--error">
          <FiAlertCircle />
          {saveError}
        </div>
      )}

      <div className="account-settings__form-actions">
        <button
          type="button"
          className="account-settings__btn-cancel"
          onClick={onCancel}
          disabled={isSaving}
        >
          <FiX /> Cancel
        </button>
        <button
          type="button"
          className="account-settings__btn-save"
          onClick={onSave}
          disabled={isSaving || !hasChanges}
          title={!hasChanges ? "No changes to save" : "Save changes"}
        >
          <FiCheck /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}

export default EditProfileForm
import "./profile-card.css"
import { FiEdit2 } from "react-icons/fi"

function ProfileCard({ 
  getInitials, 
  computedDisplayName, 
  email, 
  purpose, 
  purposeOptions, 
  isEditing, 
  onEdit 
}) {
  return (
    <div className="account-settings__profile-section">
      <div className="account-settings__avatar-wrapper">
        <div className="account-settings__avatar-initials">
          {getInitials()}
        </div>
      </div>

      <div className="account-settings__profile-info">
        <h2 className="account-settings__profile-name">{computedDisplayName()}</h2>
        <p className="account-settings__profile-email">{email}</p>
        <p className="account-settings__profile-purpose">
          {purposeOptions.find(opt => opt.value === purpose)?.label}
        </p>
      </div>

      {!isEditing && (
        <button
          className="account-settings__btn-edit-main"
          onClick={onEdit}
          title="Edit account settings"
          type="button"
        >
          <FiEdit2 /> Edit Profile
        </button>
      )}
    </div>
  )
}

export default ProfileCard
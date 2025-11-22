import "./profile-card.css"
import { FiEdit2 } from "react-icons/fi"
const AVATAR_COUNT = 10

function ProfileCard({
  getInitials,
  computedDisplayName,
  email,
  purpose,
  purposeOptions,
  isEditing,
  onEdit,
  avatarId,        // 1–10 or null
  onAvatarChange,  // function(id: number)
  firstName        // <- Pass this prop from parent!
}) {
  // If avatarId === 10, show first letter of firstName as "avatar"
  const showInitial = avatarId === 10

  const avatarSrc = !showInitial && avatarId
    ? new URL(
        `../../../../assets/avatar/${avatarId}.png`,
        import.meta.url
      ).href
    : null

  const displayAvatarInitial = (firstName || "").charAt(0).toUpperCase()

  const handleAvatarClick = (id) => {
    if (!isEditing) return
    if (typeof onAvatarChange === "function") {
      onAvatarChange(id)
    }
  }

  return (
    <div className="account-settings__profile-section">
      <div className="account-settings__avatar-wrapper">
        {showInitial ? (
          <div className="account-settings__avatar-initials">
            {displayAvatarInitial}
          </div>
        ) : avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Profile avatar"
            className="account-settings__avatar-image"
          />
        ) : (
          <div className="account-settings__avatar-initials">
            {getInitials()}
          </div>
        )}
      </div>

      <div className="account-settings__profile-info">
        <h2 className="account-settings__profile-name">
          {computedDisplayName()}
        </h2>
        <p className="account-settings__profile-email">{email}</p>
        <p className="account-settings__profile-purpose">
          {purposeOptions.find((opt) => opt.value === purpose)?.label}
        </p>
        {isEditing && (
          <div className="account-settings__avatar-picker">
            <p className="account-settings__avatar-picker-label">
              Choose an avatar
            </p>
            <div className="account-settings__avatar-grid">
              {/* Display picker as before; add option for avatarId 10 */}
              {Array.from({ length: AVATAR_COUNT }, (_, i) => {
                const id = i + 1
                const src = id !== 10
                  ? new URL(
                      `../../../../assets/avatar/${id}.png`,
                      import.meta.url
                    ).href
                  : null // No image for id 10

                const isSelected = avatarId === id
                return (
                  <button
                    key={id}
                    type="button"
                    className={`account-settings__avatar-option ${
                      isSelected
                        ? "account-settings__avatar-option--selected"
                        : ""
                    }`}
                    onClick={() => handleAvatarClick(id)}
                  >
                    {id === 10
                      ? <span className="account-settings__avatar-option-initial">{displayAvatarInitial}</span>
                      : <img
                          src={src}
                          alt={`Avatar ${id}`}
                          className="account-settings__avatar-option-image"
                        />
                    }
                  </button>
                )
              })}
            </div>
          </div>
        )}
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
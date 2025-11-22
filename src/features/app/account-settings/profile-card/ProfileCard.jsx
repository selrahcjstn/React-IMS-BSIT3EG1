import "./profile-card.css"
import { FiEdit2 } from "react-icons/fi"

const AVATAR_COUNT = 9

function ProfileCard({
  computedDisplayName,
  email,
  purpose,
  purposeOptions,
  isEditing,
  onEdit,
  avatarId,
  onAvatarChange,
}) {
  const currentAvatarId = avatarId != null ? Number(avatarId) : null

  const avatarSrc = currentAvatarId
    ? new URL(
        `../../../../assets/avatar/${currentAvatarId}.png`,
        import.meta.url
      ).href
    : null

  const handleAvatarClick = (id) => {
    if (!isEditing) return
    if (typeof onAvatarChange === "function") {
      onAvatarChange(id)
    }
  }

  return (
    <div className="account-settings__profile-section">
      <div className="account-settings__avatar-wrapper">
        {avatarSrc && (
          <img
            src={avatarSrc}
            alt="Profile avatar"
            className="account-settings__avatar-image"
          />
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
              {Array.from({ length: AVATAR_COUNT }, (_, i) => {
                const id = i + 1
                const src = new URL(
                  `../../../../assets/avatar/${id}.png`,
                  import.meta.url
                ).href
                const isSelected = currentAvatarId === id

                return (
                  <button
                    key={id}
                    type="button"
                    className={`account-settings__avatar-option ${
                      isSelected ? "account-settings__avatar-option--selected" : ""
                    }`}
                    onClick={() => handleAvatarClick(id)}
                  >
                    <img
                      src={src}
                      alt={`Avatar ${id}`}
                      className="account-settings__avatar-option-image"
                    />
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

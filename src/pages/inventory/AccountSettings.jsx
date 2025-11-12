import React, { useEffect, useMemo, useState } from "react"
import { FiEdit2, FiCheck, FiX, FiLock, FiAlertCircle, FiInfo } from "react-icons/fi"
import { useAuth } from "../../context/AuthContext"
import { ref, onValue, update } from "firebase/database"
import { database, auth } from "../../firebase/config"
import { updateProfile, sendPasswordResetEmail } from "firebase/auth"
import "./account-settings.css"

function AccountSettings() {
  const { currentUser, uid, email, setUserDisplayName, refreshUser } = useAuth()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [resetPasswordSent, setResetPasswordSent] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [resetPasswordError, setResetPasswordError] = useState("")

  const [formData, setFormData] = useState({
    email: email || "",
    firstName: "",
    lastName: "",
    middleName: "",
    purpose: "organize-business",
    uid: uid || "",
    updatedAt: null
  })
  const [originalData, setOriginalData] = useState(formData)

  const userRef = useMemo(() => (uid ? ref(database, `users/${uid}`) : null), [uid])

  useEffect(() => {
    if (!uid || !userRef) return
    const unsub = onValue(userRef, (snap) => {
      const data = snap.val() || {}
      const next = {
        email: data.email || email || currentUser?.email || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        middleName: data.middleName || "",
        purpose: data.purpose || "organize-business",
        uid: uid,
        updatedAt: data.updatedAt || null
      }
      setFormData(next)
      setOriginalData(next)
      setLoadingProfile(false)
    })
    return () => unsub()
  }, [uid, userRef, email, currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setOriginalData(formData)
    setIsEditing(true)
    setSaveError("")
  }

  const handleCancel = () => {
    setFormData(originalData)
    setIsEditing(false)
    setSaveError("")
  }

  const handleSave = async () => {
    if (!uid || !userRef) return
    setIsSaving(true)
    setSaveError("")
    try {
      const displayNameSource = `${(formData.firstName || "").trim()} ${(formData.lastName || "").trim()}`.trim()
      const newDisplayName = displayNameSource || formData.email || "User"

      const payload = {
        email: formData.email,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        middleName: formData.middleName || "",
        purpose: formData.purpose || "organize-business",
        uid,
        updatedAt: Date.now()
      }

      await update(userRef, payload)

      if (auth.currentUser) {
        if (typeof setUserDisplayName === "function") {
          await setUserDisplayName(newDisplayName)
        } else {
          await updateProfile(auth.currentUser, { displayName: newDisplayName })
          if (typeof refreshUser === "function") {
            await refreshUser()
          } else {
            await auth.currentUser.reload()
          }
        }
      }

      setFormData(payload)
      setOriginalData(payload)
      setIsEditing(false)
    } catch (err) {
      setSaveError(err?.message || "Failed to save changes.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setResetPasswordError("Email not found")
      return
    }
    
    setIsResettingPassword(true)
    setResetPasswordError("")
    setResetPasswordSent(false)
    
    try {
      await sendPasswordResetEmail(auth, email)
      setResetPasswordSent(true)
      setTimeout(() => setResetPasswordSent(false), 6000)
    } catch (err) {
      setResetPasswordError(err?.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsResettingPassword(false)
    }
  }

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)

  const getInitials = () => {
    const f = (formData.firstName || "").trim()
    const l = (formData.lastName || "").trim()
    if (f || l) return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase()
    return (formData.email?.charAt(0) || "U").toUpperCase()
  }

  const computedDisplayName = () => {
    const f = (formData.firstName || "").trim()
    const l = (formData.lastName || "").trim()
    const name = `${f} ${l}`.trim()
    return name || formData.email || "User"
  }

  const formatUpdatedAt = () => {
    if (!formData.updatedAt) return "-"
    const d = new Date(formData.updatedAt)
    if (isNaN(d.getTime())) return "-"
    return d.toLocaleString()
  }

  const purposeOptions = [
    { value: "organize-business", label: "Organize Business" },
    { value: "manage-inventory", label: "Manage Inventory" },
    { value: "track-products", label: "Track Products" },
    { value: "other", label: "Other" }
  ]

  if (!currentUser) {
    return (
      <div className="account-settings">
        <div className="account-settings__wrapper">
          <div className="account-settings__header">
            <h1 className="account-settings__title">Account Settings</h1>
            <p className="account-settings__subtitle">Please sign in to manage your account.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loadingProfile) {
    return (
      <div className="account-settings">
        <div className="account-settings__wrapper">
          <div className="account-settings__header">
            <h1 className="account-settings__title">Account Settings</h1>
            <p className="account-settings__subtitle">Loading your profile...</p>
          </div>
          <div className="account-settings__content">
            <div className="account-settings__card" style={{ minHeight: 200 }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="account-settings">
      <div className="account-settings__wrapper">
        <div className="account-settings__header">
          <h1 className="account-settings__title">Account Settings</h1>
          <p className="account-settings__subtitle">Manage your profile and account security</p>
        </div>

        <div className="account-settings__content">
          {/* Profile Card */}
          <div className="account-settings__card">
            <div className="account-settings__profile-section">
              <div className="account-settings__avatar-wrapper">
                <div className="account-settings__avatar-initials">
                  {getInitials()}
                </div>
              </div>

              <div className="account-settings__profile-info">
                <h2 className="account-settings__profile-name">{computedDisplayName()}</h2>
                <p className="account-settings__profile-email">{formData.email}</p>
                <p className="account-settings__profile-purpose">
                  {purposeOptions.find(opt => opt.value === formData.purpose)?.label}
                </p>
              </div>

              {!isEditing && (
                <button
                  className="account-settings__btn-edit-main"
                  onClick={handleEdit}
                  title="Edit account settings"
                  type="button"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <>
                <div className="account-settings__details-section">
                  <div className="account-settings__details-header">
                    <h3 className="account-settings__details-title">Account Information</h3>
                  </div>
                  <div className="account-settings__details-grid">
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Email</span>
                      <span className="account-settings__detail-value">{formData.email}</span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">First Name</span>
                      <span className="account-settings__detail-value">{formData.firstName || "-"}</span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Last Name</span>
                      <span className="account-settings__detail-value">{formData.lastName || "-"}</span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Middle Name</span>
                      <span className="account-settings__detail-value">{formData.middleName || "-"}</span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Purpose</span>
                      <span className="account-settings__detail-value">
                        {purposeOptions.find(opt => opt.value === formData.purpose)?.label}
                      </span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Last Updated</span>
                      <span className="account-settings__detail-value">{formatUpdatedAt()}</span>
                    </div>
                    <div className="account-settings__detail-item">
                      <span className="account-settings__detail-label">Status</span>
                      <span className="account-settings__detail-value account-settings__status-active">
                        Active
                      </span>
                    </div>
                  </div>
                  {saveError && (
                    <div className="account-settings__alert account-settings__alert--error">
                      <FiAlertCircle />
                      {saveError}
                    </div>
                  )}
                </div>

                {/* Reset Password Section */}
                <div className="account-settings__reset-password-section">
                  <div className="account-settings__reset-password-header">
                    <div className="account-settings__reset-password-left">
                      <h3 className="account-settings__reset-password-label">Reset Password</h3>
                      <p className="account-settings__reset-password-description">
                        Update your password to keep your account secure.
                        {currentUser?.providerData?.some(p => p.providerId === 'google.com') && (
                          <>
                            {' '}If you signed up with Google, you can reset your password here to enable email/password login alongside your Google login.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="account-settings__reset-password-right">
                      <button
                        type="button"
                        className="account-settings__btn-reset-password"
                        onClick={handleResetPassword}
                        disabled={isResettingPassword || resetPasswordSent}
                        title="Send password reset email to your account"
                      >
                        <FiLock />
                        {isResettingPassword ? "Sending..." : resetPasswordSent ? "Email Sent" : "Reset Password"}
                      </button>
                    </div>
                  </div>

                  {resetPasswordError && (
                    <div className="account-settings__alert account-settings__alert--error">
                      <FiAlertCircle />
                      <span>{resetPasswordError}</span>
                    </div>
                  )}

                  {resetPasswordSent && (
                    <div className="account-settings__alert account-settings__alert--success">
                      <FiCheck />
                      <span>Password reset email sent! Check your inbox and follow the instructions to reset your password.</span>
                    </div>
                  )}

                  <div className="account-settings__security-info-box">
                    <FiInfo className="account-settings__info-icon" />
                    <div>
                      <p className="account-settings__info-text">
                        <strong>How it works:</strong> We'll send a password reset link to your email address. Click the link to set a new password. You can then use this password to log in along with your existing authentication method.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <FiX /> Cancel
                  </button>
                  <button
                    type="button"
                    className="account-settings__btn-save"
                    onClick={handleSave}
                    disabled={isSaving || !hasChanges}
                    title={!hasChanges ? "No changes to save" : "Save changes"}
                  >
                    <FiCheck /> {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
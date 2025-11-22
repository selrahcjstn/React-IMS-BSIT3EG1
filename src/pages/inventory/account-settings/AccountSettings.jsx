import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { ref, update } from "firebase/database"
import { database, auth } from "../../../firebase/config"
import { updateProfile, sendPasswordResetEmail } from "firebase/auth"
import ProfileCard from "../../../features/app/account-settings/profile-card/ProfileCard"
import AccountDetailsSection from "../../../features/app/account-settings/account-details/AccountDetailsSection"
import ResetPasswordSection from "../../../features/app/account-settings/reset-password/ResetPassword"
import EditProfileForm from "../../../features/app/account-settings/edit-profile/EditProfileForm"
import "./account-settings.css"
import Header from "../../../components/inventory/header/Header"

function AccountSettings() {
  const {
    currentUser,
    uid,
    email,
    profile,
    avatarId: contextAvatarId,
    setAvatarId: setContextAvatarId,
    setUserDisplayName,
    refreshUser,
  } = useAuth()

  const [loadingProfile, setLoadingProfile] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [resetPasswordSent, setResetPasswordSent] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [resetPasswordError, setResetPasswordError] = useState("")

  // Accept avatarId 10 as meaning "first letter of first name"
  const initialAvatarId = profile?.avatarId !== undefined
    ? profile.avatarId
    : contextAvatarId !== undefined
      ? contextAvatarId
      : 10

  const [formData, setFormData] = useState({
    email: email || "",
    firstName: "",
    lastName: "",
    middleName: "",
    purpose: "organize-business",
    uid: uid || "",
    updatedAt: null,
    avatarId: initialAvatarId,
  })
  const [originalData, setOriginalData] = useState(formData)

  useEffect(() => {
    if (!profile && !currentUser) return

    const next = {
      email: profile?.email || email || currentUser?.email || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      middleName: profile?.middleName || "",
      purpose: profile?.purpose || "organize-business",
      uid: uid || "",
      updatedAt: profile?.updatedAt || null,
      avatarId:
        profile?.avatarId !== undefined
          ? profile.avatarId
          : contextAvatarId !== undefined
            ? contextAvatarId
            : 10,
    }

    setFormData(next)
    setOriginalData(next)
    setLoadingProfile(false)
  }, [profile, email, currentUser, uid, contextAvatarId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (id) => {
    setFormData(prev => ({ ...prev, avatarId: id }))
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
    if (!uid) return
    const userRef = ref(database, `users/${uid}`)

    setIsSaving(true)
    setSaveError("")

    try {
      const displayNameSource = `${(formData.firstName || "").trim()} ${(formData.lastName || "").trim()}`.trim()
      const newDisplayName = displayNameSource || formData.email || "User"

      // If avatarId not set, default to 10 for initial avatar (show first letter)
      let avatarId = formData.avatarId
      if (avatarId === null || avatarId === undefined) {
        avatarId = 10
      }

      const payload = {
        email: formData.email,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        middleName: formData.middleName || "",
        purpose: formData.purpose || "organize-business",
        uid,
        updatedAt: Date.now(),
        avatarId,
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

      // Optimistically update context so Sidebar updates immediately
      if (typeof setContextAvatarId === "function") {
        setContextAvatarId(avatarId)
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
    { value: "other", label: "Other" },
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
    <div className="account-settings container">
      <div className="account-settings__wrapper">
        <div className="account-settings__header">
          <Header
            title="Account Settings"
            subtitle="Manage your profile and account security"
          />
        </div>

        <div className="account-settings__content">
          <div className="account-settings__card">
            <ProfileCard
              getInitials={getInitials}
              computedDisplayName={computedDisplayName}
              email={formData.email}
              purpose={formData.purpose}
              purposeOptions={purposeOptions}
              isEditing={isEditing}
              onEdit={handleEdit}
              avatarId={formData.avatarId}
              onAvatarChange={handleAvatarChange}
              firstName={formData.firstName}
            />

            {!isEditing ? (
              <>
                <AccountDetailsSection
                  formData={formData}
                  purposeOptions={purposeOptions}
                  formatUpdatedAt={formatUpdatedAt}
                  saveError={saveError}
                />

                <ResetPasswordSection
                  currentUser={currentUser}
                  email={email}
                  isResettingPassword={isResettingPassword}
                  resetPasswordSent={resetPasswordSent}
                  resetPasswordError={resetPasswordError}
                  onResetPassword={handleResetPassword}
                />
              </>
            ) : (
              <EditProfileForm
                formData={formData}
                isSaving={isSaving}
                hasChanges={hasChanges}
                saveError={saveError}
                purposeOptions={purposeOptions}
                onChange={handleChange}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
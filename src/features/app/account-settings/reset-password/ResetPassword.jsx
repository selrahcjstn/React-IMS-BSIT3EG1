import { FiLock, FiAlertCircle, FiCheck, FiInfo } from "react-icons/fi"
import "./reset-password.css"
function ResetPasswordSection({
  currentUser,
  isResettingPassword,
  resetPasswordSent,
  resetPasswordError,
  onResetPassword
}) {
  return (
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
            onClick={onResetPassword}
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
  )
}

export default ResetPasswordSection
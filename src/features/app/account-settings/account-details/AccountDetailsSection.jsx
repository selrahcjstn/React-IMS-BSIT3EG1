import "./account-details.css"
import { FiAlertCircle } from "react-icons/fi"

function AccountDetailsSection({ 
  formData, 
  purposeOptions, 
  formatUpdatedAt, 
  saveError 
}) {
  return (
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
  )
}

export default AccountDetailsSection
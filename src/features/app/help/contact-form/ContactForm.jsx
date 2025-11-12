export function ContactForm({ loading, onSubmit, currentDate, currentTime, userLogin }) {
  return (
    <div className="contact-form">
      <div className="contact-form__header">
        <h3 className="contact-form__title">Send us an Email</h3>
        <p className="contact-form__subtitle">Our team will respond within 24 hours</p>
      </div>

      <div className="contact-form__details">
        <div className="contact-form__row">
          <span className="contact-form__label">User</span>
          <span className="contact-form__value">{userLogin}</span>
        </div>
        <div className="contact-form__row">
          <span className="contact-form__label">Date</span>
          <span className="contact-form__value">{currentDate}</span>
        </div>
        <div className="contact-form__row">
          <span className="contact-form__label">Time (UTC)</span>
          <span className="contact-form__value">{currentTime}</span>
        </div>
        <div className="contact-form__row">
          <span className="contact-form__label">Email</span>
          <span className="contact-form__value">support@inventory.local</span>
        </div>
      </div>

      <button className="contact-form__button" onClick={onSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Email Request"}
      </button>
    </div>
  )
}
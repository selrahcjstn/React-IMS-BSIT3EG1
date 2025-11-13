import { useState } from "react"
import { FiMail, FiLock, FiSettings, FiHelpCircle } from "react-icons/fi"
import { FaqItem } from "../../../features/app/help/faq-item/FaqItem"
import { ContactForm } from "../../../features/app/help/contact-form/ContactForm"
import { QuickTips } from "../../../features/app/help/quick-tips/QuickTips"
import { DirectContact } from "../../../features/app/help/direct-contact/DirectContact"
import "./help.css"
import Header from "../../../components/inventory/header/Header"

function Help() {
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(false)

  const currentDate = "2025-11-12"
  const currentTime = "07:17:47"
  const userLogin = "selrahcjstn"

  const faqs = [
    {
      id: "feature",
      icon: FiSettings,
      title: "Request a Feature",
      description: "Have an idea to improve our app?"
    },
    {
      id: "email",
      icon: FiMail,
      title: "Change Your Email",
      description: "Update your account email address"
    },
    {
      id: "recovery",
      icon: FiLock,
      title: "Account Recovery",
      description: "Regain access to your account"
    },
    {
      id: "other",
      icon: FiHelpCircle,
      title: "Other Inquiries",
      description: "General questions and support"
    }
  ]

  const tips = [
    "Check your email for confirmation links",
    "Responses usually arrive within 24 hours",
    "Keep your email updated",
    "Include details for faster resolution"
  ]

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const handleSendEmail = async () => {
    setLoading(true)

    try {
      const emailBody = `
User: ${userLogin}
Date: ${currentDate} ${currentTime} UTC

Support Request
      `.trim()

      const mailtoLink = `mailto:support@inventory.local?subject=Support Request&body=${encodeURIComponent(emailBody)}`
      
      window.location.href = mailtoLink
    } catch (error) {
      alert("Error sending email", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="help container">
      <div className="help__header">
        <Header title="Help & Support" subtitle="Find answers to common questions or contact our support team." />
      </div>

      <div className="help__container">
        <div className="help__main">
          <section className="help__section">
            <h2 className="help__section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  id={faq.id}
                  icon={faq.icon}
                  title={faq.title}
                  description={faq.description}
                  isExpanded={expanded === faq.id}
                  onToggle={handleExpand}
                />
              ))}
            </div>
          </section>

          <section className="help__section">
            <h2 className="help__section-title">Contact Support</h2>
            <ContactForm
              loading={loading}
              onSubmit={handleSendEmail}
              currentDate={currentDate}
              currentTime={currentTime}
              userLogin={userLogin}
            />
          </section>
        </div>

        <aside className="help__sidebar">
          <section className="help__section">
            <h2 className="help__section-title">Quick Tips</h2>
            <QuickTips tips={tips} />
          </section>

          <section className="help__section">
            <h2 className="help__section-title">Direct Contact</h2>
            <DirectContact email="support@inventory.local" />
          </section>
        </aside>
      </div>
    </div>
  )
}

export default Help
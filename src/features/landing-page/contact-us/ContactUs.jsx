import { useState } from "react";
import "./contact-us.css";
import { FaChevronDown, FaEnvelope, FaClock, FaHeadset } from "react-icons/fa";

function ContactUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is IMS Online?",
      a: "IMS Online is a lightweight inventory management system designed to help you track stock, manage categories, and monitor activity with ease.",
    },
    {
      q: "How do I reset my password?",
      a: "On the login page, click \"Forgot password\" and follow the instructions. You'll receive an email with a link to create a new password.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use secure authentication and HTTPS. Only authorized users can access your workspace data.",
    },
    {
      q: "Can I request a feature?",
      a: "Absolutely. Send your request to the developer email below and include a short description of the use case.",
    },
    {
      q: "Who do I contact for help?",
      a: "Use the developer contact below. Please include screenshots or steps to reproduce if you're reporting an issue.",
    },
  ];

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="contactdev container">
      <header className="contactdev__header">
        <div className="contactdev__badge">Support & FAQ</div>
        <h1 className="contactdev__title">Get Help & Support</h1>
        <p className="contactdev__subtitle">
          Have questions? Check our FAQ's below or reach out directly to our developer.
        </p>
      </header>

      <div className="contactdev__cards">
        <div className="contactdev__card">
          <div className="contactdev__icon">
            <FaEnvelope />
          </div>
          <h3 className="contactdev__card-title">Email Support</h3>
          <p className="contactdev__card-text">
            Reach out directly for any inquiries or issues
          </p>
          <a href="mailto:charlesjustinemantes.main@gmail.com" className="contactdev__link">
          </a>
        </div>

        <div className="contactdev__card">
          <div className="contactdev__icon">
            <FaClock />
          </div>
          <h3 className="contactdev__card-title">Response Time</h3>
          <p className="contactdev__card-text">
            We typically respond within 24-48 hours
          </p>
          <span className="contactdev__badge-small">Mon-Fri, 9AM-5PM</span>
        </div>

        <div className="contactdev__card">
          <div className="contactdev__icon">
            <FaHeadset />
          </div>
          <h3 className="contactdev__card-title">Support Priority</h3>
          <p className="contactdev__card-text">
            Include details for faster resolution
          </p>
          <span className="contactdev__badge-small">Fast Track Support</span>
        </div>
      </div>

      <section className="faq">
        <div className="faq__header">
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <p className="faq__subtitle">
            Find answers to common questions about IMS Online
          </p>
        </div>

        <ul className="faq__list">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <li className={`faq__item ${open ? "is-open" : ""}`} key={i}>
                <button
                  className="faq__question"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="faq__q-text">{item.q}</span>
                  <FaChevronDown className={`faq__chevron ${open ? "is-open" : ""}`} />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="faq__answer"
                  role="region"
                  aria-hidden={!open}
                >
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="contactdev__cta">
        <h2>Still have questions?</h2>
        <p>Don't hesitate to reach out. We're here to help!</p>
        <a href="mailto:charlesjustinemantes.main@gmail.com" className="contactdev__cta-btn">
          Send Email Now
        </a>
      </div>
    </section>
  );
}

export default ContactUs;
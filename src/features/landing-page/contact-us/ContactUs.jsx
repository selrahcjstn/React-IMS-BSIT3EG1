import { useState } from "react";
import "./contact-us.css";
import { FaChevronDown, FaEnvelope, FaLightbulb } from "react-icons/fa";

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
      a: "Absolutely. Send your request and include a short description of the use case.",
    },
    {
      q: "Who do I contact for help?",
      a: "Use the contact button below. Please include screenshots or steps to reproduce if you're reporting an issue.",
    },
  ];

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="contact" className="faq-section">
      <div className="container">
        <div className="faq__header">
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <p className="faq__subtitle">Find answers to common questions about IMS Online</p>
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

        {/* CTA Section */}
        <div className="faq__cta">
          <div className="faq__cta-icon">
            <FaLightbulb />
          </div>
          <h3 className="faq__cta-title">Still have a question?</h3>
          <p className="faq__cta-subtitle">
            Can't find what you're looking for? We're here to help! Get in touch with us and we'll be happy to assist.
          </p>
          <button className="faq__contact-btn">
            <FaEnvelope className="faq__contact-icon" />
            <span>Send Email</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
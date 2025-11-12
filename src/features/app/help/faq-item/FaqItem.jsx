import { FiChevronDown } from "react-icons/fi"

export function FaqItem({ id, icon: IconComponent, title, description, isExpanded, onToggle }) {
  return (
    <div className={`faq-item ${isExpanded ? "faq-item--expanded" : ""}`}>
      <button className="faq-item__trigger" onClick={() => onToggle(id)}>
        <div className="faq-item__left">
          <div className="faq-item__icon">
            {IconComponent ? <IconComponent size={18} /> : null}
          </div>
          <div className="faq-item__text">
            <h3 className="faq-item__title">{title}</h3>
            <p className="faq-item__description">{description}</p>
          </div>
        </div>
        <FiChevronDown className={`faq-item__chevron ${isExpanded ? "faq-item__chevron--open" : ""}`} size={18} />
      </button>

      {isExpanded && (
        <div className="faq-item__content">
          <p className="faq-item__text-content">Submit your {title.toLowerCase()} and we'll get back to you within 24 hours with a response.</p>
        </div>
      )}
    </div>
  )
}
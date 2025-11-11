import "./empty-state.css";

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonAriaLabel,
  onButtonClick
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon">
          <img
            src={icon}
            alt={title}
            width={120}
            height={120}
          />
        </div>
        <h3 className="empty-state__title">{title}</h3>
        <p className="empty-state__description">{description}</p>
        <button
          className="empty-state__btn"
          onClick={onButtonClick}
          type="button"
          aria-label={buttonAriaLabel}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
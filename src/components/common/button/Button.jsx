import { useState } from 'react'
import './button.css'

function Button({
  label,
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  type = 'button',
  title,
  ariaLabel,
  fullWidth = false,
  children
}) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      setIsActive(true)
      onClick(e)
      setTimeout(() => setIsActive(false), 200)
    }
  }

  const buttonClass = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--loading': loading,
      'button--disabled': disabled,
      'button--full-width': fullWidth,
      'button--active': isActive,
      'button--with-icon': Icon || children
    },
    className
  ]
    .filter(Boolean)
    .join(' ')

  const iconElement = Icon ? <Icon className="button__icon" aria-hidden="true" /> : null

  return (
    <button
      onClick={handleClick}
      className={buttonClass}
      disabled={disabled || loading}
      type={type}
      title={title}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="button__loader"></span>
          <span className="button__label">{label}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && iconElement}
          <span className="button__label">{label}</span>
          {Icon && iconPosition === 'right' && iconElement}
          {children}
        </>
      )}
    </button>
  )
}

export default Button
export function DirectContact({ email }) {
  return (
    <div className="direct-contact">
      <p className="direct-contact__text">For urgent matters:</p>
      <a href={`mailto:${email}`} className="direct-contact__link">
        {email}
      </a>
    </div>
  )
}
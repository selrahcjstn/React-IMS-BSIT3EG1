import "./error.css";

function ErrorMessage({ error }) {
  return (
    <p className="error">{error}</p>
  )
}

export default ErrorMessage
import { Link } from "react-router-dom"
import "./form-helper.css"
function FormHelper({label, to, question}) {
  return (
    <div className="helper">
        <p>
          {question}{" "}
          <Link className="helper__link" to={to}>
            {label}  
          </Link>
        </p>
      </div>
  )
}

export default FormHelper
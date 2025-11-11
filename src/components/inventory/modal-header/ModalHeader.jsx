import { FiX, FiArrowLeft } from "react-icons/fi";
import "./modal-header.css";
function ModalHeader({ title, onBack, onClose }) {
  return (
    <div className="modal-header">
      <button 
        className="modal-header__back-btn" 
        onClick={onBack} 
        aria-label="Go back"
        type="button"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>
      <h2 className="modal-header__title">{title}</h2>
      <button 
        className="modal-header__close-btn" 
        onClick={onClose} 
        aria-label="Close modal" 
        type="button"
      >
        <FiX />
      </button>
    </div>
  );
}

export default ModalHeader;
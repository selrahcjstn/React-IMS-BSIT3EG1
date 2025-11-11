import { FiX } from "react-icons/fi";

function ModalHeader({ title, onClose }) {
  return (
    <div className="modal-header">
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
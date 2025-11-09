import { FiArrowLeft } from "react-icons/fi";
import "./add-new-item-header.css";

function AddNewItemHeader({ onBack, inventoryName }) {
  return (
    <div className="add-new-item__header">
      <button
        className="add-new-item__back-btn"
        onClick={onBack}
        aria-label="Go back"
      >
        <FiArrowLeft />
      </button>
      <div className="add-new-item__header-content">
        <h1 className="add-new-item__title">Add New Item</h1>
        <p className="add-new-item__subtitle">
          Add an item to inventory <strong>{inventoryName || "-"}</strong>
        </p>
      </div>
    </div>
  );
}

export default AddNewItemHeader;
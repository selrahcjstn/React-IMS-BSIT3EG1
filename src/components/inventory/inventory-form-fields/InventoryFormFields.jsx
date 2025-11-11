  import "./inventory-form-fields.css";

function InventoryFormFields({ formData, errors, isSubmitting, onChange, maxNameLength = 50, maxDescriptionLength = 500 }) {
  const categories = [
    "Electronics",
    "Furniture",
    "Office Supplies",
    "Tools",
    "Clothing",
    "Food & Beverages",
    "Chemicals",
    "Pharmaceuticals",
    "Raw Materials",
    "Finished Goods",
    "Other",
  ];

  const nameLength = formData.name.length;
  const descriptionLength = formData.description.length;
  const nameWarning = nameLength > maxNameLength * 0.9;
  const descriptionWarning = descriptionLength > maxDescriptionLength * 0.9;

  return (
    <>
      <div className="new-inventory-modal__form-group">
        <div className="new-inventory-modal__label-row">
          <label htmlFor="name" className="new-inventory-modal__label">
            Inventory Name{" "}
            <span className="new-inventory-modal__required">*</span>
          </label>
          <span className={`new-inventory-modal__char-count ${nameWarning ? 'warning' : ''}`}>
            {nameLength}/{maxNameLength}
          </span>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          className={`new-inventory-modal__input ${
            errors.name ? "new-inventory-modal__input--error" : ""
          }`}
          placeholder="e.g., Main Warehouse"
          value={formData.name}
          onChange={onChange}
          disabled={isSubmitting}
          maxLength={maxNameLength}
        />
        {errors.name && (
          <span className="new-inventory-modal__error">{errors.name}</span>
        )}
      </div>

      <div className="new-inventory-modal__form-group">
        <label htmlFor="category" className="new-inventory-modal__label">
          Category <span className="new-inventory-modal__required">*</span>
        </label>
        <select
          id="category"
          name="category"
          className={`new-inventory-modal__select ${
            errors.category ? "new-inventory-modal__select--error" : ""
          }`}
          value={formData.category}
          onChange={onChange}
          disabled={isSubmitting}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="new-inventory-modal__error">
            {errors.category}
          </span>
        )}
      </div>

      <div className="new-inventory-modal__form-group">
        <div className="new-inventory-modal__label-row">
          <label htmlFor="description" className="new-inventory-modal__label">
            Description
          </label>
          <span className={`new-inventory-modal__char-count ${descriptionWarning ? 'warning' : ''}`}>
            {descriptionLength}/{maxDescriptionLength}
          </span>
        </div>
        <textarea
          id="description"
          name="description"
          className="new-inventory-modal__textarea"
          placeholder="Enter description (optional)"
          value={formData.description}
          onChange={onChange}
          rows={3}
          disabled={isSubmitting}
          maxLength={maxDescriptionLength}
        />
      </div>
    </>
  );
}

export default InventoryFormFields;
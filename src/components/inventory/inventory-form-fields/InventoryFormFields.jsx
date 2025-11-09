function InventoryFormFields({ formData, errors, isSubmitting, onChange }) {
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

  return (
    <>
      {/* Inventory Name */}
      <div className="new-inventory-modal__form-group">
        <label htmlFor="name" className="new-inventory-modal__label">
          Inventory Name{" "}
          <span className="new-inventory-modal__required">*</span>
        </label>
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
        />
        {errors.name && (
          <span className="new-inventory-modal__error">{errors.name}</span>
        )}
      </div>

      {/* Category */}
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

      {/* Description */}
      <div className="new-inventory-modal__form-group">
        <label htmlFor="description" className="new-inventory-modal__label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="new-inventory-modal__textarea"
          placeholder="Enter description (optional)"
          value={formData.description}
          onChange={onChange}
          rows={3}
          disabled={isSubmitting}
        />
      </div>
    </>
  );
}

export default InventoryFormFields;
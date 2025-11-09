

function EditItemForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onDimensionTypeChange,
  onSubmit,
  onCancel,
  calculateTotal,
}) {
  const handleNumericInput = (e) => {
    const { value } = e.target;
    if (value === "" || /^\d+(\.\d{0,4})?$/.test(value)) {
      onChange(e);
    }
  };

  return (
    <div className="add-new-item__content">
      <form className="add-new-item__form" onSubmit={onSubmit}>
        <section className="add-new-item__section">
          <h2 className="add-new-item__section-title">Item Information</h2>
          <div className="add-new-item__form-group">
            <label htmlFor="title" className="add-new-item__label">
              Item Title <span className="add-new-item__required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`add-new-item__input ${
                errors.title ? "add-new-item__input--error" : ""
              }`}
              placeholder="e.g., Laptop Stand"
              value={formData.title}
              onChange={onChange}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span className="add-new-item__error">{errors.title}</span>
            )}
          </div>
        </section>

        <section className="add-new-item__section">
          <h2 className="add-new-item__section-title">Dimensions (Optional)</h2>
          <div className="add-new-item__dimension-tabs">
            {["single", "2x", "3x"].map(t => (
              <button
                key={t}
                type="button"
                className={`add-new-item__dimension-tab ${
                  formData.dimensionType === t
                    ? "add-new-item__dimension-tab--active"
                    : ""
                }`}
                onClick={() => onDimensionTypeChange(t)}
                disabled={isSubmitting}
              >
                {t === "single" ? "Single Dimension" : t === "2x" ? "2x Dimensions" : "3x Dimensions"}
              </button>
            ))}
          </div>

            {formData.dimensionType === "single" && (
              <div className="add-new-item__form-group">
                <label htmlFor="dimension1" className="add-new-item__label">
                  Dimension
                </label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension1"
                    name="dimension1"
                    className="add-new-item__input"
                    placeholder="e.g., 50"
                    value={formData.dimension1}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
            )}

          {formData.dimensionType === "2x" && (
            <div className="add-new-item__form-row">
              <div className="add-new-item__form-group">
                <label htmlFor="dimension1" className="add-new-item__label">Width</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension1"
                    name="dimension1"
                    className="add-new-item__input"
                    placeholder="e.g., 50"
                    value={formData.dimension1}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
              <div className="add-new-item__form-group">
                <label htmlFor="dimension2" className="add-new-item__label">Height</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension2"
                    name="dimension2"
                    className="add-new-item__input"
                    placeholder="e.g., 100"
                    value={formData.dimension2}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
            </div>
          )}

          {formData.dimensionType === "3x" && (
            <div className="add-new-item__form-row">
              <div className="add-new-item__form-group">
                <label htmlFor="dimension1" className="add-new-item__label">Length</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension1"
                    name="dimension1"
                    className="add-new-item__input"
                    placeholder="e.g., 50"
                    value={formData.dimension1}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
              <div className="add-new-item__form-group">
                <label htmlFor="dimension2" className="add-new-item__label">Width</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension2"
                    name="dimension2"
                    className="add-new-item__input"
                    placeholder="e.g., 30"
                    value={formData.dimension2}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
              <div className="add-new-item__form-group">
                <label htmlFor="dimension3" className="add-new-item__label">Height</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension3"
                    name="dimension3"
                    className="add-new-item__input"
                    placeholder="e.g., 100"
                    value={formData.dimension3}
                    onChange={handleNumericInput}
                    inputMode="decimal"
                    disabled={isSubmitting}
                  />
                  <span className="add-new-item__input-unit">cm</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="add-new-item__section">
          <h2 className="add-new-item__section-title">Quantity & Pricing</h2>
          <div className="add-new-item__form-row">
            <div className="add-new-item__form-group">
              <label htmlFor="quantity" className="add-new-item__label">
                Quantity <span className="add-new-item__required">*</span>
              </label>
              <div className="add-new-item__input-group">
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className={`add-new-item__input ${
                    errors.quantity ? "add-new-item__input--error" : ""
                  }`}
                  placeholder="e.g., 10"
                  value={formData.quantity}
                  onChange={handleNumericInput}
                  inputMode="numeric"
                  disabled={isSubmitting}
                />
                <span className="add-new-item__input-unit">units</span>
              </div>
              {errors.quantity && (
                <span className="add-new-item__error">{errors.quantity}</span>
              )}
            </div>
            <div className="add-new-item__form-group">
              <label htmlFor="price" className="add-new-item__label">
                Unit Price <span className="add-new-item__required">*</span>
              </label>
              <div className="add-new-item__input-group">
                <span className="add-new-item__input-prefix">$</span>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={`add-new-item__input ${
                    errors.price ? "add-new-item__input--error" : ""
                  }`}
                  placeholder="e.g., 25.99"
                  value={formData.price}
                  onChange={handleNumericInput}
                  inputMode="decimal"
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && (
                <span className="add-new-item__error">{errors.price}</span>
              )}
            </div>
          </div>
          <div className="add-new-item__total">
            <div className="add-new-item__total-label">Total Value</div>
            <div className="add-new-item__total-value">${calculateTotal()}</div>
          </div>
        </section>

        {errors.submit && (
          <div className="add-new-item__alert add-new-item__alert--error">
            {errors.submit}
          </div>
        )}

        <div className="add-new-item__form-actions">
          <button
            type="button"
            className="add-new-item__btn add-new-item__btn--cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="add-new-item__btn add-new-item__btn--submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Editing..." : "Edit Item"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditItemForm;
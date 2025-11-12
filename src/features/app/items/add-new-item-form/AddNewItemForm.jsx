import { useState } from 'react'
import './add-new-item-form.css'

function AddNewItemForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onDimensionTypeChange,
  onSubmit,
  onCancel,
  calculateTotal,
}) {
  const [charCounts, setCharCounts] = useState({ title: 0 })
  
  const MAX_TITLE_LENGTH = 100
  const MAX_QUANTITY = 999999
  const MAX_PRICE = 999999.99
  const MAX_DIMENSION = 9999.99
  const MIN_QUANTITY = 0.01
  const MIN_PRICE = 0.01

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const handleNumericInput = (e) => {
    const { name, value } = e.target
    
    if (value === "") {
      onChange(e)
      return
    }

    if (name === "quantity") {
      if (/^\d+(\.\d{0,2})?$/.test(value)) {
        const numValue = parseFloat(value)
        if (numValue <= MAX_QUANTITY) {
          onChange(e)
        }
      }
    } else if (name === "price") {
      if (/^\d+(\.\d{0,2})?$/.test(value)) {
        const numValue = parseFloat(value)
        if (numValue <= MAX_PRICE) {
          onChange(e)
        }
      }
    } else if (name.startsWith("dimension")) {
      if (/^\d+(\.\d{0,2})?$/.test(value)) {
        const numValue = parseFloat(value)
        if (numValue <= MAX_DIMENSION) {
          onChange(e)
        }
      }
    }
  }

  const handleTitleChange = (e) => {
    const { value } = e.target
    
    if (value.length <= MAX_TITLE_LENGTH) {
      setCharCounts(prev => ({ ...prev, title: value.length }))
      onChange(e)
    }
  }

  const titleWarning = charCounts.title > MAX_TITLE_LENGTH * 0.9
  const quantityWarning = formData.quantity && parseFloat(formData.quantity) < MIN_QUANTITY
  const priceWarning = formData.price && parseFloat(formData.price) < MIN_PRICE

  const isQuantityValid = formData.quantity && parseFloat(formData.quantity) >= MIN_QUANTITY
  const isPriceValid = formData.price && parseFloat(formData.price) >= MIN_PRICE

  return (
    <div className="add-new-item__content">
      <form className="add-new-item__form" onSubmit={onSubmit}>
        
        <section className="add-new-item__section">
          <h2 className="add-new-item__section-title">Item Information</h2>
          <div className="add-new-item__form-group">
            <div className="add-new-item__label-row">
              <label htmlFor="title" className="add-new-item__label">
                Item Title <span className="add-new-item__required">*</span>
              </label>
              <span className={`add-new-item__char-count ${titleWarning ? 'warning' : ''}`}>
                {charCounts.title}/{MAX_TITLE_LENGTH}
              </span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              className={`add-new-item__input ${
                errors.title ? "add-new-item__input--error" : ""
              }`}
              placeholder="e.g., High-Quality Laptop Stand with Cooling"
              value={formData.title}
              onChange={handleTitleChange}
              maxLength={MAX_TITLE_LENGTH}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span className="add-new-item__error">{errors.title}</span>
            )}
            {!errors.title && formData.title && (
              <span className="add-new-item__hint">
                ✓ Title looks good
              </span>
            )}
          </div>
        </section>

        <section className="add-new-item__section">
          <div className="add-new-item__section-header">
            <h2 className="add-new-item__section-title">Dimensions (Optional)</h2>
            <span className="add-new-item__section-hint">Max {MAX_DIMENSION.toFixed(2)} cm per dimension</span>
          </div>
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
                title={`Select ${t === "single" ? "single" : t} dimension${t !== "single" ? "s" : ""}`}
              >
                {t === "single" ? "Single" : t === "2x" ? "2x (L×W)" : "3x (L×W×H)"}
              </button>
            ))}
          </div>

          {formData.dimensionType === "single" && (
            <div className="add-new-item__form-group">
              <label htmlFor="dimension1" className="add-new-item__label">
                Dimension (cm)
              </label>
              <div className="add-new-item__input-group">
                <input
                  type="text"
                  id="dimension1"
                  name="dimension1"
                  className="add-new-item__input"
                  placeholder={`e.g., 50 (max: ${MAX_DIMENSION})`}
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
                <label htmlFor="dimension1" className="add-new-item__label">Length</label>
                <div className="add-new-item__input-group">
                  <input
                    type="text"
                    id="dimension1"
                    name="dimension1"
                    className="add-new-item__input"
                    placeholder={`e.g., 50`}
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
                    placeholder={`e.g., 100`}
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
                    placeholder={`e.g., 50`}
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
                    placeholder={`e.g., 30`}
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
                    placeholder={`e.g., 100`}
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
                  placeholder={`Min: ${MIN_QUANTITY}, Max: ${MAX_QUANTITY}`}
                  value={formData.quantity}
                  onChange={handleNumericInput}
                  inputMode="decimal"
                  disabled={isSubmitting}
                />
                <span className="add-new-item__input-unit">units</span>
              </div>
              {errors.quantity && (
                <span className="add-new-item__error">{errors.quantity}</span>
              )}
              {quantityWarning && !errors.quantity && (
                <span className="add-new-item__warning">
                  ⚠️ Quantity must be at least {MIN_QUANTITY}
                </span>
              )}
              {isQuantityValid && (
                <span className="add-new-item__hint">
                  ✓ Valid quantity
                </span>
              )}
            </div>
            <div className="add-new-item__form-group">
              <label htmlFor="price" className="add-new-item__label">
                Unit Price <span className="add-new-item__required">*</span>
              </label>
              <div className="add-new-item__input-group">
                <span className="add-new-item__input-prefix">₱</span>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={`add-new-item__input ${
                    errors.price ? "add-new-item__input--error" : ""
                  }`}
                  placeholder={`Min: ₱${MIN_PRICE.toFixed(2)}, Max: ₱${MAX_PRICE.toFixed(2)}`}
                  value={formData.price}
                  onChange={handleNumericInput}
                  inputMode="decimal"
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && (
                <span className="add-new-item__error">{errors.price}</span>
              )}
              {priceWarning && !errors.price && (
                <span className="add-new-item__warning">
                  ⚠️ Price must be at least ₱{MIN_PRICE.toFixed(2)}
                </span>
              )}
              {isPriceValid && (
                <span className="add-new-item__hint">
                  ✓ Valid price
                </span>
              )}
            </div>
          </div>

          <div className="add-new-item__total">
            <div className="add-new-item__total-content">
              <div className="add-new-item__total-label">Total Value</div>
              <div className={`add-new-item__total-value ${isQuantityValid && isPriceValid ? 'calculated' : 'pending'}`}>
                ₱{formatCurrency(calculateTotal())}
              </div>
            </div>
            {isQuantityValid && isPriceValid && (
              <div className="add-new-item__total-status">
                ✓ Ready
              </div>
            )}
          </div>
        </section>

        {errors.submit && (
          <div className="add-new-item__alert add-new-item__alert--error">
            <span className="add-new-item__alert-icon">⚠️</span>
            <span>{errors.submit}</span>
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
            disabled={isSubmitting || !isQuantityValid || !isPriceValid}
            title={!isQuantityValid ? "Enter valid quantity" : !isPriceValid ? "Enter valid price" : "Add item to inventory"}
          >
            {isSubmitting ? "Adding Item..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewItemForm
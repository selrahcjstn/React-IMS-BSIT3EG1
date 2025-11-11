import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiSearch, FiPlus, FiX, FiArrowLeft } from "react-icons/fi"
import "./items-header.css"

function ItemsHeader({ inventoryId: inventoryIdProp, onSearch }) {
  const navigate = useNavigate()
  const { id: idFromParams } = useParams()
  const inventoryId = inventoryIdProp ?? idFromParams
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleAddNewItem = () => {
    if (!inventoryId) {
      console.warn("No inventory ID found in route params or props.")
      return
    }
    navigate(`/inventory/${inventoryId}/items/new`)
  }

  const handleBackClick = () => {
    navigate("/inventory")
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsSearching(value.length > 0)
    if (typeof onSearch === "function") {
      onSearch(value)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    if (typeof onSearch === "function") {
      onSearch("")
    }
  }

  return (
    <div className="items__header">
      <div className="items__header-top">
        <button
          className="items__back-btn"
          onClick={handleBackClick}
          aria-label="Go back to inventory"
          title="Back to inventory"
        >
          <FiArrowLeft />
        </button>

        <div className="items__search-container">
          <div className="items__search-wrapper">
            <FiSearch className="items__search-icon" aria-hidden="true" />
            <input
              type="text"
              className="items__search-bar"
              placeholder="Search by name, size, status..."
              aria-label="Search items"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button
                className="items__search-clear"
                onClick={handleClearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        className="items__add-btn-full"
        onClick={handleAddNewItem}
        disabled={!inventoryId}
        title={inventoryId ? "Add new item to inventory" : "No inventory selected"}
      >
        <FiPlus />
        <span>Create New Item</span>
      </button>

      {isSearching && (
        <div className="items__search-feedback">
          <span className="items__search-result-label">
            Searching for "{searchQuery}"
          </span>
        </div>
      )}

      {!isSearching && (
        <div className="items__info-bar">
          <span className="items__info-hint">
            💡 Tip: Use search to quickly find items
          </span>
        </div>
      )}
    </div>
  )
}

export default ItemsHeader
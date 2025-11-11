import { useState } from 'react'
import { FiSearch, FiPlus } from 'react-icons/fi'
import InventoryQuota from '../../../../components/inventory/iventory-quota-all/InventoryQuota'
import NewInventoryModal from '../new-inventory-modal/NewInventoryModal'
import './inventory-header.css'

function InventoryHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [inventoryCount, setInventoryCount] = useState(0)
  const MAX_INVENTORIES = 12

  const handleAddNewInventory = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateInventory = (formData) => {
    console.log("New inventory created:", formData)
    setInventoryCount(prev => prev + 1)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const isLimitReached = inventoryCount >= MAX_INVENTORIES

  return (
    <>
      <div className="inventory__header-wrapper">
        <div className="inventory__header-top">
          <div className="inventory__search-section">
            <div className="inventory__custom-search">
              <FiSearch className="inventory__search-icon" aria-hidden="true" />
              <input
                type="text"
                className="inventory__search-bar"
                placeholder="Search inventories by name..."
                aria-label="Search inventory"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {searchQuery && (
              <span className="inventory__search-hint">
                Searching for "{searchQuery}"
              </span>
            )}
          </div>

          <button
            className="inventory__add-btn"
            onClick={handleAddNewInventory}
            disabled={isLimitReached}
            title={isLimitReached ? `You've reached the maximum of ${MAX_INVENTORIES} inventories` : 'Create a new inventory'}
          >
            <FiPlus />
            <span>Create New</span>
          </button>
        </div>
      </div>

      <InventoryQuota />
      
      <NewInventoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateInventory}
      />
    </>
  )
}

export default InventoryHeader
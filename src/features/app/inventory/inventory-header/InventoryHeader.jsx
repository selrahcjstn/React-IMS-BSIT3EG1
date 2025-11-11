import { useState, useEffect } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { ref, get } from 'firebase/database'
import { database } from '../../../../firebase/config'
import Button from '../../../../components/common/button/Button'
import { FiSearch, FiPlus } from 'react-icons/fi'
import NewInventoryModal from '../new-inventory-modal/NewInventoryModal'
import './inventory-header.css'

function InventoryHeader() {
  const { currentUser } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [inventoryCount, setInventoryCount] = useState(0)
  const [loadingCount, setLoadingCount] = useState(true)
  const MAX_INVENTORIES = 12

  useEffect(() => {
    if (!currentUser?.uid) return

    const fetchCount = async () => {
      try {
        const userInvRef = ref(database, `userInventories/${currentUser.uid}`)
        const snapshot = await get(userInvRef)
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0
        setInventoryCount(count)
      } catch (err) {
        console.error("Error fetching inventory count:", err)
        setInventoryCount(0)
      } finally {
        setLoadingCount(false)
      }
    }

    fetchCount()
  }, [currentUser?.uid])

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
  const remainingCount = MAX_INVENTORIES - inventoryCount

  return (
    <>
      <div className="inventory__header-wrapper">
        <div className="inventory__header-container">
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
            <span className="inventory__search-hint">
              {searchQuery ? `Searching for "${searchQuery}"` : 'Type to filter inventories'}
            </span>
          </div>

          <div className="inventory__actions-section">
            <Button
              className="button"
              label={
                <>
                  <FiPlus className="button__icon" />
                  New Inventory
                </>
              }
              onClick={handleAddNewInventory}
              disabled={isLimitReached}
              title={isLimitReached ? `You've reached the maximum of ${MAX_INVENTORIES} inventories` : 'Create a new inventory'}
            />
          </div>
        </div>

        <div className="inventory__info-bar">
          <div className="inventory__info-content">
            <div className="inventory__quota-display">
              <span className="inventory__quota-label">Inventory Quota:</span>
              <span className={`inventory__quota-value ${isLimitReached ? 'quota-full' : ''}`}>
                {loadingCount ? '...' : `${inventoryCount}/${MAX_INVENTORIES}`}
              </span>
              {!loadingCount && (
                <span className={`inventory__quota-status ${isLimitReached ? 'status-full' : 'status-available'}`}>
                  {isLimitReached 
                    ? '🔴 Limit Reached' 
                    : `🟢 ${remainingCount} ${remainingCount === 1 ? 'slot' : 'slots'} available`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <NewInventoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateInventory}
      />
    </>
  )
}

export default InventoryHeader
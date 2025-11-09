import { useState } from 'react'
import Button from '../../../../components/common/button/Button'
import { FiSearch } from 'react-icons/fi'
import NewInventoryModal from '../new-inventory-modal/NewInventoryModal'
import './inventory-header.css'

function InventoryHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNewInventory = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateInventory = (formData) => {
    console.log("New inventory created:", formData);
    // Add API call here to create inventory
    // For now, just close the modal
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search functionality here
  };

  return (
    <>
      <div className="inventory__header-container">
        <div className="inventory__custom-search">
          <FiSearch className="inventory__search-icon" aria-hidden="true" />
          <input
            type="text"
            className="inventory__search-bar"
            placeholder="Search..."
            aria-label="Search inventory"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button
          className="button"
          label="New Inventory"
          onClick={handleAddNewInventory}
        />
      </div>
      
      <NewInventoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateInventory}
      />
    </>
  );
}

export default InventoryHeader;
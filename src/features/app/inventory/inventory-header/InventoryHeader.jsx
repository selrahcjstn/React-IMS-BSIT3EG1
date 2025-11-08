import Button from '../../../../components/common/button/Button'
import { useNavigate } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import './inventory-header.css'

function InventoryHeader() {
  const navigate = useNavigate();

  const handleAddNewInventory = () => {
    navigate("/inventory/new");
  };
  return (
    <div className="inventory__header-container">
      <div className="inventory__custom-search">
        <FiSearch className="inventory__search-icon" aria-hidden="true" />
        <input
          type="text"
          className="inventory__search-bar"
          placeholder="Search..."
          aria-label="Search inventory"
        />
      </div>
      <Button
        className="button"
        label="New Inventory"
        onClick={handleAddNewInventory}
      />
    </div>
  );
}

export default InventoryHeader;

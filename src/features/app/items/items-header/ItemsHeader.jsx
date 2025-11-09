import Button from '../../../../components/common/button/Button'
import { useNavigate } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import './items-header.css'

function ItemsHeader() {
  const navigate = useNavigate();

  const handleAddNewInventory = () => {
    navigate("/inventory/new");
  };

  return (
    <div className="items__header-container">
      <div className="items__custom-search">
        <FiSearch className="items__search-icon" aria-hidden="true" />
        <input
          type="text"
          className="items__search-bar"
          placeholder="Search..."
          aria-label="Search inventory"
        />
      </div>
      <Button
        className="items__button"
        label="New Inventory"
        onClick={handleAddNewInventory}
      />
    </div>
  );
}

export default ItemsHeader;

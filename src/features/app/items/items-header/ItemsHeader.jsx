import Button from "../../../../components/common/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./items-header.css";

function ItemsHeader({ inventoryId: inventoryIdProp }) {
  const navigate = useNavigate();
  const { id: idFromParams } = useParams();
  const inventoryId = inventoryIdProp ?? idFromParams;

  const handleAddNewItem = () => {
    if (!inventoryId) {
      console.warn("No inventory ID found in route params or props.");
      return;
    }
    navigate(`/inventory/${inventoryId}/items/new`);
  };

  return (
    <div className="items__header-container">
      <div className="items__custom-search">
        <FiSearch className="items__search-icon" aria-hidden="true" />
        <input
          type="text"
          className="items__search-bar"
          placeholder="Search..."
          aria-label="Search items"
        />
      </div>
      <Button
        className="items__button"
        label="Add New Item"
        onClick={handleAddNewItem}
        disabled={!inventoryId}
      />
    </div>
  );
}

export default ItemsHeader;
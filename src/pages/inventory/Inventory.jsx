import InventoryHeader from "../../features/app/inventory/inventory-header/InventoryHeader";
import InventoryList from "../../features/app/inventory/inventory-list/InventoryList";
import "./inventory.css";

function Inventory() {
  return (
    <div className="inventory container">
      <InventoryHeader />
      <InventoryList />
    </div>
  );
}

export default Inventory;
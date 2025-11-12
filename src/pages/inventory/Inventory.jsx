import Header from "../../components/inventory/header/Header"
import InventoryHeader from "../../features/app/inventory/inventory-header/InventoryHeader"
import InventoryList from "../../features/app/inventory/inventory-list/InventoryList"
import "./inventory.css"

function Inventory() {
  return (
    <div className="inventory container">
      <Header
        title="Inventories"
        subtitle="Manage and monitor all your inventories in one place."
      />
      <div className="inventory__content">
        <InventoryHeader />
        <InventoryList />
      </div>
    </div>
  )
}

export default Inventory
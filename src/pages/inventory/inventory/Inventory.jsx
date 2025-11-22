import { useState, useCallback } from "react"
import Header from "../../../components/inventory/header/Header"
import InventoryHeader from "../../../features/app/inventory/inventory-header/InventoryHeader"
import InventoryList from "../../../features/app/inventory/inventory-list/InventoryList"
import "./inventory.css"

function Inventory() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = useCallback((value) => {
    setSearchQuery(value)
  }, [])

  return (
    <div className="inventory container">
      <Header
        title="Inventories"
        subtitle="Manage and monitor all your inventories in one place."
      />
      <div className="inventory__content">
        <InventoryHeader onSearch={handleSearch} />
        <InventoryList searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default Inventory
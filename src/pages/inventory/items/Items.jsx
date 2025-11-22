import { useState, useCallback } from "react"
import Header from "../../../components/inventory/header/Header"
import ItemsHeader from "../../../features/app/items/items-header/ItemsHeader"
import ItemList from "../../../features/app/items/items-list/ItemList"
import "./items.css"

function Items() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleHeaderSearch = useCallback((value) => {
    setSearchQuery(value)
  }, [])

  return (
    <div className="inventory container">
      <Header 
        title="Items"
        subtitle="Manage and monitor all your items in one place."
      />  
      <div>
        <ItemsHeader
          onSearch={handleHeaderSearch}
        />
        <ItemList searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default Items
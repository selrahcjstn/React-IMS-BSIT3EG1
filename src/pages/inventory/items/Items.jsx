import { useState } from "react"
import Header from "../../../components/inventory/header/Header"
import ItemsHeader from "../../../features/app/items/items-header/ItemsHeader"
import ItemList from "../../../features/app/items/items-list/ItemList"
import "./items.css"

function Items() {
  const [searchHandler, setSearchHandler] = useState(() => () => {})

  return (
    <div className="inventory container">
      <Header 
        title="Items"
        subtitle="Manage and monitor all your items in one place."
      />  
      <div>
        <ItemsHeader

          onSearch={(value) => searchHandler(value)}
        />
        <ItemList
          onSearch={(handler) => setSearchHandler(() => handler)}
        />
      </div>
    </div>
  )
}

export default Items
import Header from "../../components/inventory/header/Header"
import ItemsHeader from "../../features/app/items/items-header/ItemsHeader"
import ItemList from "../../features/app/items/items-list/ItemList"
import "./items.css"

function Items() {
  return (
    <div className="inventory container">
      <Header 
        title="Items"
        subtitle="Manage and monitor all your items in one place."
      />  
      <div>
      <ItemsHeader />
      <ItemList />
      </div>
    </div>
  )
}

export default Items
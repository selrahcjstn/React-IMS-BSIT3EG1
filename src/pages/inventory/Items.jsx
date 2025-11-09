import ItemsHeader from "../../features/app/items/items-header/ItemsHeader"
import ItemList from "../../features/app/items/items-list/ItemList"
import "./items.css"

function Items() {
  return (
    <div className="inventory container">
      <ItemsHeader />
      <ItemList />
    </div>
  )
}

export default Items
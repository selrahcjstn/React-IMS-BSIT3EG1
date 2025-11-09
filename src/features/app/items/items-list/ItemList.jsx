import ItemCard from "../../../../components/inventory/ItemCard/ItemCard";
import "./item-list.css";

function ItemList() {
  const inventoryName = "Electronics Stock";

  const items = [
    {
      id: 1,
      name: "Laptop",
      quantity: 25,
      unitPrice: 899.99,
      totalValue: 22499.75,
      status: "In Stock",
      size: "35.5cm x 23.8cm x 1.99cm",
      lastUpdated: "2025-11-09",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      name: "Office Chair",
      quantity: 15,
      unitPrice: 249.99,
      totalValue: 3749.85,
      status: "In Stock",
      size: "65cm x 65cm x 112cm",
      lastUpdated: "2025-11-08",
      createdAt: "2025-02-20",
    },
    {
      id: 3,
      name: "Desk Lamp",
      quantity: 8,
      unitPrice: 49.99,
      totalValue: 399.92,
      status: "Low Stock",
      size: "20cm x 20cm x 45cm",
      lastUpdated: "2025-11-07",
      createdAt: "2025-03-10",
    },
    {
      id: 4,
      name: "Keyboard",
      quantity: 0,
      unitPrice: 79.99,
      totalValue: 0,
      status: "Out of Stock",
      size: "45cm x 15cm x 2.5cm",
      lastUpdated: "2025-11-06",
      createdAt: "2025-04-22",
    },
    {
      id: 5,
      name: "Monitor",
      quantity: 12,
      unitPrice: 299.99,
      totalValue: 3599.88,
      status: "In Stock",
      size: "60cm x 50cm x 10cm",
      lastUpdated: "2025-11-09",
      createdAt: "2025-05-11",
    },
  ];

  const handleEditItem = (id) => {
    console.log("Edit item:", id);
  };

  const handleDeleteItem = (id) => {
    console.log("Delete item:", id);
  };

  return (
    <div className="itemlist">
      <h2 className="itemlist__title">{inventoryName}</h2>

      <div className="itemlist__grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
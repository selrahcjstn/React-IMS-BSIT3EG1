import "./inventory-quota-info.css";

function InventoryQuotaInfo({ inventoryCount, maxInventories }) {
  const remainingInventories = maxInventories - inventoryCount;
  const isLimitReached = inventoryCount >= maxInventories;
  const progressPercentage = (inventoryCount / maxInventories) * 100;

  return (
    <div className="inventory-quota-info">
      <div className="inventory-quota-info__content">
        <p className="inventory-quota-info__text">
          <strong>{inventoryCount}</strong> of <strong>{maxInventories}</strong> inventories
        </p>
        <div className="inventory-quota-info__bar">
          <div 
            className={`inventory-quota-info__progress ${isLimitReached ? 'quota-full' : ''}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {remainingInventories > 0 ? (
          <p className="inventory-quota-info__remaining">
            You can create <strong>{remainingInventories}</strong> more {remainingInventories === 1 ? 'inventory' : 'inventories'}
          </p>
        ) : (
          <p className="inventory-quota-info__full-message">
            You have reached the maximum limit of {maxInventories} inventories
          </p>
        )}
      </div>
    </div>
  );
}

export default InventoryQuotaInfo;
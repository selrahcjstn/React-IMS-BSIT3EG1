import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { ref, get } from 'firebase/database'
import { database } from '../../../firebase/config'
import './inventory-quota-all.css'

function InventoryQuota() {
  const { currentUser } = useAuth()
  const [inventoryCount, setInventoryCount] = useState(0)
  const [loadingCount, setLoadingCount] = useState(true)
  const MAX_INVENTORIES = 12

  useEffect(() => {
    if (!currentUser?.uid) return

    const fetchCount = async () => {
      try {
        const userInvRef = ref(database, `userInventories/${currentUser.uid}`)
        const snapshot = await get(userInvRef)
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0
        setInventoryCount(count)
      } catch (err) {
        console.error("Error fetching inventory count:", err)
        setInventoryCount(0)
      } finally {
        setLoadingCount(false)
      }
    }

    fetchCount()
  }, [currentUser?.uid])

  const isLimitReached = inventoryCount >= MAX_INVENTORIES
  const remainingCount = MAX_INVENTORIES - inventoryCount

  return (
    <div className="inventory__quota-bar">
      <div className="inventory__quota-content">
        <div className="inventory__quota-display">
          <span className="inventory__quota-label">Inventory Quota:</span>
          <span className={`inventory__quota-value ${isLimitReached ? 'quota-full' : ''}`}>
            {loadingCount ? '...' : `${inventoryCount}/${MAX_INVENTORIES}`}
          </span>
          {!loadingCount && (
            <span className={`inventory__quota-status ${isLimitReached ? 'status-full' : 'status-available'}`}>
              {isLimitReached 
                ? '🔴 Limit Reached' 
                : `🟢 ${remainingCount} ${remainingCount === 1 ? 'slot' : 'slots'} available`}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryQuota
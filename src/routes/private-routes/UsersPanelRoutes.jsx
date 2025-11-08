import PageContentLayout from "../../components/inventory/inventory-layout/PageContentLayout"
import Sidebar from "../../features/inventory/sidebar/Sidebar"
import { useState } from "react";

import { Outlet} from "react-router"
function UsersPanelRoutes() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
     <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageContentLayout isCollapsed={!isOpen}>
        <Outlet />
      </PageContentLayout>
    </>
  )
}

export default UsersPanelRoutes
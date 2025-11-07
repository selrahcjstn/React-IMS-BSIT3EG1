import { Outlet} from "react-router"
function DashboardRoute() {
  return (
    <>
     {/* <NAV /> */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default DashboardRoute
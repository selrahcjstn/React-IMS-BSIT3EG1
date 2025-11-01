import { Outlet } from "react-router"
import Navbar from "../../components/landing-page/navbar/Navbar"

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout
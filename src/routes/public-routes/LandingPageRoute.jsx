import { Outlet } from "react-router"
import Navbar from "../../features/landing-page/navbar/Navbar"

function LandingPageRoute() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default LandingPageRoute
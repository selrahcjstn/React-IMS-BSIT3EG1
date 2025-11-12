import { Outlet } from "react-router"
import Navbar from "../../features/landing-page/navbar/Navbar"
import Footer from "../../features/landing-page/footer/Footer"

function LandingPageRoute() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LandingPageRoute
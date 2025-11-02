import AuthNav from "../../features/auth/auth-nav/AuthNav"
import { Outlet } from "react-router"

function AuthenticationLayout() {
  return (
    <>
      <AuthNav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AuthenticationLayout
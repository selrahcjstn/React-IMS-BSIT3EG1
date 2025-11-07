import AuthNav from '../../features/auth/auth-nav/AuthNav'
import { Outlet} from "react-router"
function AccountVerificationRoute() {
  return (
    <>
      <AuthNav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AccountVerificationRoute
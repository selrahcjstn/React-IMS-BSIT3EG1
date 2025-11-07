import AuthNav from '../../../features/auth/auth-nav/AuthNav'
import { Outlet} from "react-router"
function AccountVerification() {
  return (
    <>
      <AuthNav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AccountVerification
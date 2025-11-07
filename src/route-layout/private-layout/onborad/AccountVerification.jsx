import AuthNav from '../../../features/auth/auth-nav/AuthNav'
import { Outlet } from "react-router"
import { useAuth } from '../../../context/AuthContext'

function AccountVerification() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

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
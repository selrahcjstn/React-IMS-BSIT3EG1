import { Outlet, Navigate } from "react-router-dom"; 
import AuthNav from "../../features/auth/auth-nav/AuthNav";
import { useAuth } from "../../context/AuthContext";
function AuthenticationRoute() {
  const { currentUser } = useAuth();

  if (currentUser && currentUser.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <AuthNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AuthenticationRoute;
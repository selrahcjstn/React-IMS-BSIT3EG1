import { Outlet, Navigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext"; 
import AuthNav from "../../features/auth/auth-nav/AuthNav";

function AuthenticationLayout() {
  const { user } = useAuth(); 

  if (user) {
    return <Navigate to="/dashboard" replace/>;
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

export default AuthenticationLayout;
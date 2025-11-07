import { Outlet, Navigate } from "react-router-dom"; 
import AuthNav from "../../features/auth/auth-nav/AuthNav";

function AuthenticationLayout() {

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
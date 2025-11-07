import { Outlet, Navigate } from "react-router-dom"; 
import AuthNav from "../../features/auth/auth-nav/AuthNav";

function AuthenticationRoute() {

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
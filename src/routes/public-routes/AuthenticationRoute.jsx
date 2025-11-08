import { Outlet, Navigate } from "react-router-dom"; 
import AuthNav from "../../features/auth/auth-nav/AuthNav";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

function AuthenticationRoute() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkUserData = async () => {
      if (!currentUser) {
        setRedirectPath(null);
        setIsLoading(false);
        return;
      }

      if (!currentUser.emailVerified) {
        setRedirectPath(null);
        setIsLoading(false);
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setRedirectPath("/dashboard");
        } else {
          setRedirectPath("/auth/personal-info");
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        setRedirectPath("/auth/personal-info");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserData();
  }, [currentUser]);

  if (isLoading) return null; 

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
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

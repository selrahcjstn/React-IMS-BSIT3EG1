import PageContentLayout from "../../components/inventory/inventory-layout/PageContentLayout";
import Sidebar from "../../features/inventory/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDatabase, ref, get } from "firebase/database";

function UsersPanelRoutes() {
  const [isOpen, setIsOpen] = useState(true);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkUserData = async () => {
      if (!currentUser) {
        setRedirectPath("/auth/login"); 
        setIsLoading(false);
        return;
      }
      if(!currentUser.emailVerified){
        setRedirectPath("/auth/login");
        setIsLoading(false);
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      try {
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
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
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageContentLayout isCollapsed={!isOpen}>
        <Outlet />
      </PageContentLayout>
    </>
  );
}

export default UsersPanelRoutes;

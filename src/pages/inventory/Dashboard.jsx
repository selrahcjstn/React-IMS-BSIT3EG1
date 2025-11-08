import Button from "../../components/common/button/Button";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function Dashboard() {
  const { currentUser } = useAuth();

  const handleClick = async () => {
    await signOut(auth); // 
  };

  if (!currentUser) return <Navigate to="/auth/login" replace />;

  return (
    <div>
      
      <h1>Dashboard</h1>

      <p>Welcome back, {currentUser.email}!</p>
      <p>Verified: {currentUser.emailVerified ? "Yes" : "No"}</p>

      <Button onClick={handleClick} label="Logout" />
    </div>
  );
}

export default Dashboard;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountVerificationRoute from "./routes/private-routes/AccountVerificationRoute";
import AuthenticationRoute from "./routes/public-routes/AuthenticationRoute";
import Verification from "./pages/auth/Verification";
import PersonalInfo from "./pages/auth/PersonalInfo";
import DashboardRoute from "./routes/private-routes/DashboardRoute";
import Dashboard from "./features/inventory/dashboard/Dashboard";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<LandingPageRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthenticationRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<AccountVerificationRoute />}>
          <Route path="/auth/verify-account" element={<Verification />} />
          <Route path="/auth/personal-info" element={<PersonalInfo />} />
        </Route>
        <Route element={<DashboardRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountVerificationRoute from "./routes/private-routes/AccountVerificationRoute";
import AuthenticationRoute from "./routes/public-routes/AuthenticationRoute";
import Verification from "./pages/auth/Verification";
import PersonalInfo from "./pages/auth/PersonalInfo";
import UsersPanelRoutes from "./routes/private-routes/UsersPanelRoutes";
import Dashboard from "./pages/inventory/dashboard/Dashboard";
import LandingPageRoute from "./routes/public-routes/LandingPageRoute";
import Inventory from "./pages/inventory/inventory/Inventory";
import Items from "./pages/inventory/items/Items";
import AddNewItem from "./pages/inventory/add-new-item/AddNewItem";
import EditItemPage from "./pages/inventory/edit-item-page/EditItemPage";
import AccountSettings from "./pages/inventory/account-settings/AccountSettings";
import Help from "./pages/inventory/help/Help";

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
        <Route element={<UsersPanelRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/items/:id" element={<Items />} />
          <Route path="/inventory/:id/items/new" element={<AddNewItem />} />
          <Route path="/inventory/items/:id/item/:itemId/edit" element={<EditItemPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

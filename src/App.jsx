import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/landing-page/LandingPage";
import PublicLayout from "./route-layout/public-layout/PublicLayout";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import AccountVerification from "./route-layout/private-layout/onborad/AccountVerification";
import AuthenticationLayout from "./route-layout/public-layout/AuthenticationLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthenticationLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />  
        </Route>
        <Route element={<AccountVerification />}>
          {/* Protected routes can be added here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

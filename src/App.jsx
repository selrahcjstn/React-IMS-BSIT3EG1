import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import PublicLayout from "./route-layout/public-layout/PublicLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountVerification from "./route-layout/private-layout/onborad/AccountVerification";
import AuthenticationLayout from "./route-layout/public-layout/AuthenticationLayout";
import Verification from "./pages/auth/Verification";
import PersonalInfo from "./pages/auth/PersonalInfo";

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
          <Route path="/auth/verify-account" element={<Verification />} />
          <Route path="/auth/personal-info" element={<PersonalInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

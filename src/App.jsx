import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/landing-page/LandingPage";
import PublicLayout from "./route-layout/public-layout/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

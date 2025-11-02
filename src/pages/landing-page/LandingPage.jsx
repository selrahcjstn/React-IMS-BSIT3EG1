import Features from "../../features/landing-page/features/Features";
import Hero from "../../features/landing-page/hero/Hero";
import "./landing-page.css"

function LandingPage() {
  return (
    <div className="home container">
      <Hero />
      <Features />
    </div>
  );
}

export default LandingPage;

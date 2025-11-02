import Features from "../../components/landing-page/features/Features";
import Hero from "../../components/landing-page/hero/Hero";
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

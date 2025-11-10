import ContactUs from "../../features/landing-page/contact-us/ContactUs";
import Features from "../../features/landing-page/features/Features";
import Hero from "../../features/landing-page/hero/Hero";
import "./landing-page.css"

function LandingPage() {
  return (
    <div className="home container">
      <Hero />
      <Features />
      <ContactUs />
    </div>
  );
}

export default LandingPage;

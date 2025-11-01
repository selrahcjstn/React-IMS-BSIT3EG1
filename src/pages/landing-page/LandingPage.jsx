import "./landing-page.css"

function LandingPage() {
  return (
    <section className="home container">
      <h1 className="">Welcome to the Landing Page</h1>
      <p>This is the main content of the landing page.</p>
      <section className="home__cta">
        <button className="home__cta-button">Get Started</button>
      </section>
    </section>
  );
}

export default LandingPage;

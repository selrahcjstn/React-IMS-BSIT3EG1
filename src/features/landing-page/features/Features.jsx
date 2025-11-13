import Card from "../../../components/landing-page/features-card/Card";
import "./features.css";

function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <header className="features__header">
          <div className="features__badge">Key Features</div>
          <h1 className="features__title">We've got what you need</h1>
          <p className="features__description">
            Our platform offers a range of features designed to enhance your experience
          </p>
        </header>
        <Card />
      </div>
    </section>
  );
}

export default Features;
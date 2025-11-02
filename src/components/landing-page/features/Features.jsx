import Card from "../features-card/Card";
import "./features.css";

function Features() {
  return (
    <section className="features">
      <h1 className="features__title">We've got what you need</h1>
      <p className="features__description">
        Our platform offers a range of features designed to enhance your
        experience
      </p>
      <>
        <Card />
      </>
    </section>
  );
}

export default Features;

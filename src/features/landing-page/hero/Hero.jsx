import hero from "../../../assets/hero.svg";
import Button from "../../../components/common/button/Button";
import Highlight from "../../../components/landing-page/highlight/Highlight";
import "./hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__container">
        <section className="hero__heading-container">
          <h1 className="hero__heading">Control, simplified.</h1>
          <p className="hero__description">
            Simplify your inventory, sales, and operations in one powerful
            online system. Stay on top of stock levels, track performance, and
            focus on growing your business.
          </p>
          <Button label={"Start for free"} />
        </section>
        <div className="hero__image-container">
          <img src={hero} alt="hero__image" />
        </div>
      </div>
      <Highlight />
    </div>
  );
}

export default Hero;
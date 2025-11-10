import { AiOutlineBulb, AiOutlineAreaChart, AiOutlineCloud, AiOutlineLock } from "react-icons/ai";
import "./highlight.css";

const highlightsData = [
  {
    title: "Easy to manage",
    description: "Our intuitive interface makes it simple to oversee your operations.",
    Icon: AiOutlineBulb,
  },
  {
    title: "Real-time analytics",
    description: "Get instant insights into your inventory and sales performance.",
    Icon: AiOutlineAreaChart,
  },
  {
    title: "Cloud-based access",
    description: "Manage your business from anywhere, at any time.",
    Icon: AiOutlineCloud,
  },
  {
    title: "Secure and reliable",
    description: "Your data is protected with top-tier security measures.",
    Icon: AiOutlineLock,
  },
];

function Highlight() {
  return (
    <div className="container">
      <div className="highlight">
        {highlightsData.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div className="highlight__card" key={index}>
              <div className="highlight__icon-wrapper">
                <Icon className="highlight__icon" />
              </div>
              <h4 className="highlight__title">{item.title}</h4>
              <p className="highlight__description">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Highlight;
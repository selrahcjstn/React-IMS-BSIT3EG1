import "./card.css";
import {
  AiOutlineShoppingCart,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineDatabase,
} from "react-icons/ai";

const features = [
  {
    title: "Inventory Control",
    description: "Efficiently manage stock levels and product categories.",
    Icon: AiOutlineShoppingCart,
  },
  {
    title: "Asset Monitoring",
    description: "Track inventory value and optimize resource allocation.",
    Icon: AiOutlineBarChart,
  },
  {
    title: "Stock Customization",
    description: "Configure product attributes and categories with ease.",
    Icon: AiOutlineSetting,
  },
  {
    title: "Account Administration",
    description: "Manage user roles, permissions, and access levels.",
    Icon: AiOutlineUser,
  },
  {
    title: "Activity Oversight",
    description: "Monitor system activity and maintain operational transparency.",
    Icon: AiOutlineClockCircle,
  },
  {
    title: "Operational Analytics",
    description: "Gain insights from inventory data to make informed decisions.",
    Icon: AiOutlineDatabase,
  },
];

function Card() {
  return (
    <div className="cards">
      {features.map((feature, index) => (
        <div key={index} className="cards__item">
          <div className="cards__item-icon-wrapper">
            <feature.Icon className="cards__item-icon" />
          </div>
          <h3 className="cards__item-title">{feature.title}</h3>
          <p className="cards__item-description">{feature.description}</p>
          <div className="cards__item-underline"></div>
        </div>
      ))}
    </div>
  );
}

export default Card;
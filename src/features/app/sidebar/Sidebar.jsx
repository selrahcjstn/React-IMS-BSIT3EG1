import {
  FaHome,
  FaBox,
  FaQuestionCircle,
  FaCog,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import Logo from "../../../components/logo/Logo";
import LogoIcon from "../../../assets/logo.png";
import { useAuth } from "../../../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser } = useAuth();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const location = useLocation();

  const user = {
    name: currentUser?.displayName || null,
    email: currentUser?.email || null,
  };

  const menuItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <FaHome />,
      tooltip: "Dashboard",
    },
    {
      to: "/inventory",
      label: "Inventory",
      icon: <FaBox />,
      tooltip: "Inventory",
    },
    {
      to: "/help",
      label: "Help / FAQ",
      icon: <FaQuestionCircle />,
      tooltip: "Help / FAQ",
    },
    {
      to: "/settings",
      label: "Settings",
      icon: <FaCog />,
      tooltip: "Settings",
    },
  ];

  return (
    <div className="layout">
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      >
        <nav className="sidebar__menu">
          {isOpen ? (
            <Logo />
          ) : (
            <img src={LogoIcon} alt="Logo" className="sidebar__logo-icon" />
          )}

          <hr className="sidebar__divider" />

          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar__menu-item ${isActive ? "is-active" : ""}`}
                data-tooltip={item.tooltip}
              >
                {item.icon}
                {isOpen && <span className="sidebar__text">{item.label}</span>}
              </Link>
            );
          })}

          <hr className="sidebar__divider" />

          <button
            className="sidebar__toggle"
            onClick={toggleSidebar}
            type="button"
          >
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </nav>
        
        <div className="sidebar__bottom">
          <div
            className="sidebar__profile"
            data-tooltip={!isOpen ? user.name : ""}
          >
            <FaUserCircle className="sidebar__profile-icon" />
            {isOpen && (
              <div className="sidebar__profile-info">
                <span className="sidebar__profile-name">{user.name}</span>
                <span className="sidebar__profile-email">{user.email}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

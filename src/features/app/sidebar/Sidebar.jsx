import {
  FaHome,
  FaBox,
  FaQuestionCircle,
  FaCog,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import Logo from "../../../components/logo/Logo";
import LogoIcon from "../../../assets/logo.png";
import { useAuth } from "../../../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome />, tooltip: "Dashboard" },
    { to: "/inventory", label: "Inventory", icon: <FaBox />, tooltip: "Inventory" },
    { to: "/help", label: "Help / FAQ", icon: <FaQuestionCircle />, tooltip: "Help / FAQ" },
    { to: "/settings", label: "Settings", icon: <FaCog />, tooltip: "Settings" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="sidebar__hamburger"
        onClick={toggleSidebar}
        aria-label="Open menu"
        type="button"
      >
        <FaBars />
      </button>

      <div className="layout">
        <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}>
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
                  onClick={handleMenuItemClick}
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
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </nav>

          <div className="sidebar__bottom">
            <button
              className="sidebar__signout-btn"
              onClick={handleLogout}
              data-tooltip={!isOpen ? "Sign out" : ""}
              type="button"
            >
              <FaSignOutAlt />
              {isOpen && <span className="sidebar__text">Sign out</span>}
            </button>

            <div
              className="sidebar__profile"
              data-tooltip={!isOpen ? (currentUser?.displayName || currentUser?.email || "User") : ""}
            >
              <FaUserCircle className="sidebar__profile-icon" />
              {isOpen && (
                <div className="sidebar__profile-info">
                  <span className="sidebar__profile-name">
                    {currentUser?.displayName || currentUser?.email || "—"}
                  </span>
                  <span className="sidebar__profile-email">
                    {currentUser?.email || ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </aside>

        {isOpen && (
          <div
            className="sidebar__overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
}

export default Sidebar;
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
  const { currentUser, displayName, avatarId, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isInventorySection =
    location.pathname === "/inventory" ||
    location.pathname.startsWith("/inventory/");

  const menuItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <FaHome />,
      tooltip: "Dashboard",
      isActive: location.pathname === "/dashboard",
    },
    {
      to: "/inventory",
      label: "Inventory",
      icon: <FaBox />,
      tooltip: "Inventory",
      isActive: isInventorySection,
    },
    {
      to: "/help",
      label: "Help / FAQ",
      icon: <FaQuestionCircle />,
      tooltip: "Help / FAQ",
      isActive: location.pathname === "/help",
    },
    {
      to: "/account-settings",
      label: "Account Settings",
      icon: <FaCog />,
      tooltip: "Account Settings",
      isActive: location.pathname === "/account-settings",
    },
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

  const resolvedName =
    displayName || currentUser?.displayName || currentUser?.email || "User";
  const resolvedEmail = currentUser?.email || "";

  // If no avatarId, or avatarId is 10, show user icon. Otherwise, show PNG.
  const showUserIcon = !avatarId || avatarId === 10;
  const avatarSrc =
    avatarId && avatarId !== 10
      ? new URL(
          `../../../assets/avatar/${avatarId}.png`,
          import.meta.url
        ).href
      : null;

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
        <aside
          className={`sidebar ${
            isOpen ? "sidebar--open" : "sidebar--closed"
          }`}
        >
          <nav className="sidebar__menu">
            {isOpen ? (
              <Logo />
            ) : (
              <img src={LogoIcon} alt="Logo" className="sidebar__logo-icon" />
            )}

            <hr className="sidebar__divider" />

            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar__menu-item ${
                  item.isActive ? "is-active" : ""
                }`}
                data-tooltip={item.tooltip}
                onClick={handleMenuItemClick}
              >
                {item.icon}
                {isOpen && (
                  <span className="sidebar__text">{item.label}</span>
                )}
              </Link>
            ))}

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
              data-tooltip={!isOpen ? resolvedName : ""}
            >
              {showUserIcon ? (
                <FaUserCircle className="sidebar__profile-icon" />
              ) : (
                <img
                  src={avatarSrc}
                  alt={resolvedName}
                  className="sidebar__profile-avatar"
                />
              )}
              {isOpen && (
                <div className="sidebar__profile-info">
                  <span className="sidebar__profile-name">{resolvedName}</span>
                  <span className="sidebar__profile-email">
                    {resolvedEmail}
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
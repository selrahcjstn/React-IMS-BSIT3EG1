import { useState, useEffect } from "react";
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
import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase/config";

function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser, logout } = useAuth();
  const [currentAvatarId, setCurrentAvatarId] = useState(null);
  const [currentDisplayName, setCurrentDisplayName] = useState("User");
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.avatarId !== undefined) {
            setCurrentAvatarId(data.avatarId);
          }
          
          const f = (data.firstName || "").trim();
          const l = (data.lastName || "").trim();
          const name = `${f} ${l}`.trim();
          
          if (name) setCurrentDisplayName(name);
          else if (data.email) setCurrentDisplayName(data.email);
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

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

  const resolvedEmail = currentUser?.email || "";

  const avatarSrc =
    currentAvatarId != null
      ? new URL(
          `../../../assets/avatar/${currentAvatarId}.png`,
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
        <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}>
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
                className={`sidebar__menu-item ${item.isActive ? "is-active" : ""}`}
                data-tooltip={item.tooltip}
                onClick={handleMenuItemClick}
              >
                {item.icon}
                {isOpen && <span className="sidebar__text">{item.label}</span>}
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
              data-tooltip={!isOpen ? currentDisplayName : ""}
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={currentDisplayName}
                  className="sidebar__profile-avatar"
                />
              ) : (
                <FaUserCircle className="sidebar__profile-icon" />
              )}
              {isOpen && (
                <div className="sidebar__profile-info">
                  <span className="sidebar__profile-name">{currentDisplayName}</span>
                  <span className="sidebar__profile-email">{resolvedEmail}</span>
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
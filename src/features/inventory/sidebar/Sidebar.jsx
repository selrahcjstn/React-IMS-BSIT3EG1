import {
  FaHome,
  FaBox,
  FaQuestionCircle,
  FaCog,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./sidebar.css";
import Logo from "../../../components/logo/Logo";
import LogoIcon from "../../../assets/logo.png";


function Sidebar({ isOpen, setIsOpen }) {
  const toggleSidebar = () => setIsOpen(!isOpen);

  const user = {
    name: "Charles Justine",
    email: "charles@example.com",
  };

  return (
    <div className="layout">
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      >
        <nav className="sidebar__menu">
          {isOpen ? <Logo /> : <img src={LogoIcon} alt="Logo" className="sidebar__logo-icon" />}

          <hr className="sidebar__divider" />
          <a href="#" className="sidebar__menu-item" data-tooltip="Dashboard">
            <FaHome className="sidebar__icon" />
            {isOpen && <span className="sidebar__text">Dashboard</span>}
          </a>

          <a href="#" className="sidebar__menu-item" data-tooltip="Inventory">
            <FaBox className="sidebar__icon" />
            {isOpen && <span className="sidebar__text">Inventory</span>}
          </a>

          <a href="#" className="sidebar__menu-item" data-tooltip="Help / FAQ">
            <FaQuestionCircle className="sidebar__icon" />
            {isOpen && <span className="sidebar__text">Help / FAQ</span>}
          </a>

          <a href="#" className="sidebar__menu-item" data-tooltip="Settings">
            <FaCog className="sidebar__icon" />
            {isOpen && <span className="sidebar__text">Settings</span>}
          </a>
          <hr className="sidebar__divider" />
          <button className="sidebar__toggle" onClick={toggleSidebar}>
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

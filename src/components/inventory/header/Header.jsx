import "./header.css";
import { FiMoon } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

function Header({ isCollapsed }) {
  const location = useLocation();

  // Helpers
  const isLikelyId = (seg) => {
    if (!seg) return false;
    const uuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const firebasePush = /^-[A-Za-z0-9_-]{15,}$/; // e.g., -OdkyZN0HJQD9x6ctlV6
    const longToken = /^[A-Za-z0-9_-]{16,}$/; // generic long id/token
    return uuid.test(seg) || firebasePush.test(seg) || longToken.test(seg);
  };

  const formatSegment = (seg) =>
    seg
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Get ONLY the first meaningful segment (skip IDs and common action keywords)
  // Example: /inventory/items/-OdkyZN0HJQD9x6ctlV6 -> "Inventory"
  const pageTitle = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    const firstMeaningful =
      segments.find(
        (s) =>
          !isLikelyId(s) &&
          !["new", "edit", "create", "update"].includes(s.toLowerCase())
      ) || "Dashboard";

    return formatSegment(firstMeaningful);
  }, [location.pathname]);

  return (
    <header
      className={`app-header ${isCollapsed ? "app-header--collapsed" : ""}`}
      role="banner"
      aria-label="Application header"
    >
      <div className="app-header__container container">
        <div className="app-header__content">
          <div className="app-header__text">
            <h1 className="app-header__title">{pageTitle}</h1>
          </div>

          <button
            className="app-header__icon"
            aria-label="Toggle dark mode"
            type="button"
          >
            <FiMoon size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
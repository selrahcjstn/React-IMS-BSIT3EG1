import "./page-content-layout.css";

function PageContentLayout({ children, isCollapsed }) {
  return (
    <div className={`layout__content ${isCollapsed ? "layout__content--collapsed" : ""}`}>
      {children}
    </div>
  );
}

export default PageContentLayout;

import './page-layout.css'

function PageLayout({children}) {
  return (
    <div className="layout">
        {children}
    </div>
  )
}

export default PageLayout
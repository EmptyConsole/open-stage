import styles from "./page.module.css";
import "./globals.css";
export default function HomePage() {
  return (
    
    <body className="main">
      <aside className="sidebar">
        <div style={{padding: "65px 16px", color: "#222" }}>Sidebar content goes here</div>
      </aside>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="header-container"> 
          <div className="header-bar"></div>
        </header>
        {/* Main content goes here */}
      </div>
    </body>
  );
}
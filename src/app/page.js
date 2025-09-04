import styles from "./page.module.css";
import "./globals.css";
export default function HomePage() {
  return (
    
    <main className="main">
      <aside className="sidebar">
        <div className="sidebar-content">
          <div style={{ color: "#222" }}>Sidebar content goes here</div>
        </div>
      </aside>
      <div className="header_main">
        <header className="header-container"> 
          <div className="header-bar">
            <div>Header content goes here</div>
          </div>
            <div style={{padding: "65px 16px", color: "#ffff" }}>Main content goes here</div>
        </header>
          
      </div>
    </main>
  );
}
import styles from "./page.module.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
export default function HomePage() {
  return (
    
    <main className="main">
      <Sidebar content={"Hello, world!"}/>
      <div className="header_main">
        <header className="header-container"> 
          <div className="header-bar">
            <div>Header content goes here</div>
          </div>
            <div className="main-content">Main content goes here</div>
        </header>
          
      </div>
    </main>
  );
}
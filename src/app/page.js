import styles from "./page.module.css";
import "./globals.css";
export default function HomePage() {
  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100vh" }}>
      <header className="header-container">
        <div className="header-bar"></div>
      </header>
    </main>
  );
}
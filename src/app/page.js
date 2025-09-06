import styles from "./page.module.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar>
          <div>
            <p>Lucas is cool!</p>
            <h1>Hello!</h1>
            <button>Click Me</button>
          </div>
        </Sidebar>
        <main
          style={{
            flex: 1,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          <div className="main-content">Main content goes here</div>
        </main>
      </div>
    </div>
  );
}

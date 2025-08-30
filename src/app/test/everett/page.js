// import "./page.module.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
export default function HomePage() {
  return (
    <main>
      <Header />
      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1>Welcome to Everetts page</h1>
        </div>
      </div>
    </main>
  );
}

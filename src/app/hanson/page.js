import Sidebar from "@/components/sidebar.js";
import styles from "./components/stuff.module.css";
export default function HomePage() {
  return (
    <div className = {styles.flex}>
      <Sidebar />
      <main className = {styles.main}>
        <h1 className = {styles.hfang}>Welcome to .Fragmented_HF_ang.'s Page!!!</h1>
      </main>
    </div>
  );
}
import styles from "./sidebar.module.css";
export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.sidebarText}>Working Sidebar!!!</p>
    </aside>
  );
}
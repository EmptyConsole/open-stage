import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <h1>This is my test homepage</h1>
      <div className={styles.sidebar}>
        {/* Sidebar to the left */}
        <div className={styles.elements}>
          <h1>SIDEBAR</h1>
          <h1>SIDEBAR</h1>
          <h1>SIDEBAR</h1>
          <h1>SIDEBAR</h1>
        </div>
        {/* Body content to the right */}
        <div className={styles.elementsButBetter}>
          <h1>Welcome to my homepage. This is some placeholder body text.</h1>
        </div>
      </div>
    </main>
  );
}

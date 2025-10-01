import { colors } from '../styles/colors';

export default function Sidebar({ children }) {
  return (
    <aside
      style={{
        width: "330px",
        height: "100vh",
        backgroundColor: "var(--sidebar-background)",
        boxShadow: "2px 0 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
        position: "relative",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div style={{ padding: "65px 16px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            textJustify: "center",
            color: colors.black,
          }}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}

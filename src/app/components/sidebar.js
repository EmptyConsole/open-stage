import { colors } from '../styles/colors';

export default function Sidebar({ children }) {
  return (
    <aside
      style={{
        width: "330px",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: colors.sidebarBackground,
        borderRight: `1px solid ${colors.sidebarBorder}`,
        position: "sticky",
        top: "64px",
        alignSelf: "flex-start",
        boxSizing: "border-box",
      }}
      className="sidebar"
    >
      <div style={{ padding: "24px 16px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: colors.textPrimary,
          }}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}

import { colors } from '../styles/colors';

export default function MainContentHeader({ children }) {
  return (
    <h2
      style={{
        color: colors.primary,
        fontWeight: "bold",
        fontSize: "25px",
        margin: "0 0 16px 0",
      }}
    >
      {children}
    </h2>
  );
}

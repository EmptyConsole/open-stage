import Link from 'next/link';

export default function Header() {
  return (
    <h1
      className="header-bar"
      style={{
        padding: "16px 32px",
        color: "white",
        backgroundColor: "rgba(31, 70, 117, 1)",
        marginLeft: "100px",
        fontSize: "30px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      <Link href="/" style={{ color: "white", textDecoration: "none" }}>
        OpenStage
      </Link>
    </h1>
  );
}

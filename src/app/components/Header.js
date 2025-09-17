import Link from 'next/link';

export default function Header() {
  return (
    <div
      style={{
        padding: "16px 32px",
        color: "white",
        backgroundColor: "rgba(31, 70, 117, 1)",
        fontSize: "30px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Link href="/" style={{ color: "white", textDecoration: "none", fontSize: "30px", fontWeight: "bold" }}>
        OpenStage
      </Link>
      <div style={{
        // padding: "16px 32px",
        color: "white",
        backgroundColor: "rgba(31, 70, 117, 1)",
        fontSize: "30px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "30%",
        // boxSizing: "border-box",
      }}>
        <Link href="/viewtickets" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
          View Tickets
        </Link>
        <Link href="/localconcertmap" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
          Nearby Concerts
        </Link>
        <Link href="/aboutus" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
          About Us
        </Link>
      </div>
    </div>
  );
}

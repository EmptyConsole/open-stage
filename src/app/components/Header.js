import Link from 'next/link';

export default function Header() {
  return (
    // The header is fixed at the top. Add paddingTop: 72px (header height) to your main layout or page content to prevent overlap.
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
        // position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        height: "72px",
        minHeight: "72px",
        maxHeight: "72px",
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

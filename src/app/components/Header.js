"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { colors } from '../styles/colors';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/signin");
  };
  return (
    // The header is fixed at the top. Add paddingTop: 72px (header height) to your main layout or page content to prevent overlap.
    <div
      style={{
        padding: "16px 32px",
        color: "white",
        backgroundColor: colors.header,
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
      <Link href="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "30px", fontWeight: "bold" }}>
        OpenStage
      </Link>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
        width: "40%",
      }}>
        <Link 
          href="/viewtickets" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "18px", 
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          View Tickets
        </Link>
        <Link 
          href="/localconcertmap" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "18px", 
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Nearby Concerts
        </Link>
        <Link 
          href="/aboutus" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "18px", 
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          About Us
        </Link>
        <button 
          onClick={handleLogout}
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "18px", 
            fontWeight: "bold",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

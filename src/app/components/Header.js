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
      <Link 
        href="/dashboard" 
        style={{ 
          color: "white", 
          textDecoration: "none", 
          fontSize: "30px", 
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          padding: "8px 12px",
          borderRadius: "6px",
          transition: "background-color 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        <img 
          src="/music-note.svg" 
          alt="Music note" 
          style={{ 
            width: "36px", 
            height: "36px",
            filter: "brightness(0) invert(1)" // Makes the icon white
          }} 
        />
        OpenStage
      </Link>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px",
        flex: "1",
        minWidth: "0",
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
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm1 0v8h10V4H3zm2 1h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/>
          </svg>
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
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"/>
          </svg>
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
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.428l-1 4.105c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          About Us
        </Link>
        <button 
          onClick={handleLogout}
          style={{ 
            color: "#d32f2f", 
            textDecoration: "none", 
            fontSize: "14px", 
            fontWeight: "bold",
            background: "#ffebee",
            border: "2px solid #d32f2f",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ffcdd2";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ffebee";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5zM10.854 6.5a.5.5 0 0 1 0 .708L7.707 10l3.147 2.792a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

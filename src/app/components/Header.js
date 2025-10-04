"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { colors } from '../styles/colors';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent('userLogout'));
    router.push("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="desktop-only"
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
          top: 0,
          left: 0,
          zIndex: 1000,
          height: "72px",
          minHeight: "72px",
          maxHeight: "72px",
          paddingLeft: "8px",
          paddingRight: "32px",
        }}
      >
            <Link 
              href="/dashboard" 
              style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: "32px", 
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "8px 12px",
              borderRadius: "6px",
              transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
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
            fontSize: "14px", 
            fontWeight: "bold",
            backgroundColor: "#ffebee",
            border: "2px solid #d32f2f",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: "4px",
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            outline: "none",
            boxSizing: "border-box",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            boxShadow: "none",
            textDecoration: "none",
            position: "relative",
            overflow: "hidden"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.setProperty('background-color', '#ffcdd2', 'important');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty('background-color', '#ffebee', 'important');
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

      {/* Mobile Header */}
      <div className="mobile-only"
        style={{
          padding: "8px 12px",
          color: "white",
          backgroundColor: colors.header,
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          top: 0,
          left: 0,
          zIndex: 1000,
          height: "56px",
          minHeight: "56px",
          maxHeight: "56px",
          position: "sticky",
        }}
      >
        <Link 
          href="/dashboard" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "16px", 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <img 
            src="/music-note.svg" 
            alt="Music note" 
            style={{ 
              width: "20px", 
              height: "20px",
              filter: "brightness(0) invert(1)",
              flexShrink: 0,
            }} 
          />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            OpenStage
          </span>
        </Link>
        
        <button 
          onClick={toggleMobileMenu}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            minWidth: "32px",
            height: "32px",
          }}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-only"
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            backgroundColor: colors.header,
            zIndex: 999,
            padding: "12px 16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            maxHeight: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link 
              href="/viewtickets" 
              style={{ 
                color: "white", 
                textDecoration: "none", 
                fontSize: "16px", 
                fontWeight: "500",
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onClick={() => setIsMobileMenuOpen(false)}
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
                fontSize: "16px", 
                fontWeight: "500",
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onClick={() => setIsMobileMenuOpen(false)}
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
                fontSize: "16px", 
                fontWeight: "500",
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.428l-1 4.105c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
              About Us
            </Link>
            <button 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              style={{ 
                color: "#d32f2f", 
                fontSize: "14px", 
                fontWeight: "bold",
                backgroundColor: "#ffebee",
                border: "2px solid #d32f2f",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                outline: "none",
                marginTop: "8px",
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
      )}
    </>
  );
}

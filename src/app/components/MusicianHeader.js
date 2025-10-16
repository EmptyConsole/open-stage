"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { colors } from '../styles/colors';

export default function MusicianHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* The header is fixed at the top. Add paddingTop: 72px (header height) to your main layout or page content to prevent overlap. */}
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
          paddingLeft: "8px", // shifted left
          paddingRight: "32px", // keep right padding
        }}
      >
            <Link 
              href="/artistcreateconcert" 
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
        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            flex: "1",
            minWidth: "0",
          }}>
            <Link 
              href="/concertstats" 
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
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zM2 1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm1 3h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
              </svg>
              Concert Stats
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
              href="/dashboard" 
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
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              Other Artists
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
        )}

        {/* Mobile Hamburger Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              outline: "none"
            }}
            aria-label="Toggle mobile menu"
          >
            <div style={{
              width: "24px",
              height: "3px",
              backgroundColor: "white",
              transition: "all 0.3s ease",
              transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
            }} />
            <div style={{
              width: "24px",
              height: "3px",
              backgroundColor: "white",
              transition: "all 0.3s ease",
              opacity: isMobileMenuOpen ? "0" : "1"
            }} />
            <div style={{
              width: "24px",
              height: "3px",
              backgroundColor: "white",
              transition: "all 0.3s ease",
              transform: isMobileMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
            }} />
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.header,
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "16px"
        }}>
          <Link 
            href="/concertstats" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: "20px", 
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zM2 1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm1 3h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
            </svg>
            Concert Stats
          </Link>
          <Link 
            href="/localconcertmap" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: "20px", 
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"/>
            </svg>
            Nearby Concerts
          </Link>
          <Link 
            href="/dashboard" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: "20px", 
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            Other Artists
          </Link>
          <Link 
            href="/aboutus" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: "white", 
              textDecoration: "none", 
              fontSize: "20px", 
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
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
              fontSize: "18px", 
              fontWeight: "bold",
              backgroundColor: "#ffebee",
              border: "2px solid #d32f2f",
              cursor: "pointer",
              padding: "16px",
              borderRadius: "8px",
              transition: "background-color 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "12px",
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
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5zM10.854 6.5a.5.5 0 0 1 0 .708L7.707 10l3.147 2.792a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z"/>
            </svg>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

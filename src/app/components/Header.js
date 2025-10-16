"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { colors } from "../styles/colors";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Dummy user info, replace with real user data
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "/window.svg"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Replace with real logout logic
    router.push("/login");
  };

  const handleAvatarClick = () => {
    setIsProfileOpen(true);
    setIsEditing(false);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleProfileSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  return (
    <div>
      {/* Header Bar */}
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
        {/* Logo */}
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
            transition: "transform 0.2s ease",
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
              filter: "brightness(0) invert(1)",
            }}
          />
          OpenStage
        </Link>

        {/* Navigation and Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
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
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.428l-1 4.105c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                About Us
              </Link>
            </div>
          )}

          {/* Avatar Button (always visible) */}
          <button
            onClick={handleAvatarClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginRight: !isMobile ? "8px" : "0px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="View profile"
          >
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid white",
                objectFit: "cover",
              }}
            />
          </button>

          {/* Logout Button (always visible) */}
          <button
            onClick={handleLogout}
            style={{
              color: "white",
              background: "none",
              border: "none",
              fontSize: !isMobile ? "18px" : "20px",
              fontWeight: "bold",
              padding: !isMobile ? "8px 16px" : "16px",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5zM10.854 6.5a.5.5 0 0 1 0 .708L7.707 10l3.147 2.792a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z" />
            </svg>
            Logout
          </button>

          {/* Hamburger for mobile */}
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
                outline: "none",
              }}
              aria-label="Toggle mobile menu"
            >
              <div
                style={{
                  width: "24px",
                  height: "3px",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "3px",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  opacity: isMobileMenuOpen ? "0" : "1",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "3px",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  transform: isMobileMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none",
                }}
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
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
            gap: "16px",
          }}
        >
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
            }}
          >
            Nearby Concerts
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
            }}
          >
            About Us
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            style={{
              color: "white",
              background: "none",
              border: "none",
              fontSize: "20px",
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            style={{
              background: "#222",
              color: "white",
              borderRadius: "16px",
              padding: "32px 24px",
              minWidth: "320px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid white", marginBottom: "16px" }}
            />
            {!isEditing ? (
              <div>
                <h2 style={{ margin: "0 0 8px 0" }}>{user.name}</h2>
                <p style={{ margin: "0 0 16px 0" }}>{user.email}</p>
                <button
                  style={{ background: colors.header, color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", marginRight: "8px" }}
                  onClick={() => setIsEditing(true)}
                >Edit Profile</button>
                <button
                  style={{ background: "#444", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}
                  onClick={() => setIsProfileOpen(false)}
                >Close</button>
              </div>
            ) : (
              <div>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  Name:
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #888", marginTop: "4px" }}
                  />
                </label>
                <label style={{ display: "block", marginBottom: "16px" }}>
                  Email:
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #888", marginTop: "4px" }}
                  />
                </label>
                <button
                  style={{ background: colors.header, color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", marginRight: "8px" }}
                  onClick={handleProfileSave}
                >Save</button>
                <button
                  style={{ background: "#444", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer" }}
                  onClick={() => setIsEditing(false)}
                >Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { colors } from "../styles/colors";

// SVG Icons for professional look
const Icons = {
  Music: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  MapPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Heart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  BarChart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Building: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function UnifiedHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
    userType: "audience",
  });

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      if (!nowMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Load user data
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name || "Guest",
            email: parsedUser.email || "guest@example.com",
            userType: parsedUser.userType || "audience",
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
    window.addEventListener("userLogin", loadUserData);
    window.addEventListener("userLogout", loadUserData);

    return () => {
      window.removeEventListener("userLogin", loadUserData);
      window.removeEventListener("userLogout", loadUserData);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent("userLogout"));
    router.push("/signin");
  };

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: "/aboutus", label: "About", icon: Icons.Info }
    ];

    if (user.userType === "musician" || user.userType === "artist") {
      return [
        { href: "/artistcreateconcert", label: "My Concerts", icon: Icons.Music },
        { href: "/concertstats", label: "Statistics", icon: Icons.BarChart },
        { href: "/dashboard", label: "Discover", icon: Icons.Search },
        { href: "/donations", label: "Support", icon: Icons.Heart },
        ...baseLinks,
      ];
    } else if (user.userType === "venue") {
      return [
        { href: "/venuedashboard", label: "Dashboard", icon: Icons.Building },
        { href: "/donations", label: "Support", icon: Icons.Heart },
        ...baseLinks,
      ];
    } else {
      return [
        { href: "/dashboard", label: "Discover", icon: Icons.Search },
        { href: "/localconcertmap", label: "Nearby", icon: Icons.MapPin },
        { href: "/donations", label: "Support", icon: Icons.Heart },
        ...baseLinks,
      ];
    }
  };

  const isActive = (path) => pathname === path;

  const navLinks = getNavigationLinks();
  const homeLink =
    user.userType === "musician" || user.userType === "artist"
      ? "/artistcreateconcert"
      : user.userType === "venue"
      ? "/venuedashboard"
      : "/dashboard";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: colors.header,
        borderBottom: `1px solid ${colors.headerBorder}`,
        zIndex: 1000,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "100%",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href={homeLink}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: colors.headerText,
            fontSize: "20px",
            fontWeight: 700,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div style={{ display: "flex", alignItems: "center", color: colors.primary }}>
            <Icons.Music />
          </div>
          <span>OpenStage</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: isActive(link.href) ? colors.primary : colors.headerText,
                    backgroundColor: isActive(link.href) ? colors.primaryLight : "transparent",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.backgroundColor = colors.lightGray;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <IconComponent />
                  {link.label}
                </Link>
              );
            })}

            {/* Profile & Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "12px", paddingLeft: "12px", borderLeft: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setIsProfileOpen(true)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: colors.headerText,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.lightGray)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <Icons.User />
                Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: colors.primary,
                  color: colors.white,
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
              >
                <Icons.LogOut />
                Logout
              </button>
            </div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: colors.headerText,
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.header,
            padding: "16px",
            overflowY: "auto",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: isActive(link.href) ? colors.primary : colors.headerText,
                    backgroundColor: isActive(link.href) ? colors.primaryLight : "transparent",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  <IconComponent />
                  {link.label}
                </Link>
              );
            })}
            <div style={{ height: "1px", backgroundColor: colors.border, margin: "8px 0" }} />
            <button
              onClick={() => {
                setIsProfileOpen(true);
                setIsMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "transparent",
                color: colors.headerText,
                fontSize: "16px",
                fontWeight: 500,
                width: "100%",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Icons.User />
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: colors.primary,
                color: colors.white,
                fontSize: "16px",
                fontWeight: 600,
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Icons.LogOut />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "20px",
          }}
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "16px",
              padding: isMobile ? "24px" : "32px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, color: colors.textPrimary, fontSize: "24px", fontWeight: 700 }}>
                Profile
              </h2>
              <button
                onClick={() => setIsProfileOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: colors.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icons.X />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <p style={{ margin: "0 0 8px 0", color: colors.textSecondary, fontSize: "13px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Name</p>
                <p style={{ margin: 0, color: colors.textPrimary, fontSize: "16px", fontWeight: 500 }}>{user.name}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px 0", color: colors.textSecondary, fontSize: "13px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</p>
                <p style={{ margin: 0, color: colors.textPrimary, fontSize: "16px", fontWeight: 500 }}>{user.email}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px 0", color: colors.textSecondary, fontSize: "13px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>Account Type</p>
                <div style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  backgroundColor: colors.primaryLight,
                  color: colors.primary,
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "capitalize"
                }}>
                  {user.userType}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsProfileOpen(false)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: colors.primary,
                color: colors.white,
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "24px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

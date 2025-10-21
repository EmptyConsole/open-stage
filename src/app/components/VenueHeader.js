"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { firestore, auth } from '../../../util/firebase';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function VenueHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  // User info from localStorage
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    userType: "general",
    avatar: "/window.svg"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordMessage, setPasswordMessage] = useState({
    text: "",
    type: "" // "success", "error", "warning"
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name || "Guest User",
            email: parsedUser.email || "guest@example.com",
            userType: parsedUser.userType || "general",
            avatar: "/window.svg"
          });
          setEditName(parsedUser.name || "Guest User");
          setEditEmail(parsedUser.email || "guest@example.com");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();

    // Listen for user login/logout events
    const handleUserChange = () => {
      loadUserData();
    };

    window.addEventListener('userLogin', handleUserChange);
    window.addEventListener('userLogout', handleUserChange);

    return () => {
      window.removeEventListener('userLogin', handleUserChange);
      window.removeEventListener('userLogout', handleUserChange);
    };
  }, []);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent arrow keys, page up/down, home, end from scrolling
      if (isProfileOpen && [32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    if (isProfileOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown, { passive: false });
    } else {
      // Restore background scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Remove keyboard event listener
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent('userLogout'));
    router.push("/signin");
  };

  const handleAvatarClick = () => {
    setIsProfileOpen(true);
    setIsEditing(false);
    setIsChangePasswordOpen(false);
    setEditName(user.name);
    setEditEmail(user.email);
    setPasswordMessage({ text: "", type: "" });
  };

  const handleProfileSave = () => {
    // Update localStorage with new user data
    const updatedUser = { ...user, name: editName, email: editEmail };
    setUser(updatedUser);

    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const updatedUserData = { ...parsedUser, name: editName, email: editEmail };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    }

    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Clear any existing messages
    setPasswordMessage({ text: "", type: "" });

    // Validate inputs
    if (
      !changePasswordData.currentPassword ||
      !changePasswordData.newPassword ||
      !changePasswordData.confirmPassword
    ) {
      setPasswordMessage({ text: "Please fill in all password fields", type: "error" });
      return;
    }

    if (changePasswordData.newPassword.length < 6) {
      setPasswordMessage({ text: "New password must be at least 6 characters long", type: "error" });
      return;
    }

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setPasswordMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    (async () => {
      try {
        setPasswordMessage({ text: "Verifying current password...", type: "warning" });

        let currentUser = auth.currentUser;
        if (!currentUser) {
          await signInWithEmailAndPassword(auth, user.email, changePasswordData.currentPassword);
          currentUser = auth.currentUser;
        } else {
          const credential = EmailAuthProvider.credential(user.email, changePasswordData.currentPassword);
          await reauthenticateWithCredential(currentUser, credential);
          currentUser = auth.currentUser;
        }

        if (!currentUser) throw new Error('Unable to verify user session.');

        await updatePassword(currentUser, changePasswordData.newPassword);

        setPasswordMessage({ text: "Password changed successfully!", type: "success" });
        setTimeout(() => {
          setChangePasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
          setIsChangePasswordOpen(false);
          setPasswordMessage({ text: "", type: "" });
        }, 2000);
      } catch (err) {
        console.error('Password change error:', err);
        let message = 'Failed to change password. Please check your current password.';
        if (err && err.code) {
          if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            message = 'Current password is incorrect.';
          } else if (err.code === 'auth/weak-password') {
            message = 'New password is too weak.';
          } else if (err.code === 'auth/requires-recent-login') {
            message = 'Please sign out and sign in again, then try changing your password.';
          }
        }
        setPasswordMessage({ text: message, type: 'error' });
      }
    })();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const clearPasswordMessage = () => {
    setPasswordMessage({ text: "", type: "" });
  };

  // Helper function to check if a page is active
  const isActivePage = (path) => {
    return pathname === path;
  };

  // Helper function to get link styles based on active state
  const getLinkStyles = (path) => {
    const isActive = isActivePage(path);
    return {
      color: isActive ? "#1976d2" : "white",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "8px 16px",
      borderRadius: "4px",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: isActive ? "white" : "transparent",
    };
  };

  // Helper function to get logo styles based on active state
  const getLogoStyles = () => {
    const isActive = isActivePage("/venuedashboard");
    return {
      color: isActive ? "#1976d2" : "white",
      textDecoration: "none",
      fontSize: "30px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "8px 12px",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      backgroundColor: isActive ? "white" : "transparent",
    };
  };

  // Helper function to get mobile menu link styles based on active state
  const getMobileLinkStyles = (path) => {
    const isActive = isActivePage(path);
    return {
      color: isActive ? "#1976d2" : "white",
      textDecoration: "none",
      fontSize: "20px",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      transition: "background-color 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: isActive ? "white" : "transparent",
    };
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
        }}
      >
      <Link 
        href="/venuedashboard" 
        style={getLogoStyles()}
        onMouseEnter={(e) => {
          if (!isActivePage("/venuedashboard")) {
            e.currentTarget.style.transform = "scale(1.08)";
          }
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
            filter: isActivePage("/venuedashboard") ? "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(200deg) brightness(0.8) contrast(1.2)" : "brightness(0) invert(1)"
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
              href="/donations" 
              style={getLinkStyles("/donations")}
              onMouseEnter={(e) => {
                if (!isActivePage("/donations")) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActivePage("/donations")) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
              </svg>
              Donations
            </Link>
            <Link 
              href="/aboutus" 
              style={getLinkStyles("/aboutus")}
              onMouseEnter={(e) => {
                if (!isActivePage("/aboutus")) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActivePage("/aboutus")) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.428l-1 4.105c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
              About Us
            </Link>
            {/* Logout Button (always visible) */}
            <button
              onClick={handleLogout}
              style={{
                color: "white",
                background: "none",
                border: "none",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "8px 16px",
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

            {/* Profile Button (always visible) */}
            <button
              onClick={handleAvatarClick}
              style={{
                color: "white",
                background: "none",
                border: "none",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "8px 16px",
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
              aria-label="View profile"
            >
              <img
                src={user.avatar}
                alt="Profile"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "1px solid white",
                  objectFit: "cover",
                }}
              />
              Profile
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
            href="/donations" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={getMobileLinkStyles("/donations")}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
            Donations
          </Link>
          <Link 
            href="/aboutus" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={getMobileLinkStyles("/aboutus")}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.428l-1 4.105c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            About Us
          </Link>
          <button
            onClick={() => {
              handleAvatarClick();
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
            <img
              src={user.avatar}
              alt="Profile"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: "1px solid white",
                objectFit: "cover",
              }}
            />
            Profile
          </button>
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
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5zM10.854 6.5a.5.5 0 0 1 0 .708L7.707 10l3.147 2.792a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z"/>
            </svg>
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
            padding: "20px",
            overflow: "auto",
          }}
          onClick={() => {
            setIsProfileOpen(false);
            setIsChangePasswordOpen(false);
            setPasswordMessage({ text: "", type: "" });
          }}
          onWheel={(e) => {
            // Prevent scroll events from reaching the background
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // Prevent touch scroll events from reaching the background
            e.stopPropagation();
          }}
        >
          <div
            style={{
              background: "white",
              color: "#333",
              borderRadius: "12px",
              padding: "32px",
              minWidth: "400px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              position: "relative",
              margin: "auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setIsProfileOpen(false);
                setIsChangePasswordOpen(false);
                setPasswordMessage({ text: "", type: "" });
              }}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              ×
            </button>

            {/* Profile Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <img
                src={user.avatar}
                alt="Avatar"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "3px solid #1976d2",
                  marginBottom: "16px"
                }}
              />
              <h2 style={{
                margin: "0 0 8px 0",
                color: "#1976d2",
                fontSize: "24px",
                fontWeight: "bold"
              }}>
                {user.name}
              </h2>
              <p style={{
                margin: "0 0 8px 0",
                color: "#666",
                fontSize: "16px"
              }}>
                {user.email}
              </p>
              <div style={{
                display: "inline-block",
                background: "#e3f2fd",
                color: "#1976d2",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize"
              }}>
                {user.userType}
              </div>
            </div>

            {/* Profile Content */}
            {!isChangePasswordOpen ? (
              !isEditing ? (
                <div>
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "24px"
                  }}>
                    <button
                      style={{
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 24px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onClick={() => setIsEditing(true)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#1565c0"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#1976d2"}
                    >
                      Edit Profile
                    </button>
                    <button
                      style={{
                        background: "#f5f5f5",
                        color: "#333",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "12px 24px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onClick={() => setIsChangePasswordOpen(true)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{
                    margin: "0 0 20px 0",
                    color: "#1976d2",
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}>
                    Edit Profile
                  </h3>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#333",
                      fontWeight: "500"
                    }}>
                      Name:
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#333",
                      fontWeight: "500"
                    }}>
                      Email:
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end"
                  }}>
                    <button
                      style={{
                        background: "#f5f5f5",
                        color: "#333",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "12px 24px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onClick={() => setIsEditing(false)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 24px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onClick={handleProfileSave}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#1565c0"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#1976d2"}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div>
                <h3 style={{
                  margin: "0 0 20px 0",
                  color: "#1976d2",
                  fontSize: "20px",
                  fontWeight: "bold"
                }}>
                  Change Password
                </h3>
                
                {/* Message Display */}
                {passwordMessage.text && (
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    backgroundColor: passwordMessage.type === "success" ? "#e8f5e8" : 
                                   passwordMessage.type === "error" ? "#ffeaea" : "#fff3cd",
                    color: passwordMessage.type === "success" ? "#2e7d32" : 
                           passwordMessage.type === "error" ? "#d32f2f" : "#856404",
                    border: `1px solid ${passwordMessage.type === "success" ? "#c8e6c9" : 
                                        passwordMessage.type === "error" ? "#ffcdd2" : "#ffeaa7"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span style={{ fontSize: "16px" }}>
                      {passwordMessage.type === "success" ? "✓" : 
                       passwordMessage.type === "error" ? "✕" : "⚠"}
                    </span>
                    {passwordMessage.text}
                  </div>
                )}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#333",
                    fontWeight: "500"
                  }}>
                    Current Password:
                  </label>
                  <input
                    type="password"
                    value={changePasswordData.currentPassword}
                    onChange={e => {
                      setChangePasswordData({...changePasswordData, currentPassword: e.target.value});
                      clearPasswordMessage();
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontSize: "16px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#333",
                    fontWeight: "500"
                  }}>
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={changePasswordData.newPassword}
                    onChange={e => {
                      setChangePasswordData({...changePasswordData, newPassword: e.target.value});
                      clearPasswordMessage();
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontSize: "16px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#333",
                    fontWeight: "500"
                  }}>
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    value={changePasswordData.confirmPassword}
                    onChange={e => {
                      setChangePasswordData({...changePasswordData, confirmPassword: e.target.value});
                      clearPasswordMessage();
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      fontSize: "16px",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end"
                }}>
                  <button
                    style={{
                      background: "#f5f5f5",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}
                    onClick={() => {
                      setIsChangePasswordOpen(false);
                      setChangePasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setPasswordMessage({ text: "", type: "" });
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      background: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s"
                    }}
                    onClick={handleChangePassword}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#1565c0"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#1976d2"}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

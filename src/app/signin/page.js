"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors } from "../styles/colors";
import { createUser } from "../../../util/users";
import { auth } from "../../../util/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../util/firebase";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUserData = async (email) => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
      const userData = await fetchUserData(signInData.email);

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new CustomEvent("userLogin"));

        // Route based on user type
        if (userData.userType === "musician" || userData.userType === "artist") {
          router.push("/artistcreateconcert");
        } else if (userData.userType === "venue") {
          router.push("/venuedashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!signUpData.displayName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!signUpData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!signUpData.userType) {
      setError("Please select an account type");
      return;
    }

    setIsLoading(true);

    try {
      await createUser({
        name: signUpData.displayName,
        email: signUpData.email,
        password: signUpData.password,
        userType: signUpData.userType,
      });

      // Auto sign in after signup
      await signInWithEmailAndPassword(auth, signUpData.email, signUpData.password);
      const userData = await fetchUserData(signUpData.email);

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new CustomEvent("userLogin"));

        if (userData.userType === "musician" || userData.userType === "artist") {
          router.push("/artistcreateconcert");
        } else if (userData.userType === "venue") {
          router.push("/venuedashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { value: "audience", label: "Audience Member", description: "Discover and attend concerts" },
    { value: "musician", label: "Musician/Artist", description: "Showcase your music and concerts" },
    { value: "venue", label: "Venue", description: "Manage your concert venue" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundSecondary,
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: colors.white,
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
          padding: isMobile ? "32px 24px" : "48px 40px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: colors.textPrimary }}>
              OpenStage
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: "16px", color: colors.textSecondary }}>
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: `${colors.error}15`,
              border: `1px solid ${colors.error}`,
              marginBottom: "24px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px", color: colors.error, fontWeight: 500 }}>
              {error}
            </p>
          </div>
        )}

        {/* Sign In Form */}
        {!isSignUp ? (
          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                color: colors.white,
                backgroundColor: colors.primary,
                border: "none",
                borderRadius: "8px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = colors.primaryHover)}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = colors.primary)}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Full Name
              </label>
              <input
                type="text"
                name="displayName"
                value={signUpData.displayName}
                onChange={(e) => setSignUpData({ ...signUpData, displayName: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: 600, color: colors.textPrimary }}>
                Account Type
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {userTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => setSignUpData({ ...signUpData, userType: type.value })}
                    style={{
                      padding: "12px 16px",
                      border: `2px solid ${signUpData.userType === type.value ? colors.primary : colors.border}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: signUpData.userType === type.value ? colors.primaryLight : colors.white,
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: "2px" }}>
                      {type.label}
                    </div>
                    <div style={{ fontSize: "13px", color: colors.textSecondary }}>
                      {type.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                color: colors.white,
                backgroundColor: colors.primary,
                border: "none",
                borderRadius: "8px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = colors.primaryHover)}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = colors.primary)}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* Toggle Sign In/Up */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "14px", color: colors.textSecondary }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              style={{
                background: "none",
                border: "none",
                color: colors.primary,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

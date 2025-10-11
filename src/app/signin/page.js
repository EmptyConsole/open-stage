"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./signin.css";
import "../styles/shared-background.css";
import { createUser } from "../../../util/users";
import { firestore } from "../../../util/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false); // track SVG load error
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
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
        const userDoc = querySnapshot.docs[0];
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (userType) => {
    setSignUpData((prev) => ({ ...prev, userType }));
  };

  const validateSignUpForm = () => {
    if (!signUpData.displayName.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!signUpData.email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!signUpData.password) {
      setError("Please enter a password");
      return false;
    }
    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!signUpData.userType) {
      setError(
        "Please select whether you are a musician, audience member, or venue"
      );
      return false;
    }
    return true;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (signInData.email && signInData.password) {
        const userData = await fetchUserData(signInData.email);

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: signInData.email,
            name: userData?.displayName || signInData.email.split("@")[0],
            userType: userData?.userType || "general",
          })
        );

        window.dispatchEvent(new CustomEvent("userLogin"));

        const userType = userData?.userType || "general";
        if (userType === "venue") router.push("/venuedashboard");
        else if (userType === "musician") router.push("/artistcreateconcert");
        else router.push("/dashboard");
      } else {
        setError("Please fill in all fields");
      }
    } catch {
      setError("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateSignUpForm()) return;

    setIsLoading(true);

    try {
      const result = await createUser(
        signUpData.email,
        signUpData.password,
        signUpData.displayName,
        signUpData.userType
      );

      if (result.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: signUpData.email,
            name: signUpData.displayName,
            userType: signUpData.userType,
          })
        );

        window.dispatchEvent(new CustomEvent("userLogin"));

        if (signUpData.userType === "venue") router.push("/venuedashboard");
        else if (signUpData.userType === "musician")
          router.push("/artistcreateconcert");
        else router.push("/dashboard");
      } else {
        setError(result.error || "Sign up failed. Please try again.");
      }
    } catch {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignUp = () => {
    setError("");
    setIsSignUp(true);
  };

  const switchToSignIn = () => {
    setError("");
    setIsSignUp(false);
    setShowForgotPassword(false);
    setForgotPasswordMessage("");
  };

  const switchToForgotPassword = () => {
    setError("");
    setShowForgotPassword(true);
    setForgotPasswordMessage("");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordMessage("");

    if (!forgotPasswordEmail.trim()) {
      setForgotPasswordMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setForgotPasswordMessage(
        "Password reset instructions have been sent to your email address."
      );

      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
        setForgotPasswordMessage("");
      }, 3000);
    } catch {
      setForgotPasswordMessage(
        "Failed to send reset instructions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
  };

  const renderHeaderIcon = () => {
    return !imageError ? (
      <Image
        src="/music-note.svg"
        alt="Music note"
        width={48}
        height={48}
        onError={() => setImageError(true)}
        style={{ display: "block", margin: "0 auto 16px auto" }}
      />
    ) : (
      <div
        style={{
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#1976d2", // blue
          margin: "0 auto 16px auto",
        }}
      >
        🎵
      </div>
    );
  };

  return (
    <div className={`auth-container ${isMobile ? "mobile" : ""}`}>
      <div
        className={`auth-wrapper ${
          isSignUp
            ? "signup-mode"
            : showForgotPassword
            ? "forgot-password-mode"
            : ""
        } ${isMobile ? "mobile" : ""}`}
      >
        {/* Sign In Card */}
        <div
          className={`auth-card signin-card ${
            isSignUp ? "slide-left" : showForgotPassword ? "slide-left" : "slide-center"
          }`}
        >
          <div className="signin-header">
            {renderHeaderIcon()}
            <h1>Welcome to Open Stage</h1>
            <p>Sign in to discover amazing concerts and manage your tickets</p>
          </div>

          <form onSubmit={handleSignInSubmit} className="signin-form">
            {error && !isSignUp && !showForgotPassword && (
              <div className="error-message">{error}</div>
            )}

            <div className="form-group">
              <label htmlFor="signin-email">Email Address</label>
              <input
                type="email"
                id="signin-email"
                name="email"
                value={signInData.email}
                onChange={handleSignInChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signin-password">Password</label>
              <input
                type="password"
                id="signin-password"
                name="password"
                value={signInData.password}
                onChange={handleSignInChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              onClick={switchToSignUp}
              className="create-account-button"
            >
              Create New Account
            </button>
          </form>

          <div className="signin-footer">
            <button onClick={switchToForgotPassword} className="forgot-password">
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div
          className={`auth-card forgot-password-card ${
            showForgotPassword ? "slide-center" : "slide-right"
          }`}
        >
          <div className="signin-header">{renderHeaderIcon()}</div>
          <h1>Reset Password</h1>
          <p>Enter your email address and we'll send you reset instructions</p>

          <form onSubmit={handleForgotPassword} className="signin-form">
            {forgotPasswordMessage && (
              <div
                className={`message ${
                  forgotPasswordMessage.includes("sent") ? "success-message" : "error-message"
                }`}
              >
                {forgotPasswordMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="forgot-email">Email Address</label>
              <input
                type="email"
                id="forgot-email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="signin-button" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="signin-footer">
            <button onClick={handleBackToSignIn} className="back-to-signin">
              ← Back to Sign In
            </button>
          </div>
        </div>

        {/* Sign Up Card */}
        <div
          className={`auth-card signup-card ${isSignUp ? "slide-center" : "slide-right"}`}
        >
          <div className="signup-header">{renderHeaderIcon()}</div>
          <h1>Join Open Stage</h1>
          <p>Create your account to discover concerts and connect with artists</p>

          <form onSubmit={handleSignUpSubmit} className="signup-form">
            {error && isSignUp && !showForgotPassword && (
              <div className="error-message">{error}</div>
            )}

            <div className="form-group">
              <label htmlFor="signup-displayName">Full Name</label>
              <input
                type="text"
                id="signup-displayName"
                name="displayName"
                value={signUpData.displayName}
                onChange={handleSignUpChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                placeholder="Create a password (min. 6 characters)"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="signup-confirmPassword"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>I am a...</label>
              <div className="user-type-selection">
                {["musician","audience","venue"].map((type) => (
                  <div
                    key={type}
                    className={`user-type-option ${
                      signUpData.userType === type ? "selected" : ""
                    }`}
                    onClick={() => handleUserTypeChange(type)}
                  >
                    <div className="user-type-icon">
                      {type === "musician" ? "🎵" : type === "audience" ? "🎫" : "🏛️"}
                    </div>
                    <div className="user-type-content">
                      <h3>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace("venue","Venue")}
                      </h3>
                      <p>
                        {type === "musician"
                          ? "I create and perform music"
                          : type === "audience"
                          ? "I enjoy discovering and attending concerts"
                          : "I host concerts and events"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="signup-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <button onClick={switchToSignIn} className="signin-link">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

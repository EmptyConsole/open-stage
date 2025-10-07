"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // Handle window resize and mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to fetch user data from Firestore
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

  // Sign in state
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  // Sign up state
  const [signUpData, setSignUpData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (userType) => {
    setSignUpData(prev => ({
      ...prev,
      userType: userType
    }));
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
      setError("Please select whether you are a musician, audience member, or venue");
      return false;
    }
    return true;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      if (signInData.email && signInData.password) {
        // Fetch user data from Firestore to get userType
        const userData = await fetchUserData(signInData.email);
        
        // Store user session with userType
        localStorage.setItem("user", JSON.stringify({ 
          email: signInData.email, 
          name: userData?.displayName || signInData.email.split("@")[0],
          userType: userData?.userType || 'general'
        }));

        // Dispatch custom event to notify header of user login
        window.dispatchEvent(new CustomEvent('userLogin'));

        // Redirect based on user type
        const userType = userData?.userType || 'general';
        if (userType === 'venue') {
          router.push("/venuedashboard");
        } else if (userType === 'musician') {
          router.push("/artistcreateconcert");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateSignUpForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(
        signUpData.email,
        signUpData.password,
        signUpData.displayName,
        signUpData.userType
      );

      if (result.success) {
        // Store user session
        localStorage.setItem("user", JSON.stringify({ 
          email: signUpData.email, 
          name: signUpData.displayName,
          userType: signUpData.userType
        }));

        // Dispatch custom event to notify header of user login
        window.dispatchEvent(new CustomEvent('userLogin'));

        // Redirect based on user type
        if (signUpData.userType === 'venue') {
          router.push("/venuedashboard");
        } else if (signUpData.userType === 'musician') {
          router.push("/artistcreateconcert");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(result.error || "Sign up failed. Please try again.");
      }
    } catch (err) {
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
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always show success
      setForgotPasswordMessage("Password reset instructions have been sent to your email address.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
        setForgotPasswordMessage("");
      }, 3000);
      
    } catch (err) {
      setForgotPasswordMessage("Failed to send reset instructions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
  };

  return (
    <div className={`auth-container ${isMobile ? 'mobile' : ''}`}>
      <div className={`auth-wrapper ${isSignUp ? 'signup-mode' : showForgotPassword ? 'forgot-password-mode' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className={`auth-card signin-card ${isSignUp ? 'slide-left' : showForgotPassword ? 'slide-left' : 'slide-center'}`}>
          <div className="signin-header">
            <div className="logo">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="8" rx="3" ry="2.5" fill="#1976d2"/>
                <rect x="17" y="10.5" width="2" height="12" fill="#1976d2"/>
                <rect x="18.5" y="10.5" width="1" height="8" fill="#1976d2"/>
                <path d="M19.5 10.5 Q22 8 19.5 5.5" stroke="#1976d2" strokeWidth="1.5" fill="none"/>
                <ellipse cx="12" cy="12" rx="2" ry="1.5" fill="#1976d2" opacity="0.7"/>
                <rect x="10.5" y="13.5" width="1.5" height="8" fill="#1976d2" opacity="0.7"/>
                <rect x="11.25" y="13.5" width="0.5" height="6" fill="#1976d2" opacity="0.7"/>
              </svg>
            </div>
            <h1>Welcome to Open Stage</h1>
            <p>Sign in to discover amazing concerts and manage your tickets</p>
          </div>

          <form onSubmit={handleSignInSubmit} className="signin-form">
            {error && !isSignUp && !showForgotPassword && (
              <div className="error-message">
                {error}
              </div>
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

            <button 
              type="submit" 
              className="signin-button"
              disabled={isLoading}
            >
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
            <p>
              Don't have an account?{" "}
              <button onClick={switchToSignUp} className="signup-link">
                Sign up here
              </button>
            </p>
            <button 
              onClick={switchToForgotPassword}
              className="forgot-password"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <div className={`auth-card forgot-password-card ${showForgotPassword ? 'slide-center' : 'slide-right'}`}>
          <div className="signin-header">
            <div className="logo">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="8" rx="3" ry="2.5" fill="#1976d2"/>
                <rect x="17" y="10.5" width="2" height="12" fill="#1976d2"/>
                <rect x="18.5" y="10.5" width="1" height="8" fill="#1976d2"/>
                <path d="M19.5 10.5 Q22 8 19.5 5.5" stroke="#1976d2" strokeWidth="1.5" fill="none"/>
                <ellipse cx="12" cy="12" rx="2" ry="1.5" fill="#1976d2" opacity="0.7"/>
                <rect x="10.5" y="13.5" width="1.5" height="8" fill="#1976d2" opacity="0.7"/>
                <rect x="11.25" y="13.5" width="0.5" height="6" fill="#1976d2" opacity="0.7"/>
              </svg>
            </div>
            <h1>Reset Password</h1>
            <p>Enter your email address and we'll send you reset instructions</p>
          </div>

          <form onSubmit={handleForgotPassword} className="signin-form">
            {forgotPasswordMessage && (
              <div className={`message ${forgotPasswordMessage.includes('sent') ? 'success-message' : 'error-message'}`}>
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

            <button 
              type="submit" 
              className="signin-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="signin-footer">
            <button 
              onClick={handleBackToSignIn}
              className="back-to-signin"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>

        <div className={`auth-card signup-card ${isSignUp ? 'slide-center' : 'slide-right'}`}>
          <div className="signup-header">
            <div className="logo">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="8" rx="3" ry="2.5" fill="#1976d2"/>
                <rect x="17" y="10.5" width="2" height="12" fill="#1976d2"/>
                <rect x="18.5" y="10.5" width="1" height="8" fill="#1976d2"/>
                <path d="M19.5 10.5 Q22 8 19.5 5.5" stroke="#1976d2" strokeWidth="1.5" fill="none"/>
                <ellipse cx="12" cy="12" rx="2" ry="1.5" fill="#1976d2" opacity="0.7"/>
                <rect x="10.5" y="13.5" width="1.5" height="8" fill="#1976d2" opacity="0.7"/>
                <rect x="11.25" y="13.5" width="0.5" height="6" fill="#1976d2" opacity="0.7"/>
              </svg>
            </div>
            <h1>Join Open Stage</h1>
            <p>Create your account to discover concerts and connect with artists</p>
          </div>

          <form onSubmit={handleSignUpSubmit} className="signup-form">
            {error && isSignUp && !showForgotPassword && (
              <div className="error-message">
                {error}
              </div>
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
                <div 
                  className={`user-type-option ${signUpData.userType === 'musician' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeChange('musician')}
                >
                  <div className="user-type-icon">🎵</div>
                  <div className="user-type-content">
                    <h3>Musician</h3>
                    <p>I create and perform music</p>
                  </div>
                </div>
                <div 
                  className={`user-type-option ${signUpData.userType === 'audience' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeChange('audience')}
                >
                  <div className="user-type-icon">🎫</div>
                  <div className="user-type-content">
                    <h3>Audience Member</h3>
                    <p>I enjoy discovering and attending concerts</p>
                  </div>
                </div>
                <div 
                  className={`user-type-option ${signUpData.userType === 'venue' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeChange('venue')}
                >
                  <div className="user-type-icon">🏛️</div>
                  <div className="user-type-content">
                    <h3>Venue</h3>
                    <p>I host concerts and events</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={isLoading}
            >
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
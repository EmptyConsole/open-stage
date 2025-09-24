"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./signin.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      if (email && password) {
        // Store user session (you can implement actual auth here)
        localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
        router.push("/dashboard");
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
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

        <form onSubmit={handleSubmit} className="signin-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <a href="/signup" className="create-account-button">
            Create New Account
          </a>
        </form>

        <div className="signin-footer">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up here
            </a>
          </p>
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./signin.css";
import "../styles/shared-background.css";

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
    <div className="auth-container">
      <div className="auth-card">
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

    /* DAISYUI VERSION (COMMENTED OUT)
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
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
            <h1 className="text-2xl font-bold text-primary">Welcome to Open Stage</h1>
            <p className="text-base-content/70 mt-2">Sign in to discover amazing concerts and manage your tickets</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="divider">or</div>

            <a href="/signup" className="btn btn-outline w-full">
              Create New Account
            </a>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <a href="/signup" className="link link-primary">
                Sign up here
              </a>
            </p>
            <a href="#" className="link link-hover text-sm">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
    */
  );
}

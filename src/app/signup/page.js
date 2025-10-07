"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";
import "../styles/shared-background.css";
import { createUser } from "../../../util/users";

export default function SignUpPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (userType) => {
    setFormData(prev => ({
      ...prev,
      userType: userType
    }));
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!formData.password) {
      setError("Please enter a password");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.userType) {
      setError("Please select whether you are a musician or audience member");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(
        formData.email,
        formData.password,
        formData.displayName,
        formData.userType
      );

      if (result.success) {
        // Store user session
        localStorage.setItem("user", JSON.stringify({ 
          email: formData.email, 
          name: formData.displayName,
          userType: formData.userType
        }));
        router.push("/dashboard");
      } else {
        setError(result.error || "Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-container ${isMobile ? 'mobile' : ''}`}>
      <div className={`auth-card ${isMobile ? 'mobile' : ''}`}>
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

        <form onSubmit={handleSubmit} className="signup-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="displayName">Full Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min. 6 characters)"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>I am a...</label>
            <div className="user-type-selection">
              <div 
                className={`user-type-option ${formData.userType === 'musician' ? 'selected' : ''}`}
                onClick={() => handleUserTypeChange('musician')}
              >
                <div className="user-type-icon">🎵</div>
                <div className="user-type-content">
                  <h3>Musician</h3>
                  <p>I create and perform music</p>
                </div>
              </div>
              <div 
                className={`user-type-option ${formData.userType === 'audience' ? 'selected' : ''}`}
                onClick={() => handleUserTypeChange('audience')}
              >
                <div className="user-type-icon">🎫</div>
                <div className="user-type-content">
                  <h3>Audience Member</h3>
                  <p>I enjoy discovering and attending concerts</p>
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
            <a href="/signin" className="signin-link">
              Sign in here
            </a>
          </p>
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
            <h1 className="text-2xl font-bold text-primary">Join Open Stage</h1>
            <p className="text-base-content/70 mt-2">Create your account to discover concerts and connect with artists</p>
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
              <label className="label" htmlFor="displayName">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="input input-bordered"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password (min. 6 characters)"
                className="input input-bordered"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="input input-bordered"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">I am a...</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`card bg-base-100 border-2 cursor-pointer transition-all duration-200 ${
                    formData.userType === 'musician' ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/50'
                  }`}
                  onClick={() => handleUserTypeChange('musician')}
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎵</div>
                      <div>
                        <h3 className="font-semibold">Musician</h3>
                        <p className="text-sm text-base-content/70">I create and perform music</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  className={`card bg-base-100 border-2 cursor-pointer transition-all duration-200 ${
                    formData.userType === 'audience' ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/50'
                  }`}
                  onClick={() => handleUserTypeChange('audience')}
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎫</div>
                      <div>
                        <h3 className="font-semibold">Audience Member</h3>
                        <p className="text-sm text-base-content/70">I enjoy discovering and attending concerts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <a href="/signin" className="link link-primary">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    */
  );
}

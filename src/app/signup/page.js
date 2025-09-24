"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";
import { createUser } from "../../../util/users";

export default function SignUpPage() {
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
    <div className="signup-container">
      <div className="signup-card">
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
  );
}

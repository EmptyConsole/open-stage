"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./purchaseticket.css";
import "../styles/shared-background.css";

export default function PurchaseTicketPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle window resize and mobile detection
  useEffect(() => {
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

  // Get concert details from URL parameters or use default values
  const [concertDetails, setConcertDetails] = useState({
    artist: searchParams.get('artist') || "The Amazing Band",
    date: searchParams.get('date') || "December 15, 2024",
    time: searchParams.get('time') || "8:00 PM",
    location: searchParams.get('location') || "The Grand Theater",
    address: searchParams.get('address') || "123 Music Street, City, State 12345",
    price: searchParams.get('price') || "8"
  });

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: ""
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setPaymentData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      setPaymentData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Limit CVV to 3 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 3);
      setPaymentData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    else {
      setPaymentData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validatePaymentForm = () => {
    if (!paymentData.cardNumber.replace(/\s/g, '')) {
      setError("Please enter your card number");
      return false;
    }
    if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      setError("Please enter a valid 16-digit card number");
      return false;
    }
    if (!paymentData.expiryDate) {
      setError("Please enter the expiry date");
      return false;
    }
    if (!paymentData.cvv) {
      setError("Please enter the CVV");
      return false;
    }
    if (!paymentData.cardholderName.trim()) {
      setError("Please enter the cardholder name");
      return false;
    }
    if (!paymentData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    if (!paymentData.phone.trim()) {
      setError("Please enter your phone number");
      return false;
    }
    return true;
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePaymentForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always show success
      setSuccess("Payment successful! Your ticket has been purchased and confirmation details have been sent to your email.");
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      
    } catch (err) {
      setError("Payment failed. Please check your card details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className={`purchase-container ${isMobile ? 'mobile' : ''}`}>
      <div className={`purchase-wrapper ${isMobile ? 'mobile' : ''}`}>
        <div className="purchase-card">
          <div className="purchase-header">
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
            <h1>Purchase Your Ticket</h1>
            <p>Complete your purchase to secure your spot at this amazing concert</p>
          </div>

          {/* Concert Details Section */}
          <div className="concert-details">
            <h2>Concert Details</h2>
            <div className="concert-info">
              <div className="info-row">
                <span className="info-label">Artist:</span>
                <span className="info-value">{concertDetails.artist}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date:</span>
                <span className="info-value">{concertDetails.date}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Time:</span>
                <span className="info-value">{concertDetails.time}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Venue:</span>
                <span className="info-value">{concertDetails.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Address:</span>
                <span className="info-value">{concertDetails.address}</span>
              </div>
              <div className="info-row price-row">
                <span className="info-label">Admission Fee:</span>
                <span className="info-value price">${concertDetails.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePurchaseSubmit} className="payment-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <h3>Payment Information</h3>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  maxLength="3"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handlePaymentChange}
                placeholder="Enter cardholder name"
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
                value={paymentData.email}
                onChange={handlePaymentChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={paymentData.phone}
                onChange={handlePaymentChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="purchase-button"
              disabled={isLoading}
            >
              {isLoading ? "Processing Payment..." : `Purchase Ticket - $${concertDetails.price}`}
            </button>
          </form>

          <div className="purchase-footer">
            <button 
              onClick={handleBackToDashboard}
              className="back-button"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

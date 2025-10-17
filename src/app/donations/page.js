"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getArtists } from '../../../util/users';
import { colors } from '../styles/colors';
import Header from '../components/Header';
import ArtistProfileImage from '../components/ArtistProfileImage';

export default function DonationsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const router = useRouter();

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const artistsData = await getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Filter artists by search value
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Predefined donation amounts
  const donationAmounts = [5, 10, 25, 50, 100, 250];

  const handleDonate = (artist) => {
    setSelectedArtist(artist);
    setShowDonationModal(true);
    setDonationSuccess(false);
  };

  const handleDonationSubmit = () => {
    // In a real app, this would process the payment
    console.log("Donation submitted:", {
      artist: selectedArtist,
      amount: donationAmount || customAmount,
      message: donationMessage
    });
    
    setDonationSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowDonationModal(false);
      setSelectedArtist(null);
      setDonationAmount("");
      setCustomAmount("");
      setDonationMessage("");
      setDonationSuccess(false);
    }, 3000);
  };

  const DonationModal = () => {
    if (!showDonationModal || !selectedArtist) return null;

    return (
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
          if (!donationSuccess) {
            setShowDonationModal(false);
            setSelectedArtist(null);
            setDonationAmount("");
            setCustomAmount("");
            setDonationMessage("");
          }
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "32px",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {donationSuccess ? (
            // Success state
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: colors.success,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "40px",
                  color: "white",
                }}
              >
                ✓
              </div>
              <h2 style={{
                margin: "0 0 16px 0",
                color: colors.primary,
                fontSize: "24px",
                fontWeight: "bold"
              }}>
                Thank You!
              </h2>
              <p style={{
                margin: "0 0 8px 0",
                color: colors.textPrimary,
                fontSize: "16px"
              }}>
                Your donation of ${donationAmount || customAmount} to {selectedArtist.name} has been processed successfully.
              </p>
              <p style={{
                margin: 0,
                color: colors.textSecondary,
                fontSize: "14px"
              }}>
                The artist will receive your support and message.
              </p>
            </div>
          ) : (
            // Donation form
            <>
              {/* Close button */}
              <button
                onClick={() => {
                  setShowDonationModal(false);
                  setSelectedArtist(null);
                  setDonationAmount("");
                  setCustomAmount("");
                  setDonationMessage("");
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

              {/* Header */}
              <div style={{ marginBottom: "24px", textAlign: "center" }}>
                <ArtistProfileImage
                  artistId={selectedArtist.id}
                  artistName={selectedArtist.name}
                  size={80}
                  style={{
                    margin: "0 auto 16px",
                    border: `3px solid ${colors.primary}`,
                  }}
                />
                <h2 style={{
                  margin: "0 0 8px 0",
                  color: colors.primary,
                  fontSize: "24px",
                  fontWeight: "bold"
                }}>
                  Support {selectedArtist.name}
                </h2>
                <p style={{
                  margin: 0,
                  color: colors.textSecondary,
                  fontSize: "14px"
                }}>
                  {selectedArtist.description}
                </p>
              </div>

              {/* Donation Amount Selection */}
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{
                  margin: "0 0 16px 0",
                  color: colors.textPrimary,
                  fontSize: "18px",
                  fontWeight: "bold"
                }}>
                  Select Amount
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setDonationAmount(amount.toString());
                        setCustomAmount("");
                      }}
                      style={{
                        padding: "12px",
                        border: donationAmount === amount.toString() ? `2px solid ${colors.primary}` : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        background: donationAmount === amount.toString() ? colors.lightBlue : "white",
                        color: donationAmount === amount.toString() ? colors.primary : colors.textPrimary,
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        if (donationAmount !== amount.toString()) {
                          e.target.style.borderColor = colors.primary;
                          e.target.style.backgroundColor = colors.lightBlue;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (donationAmount !== amount.toString()) {
                          e.target.style.borderColor = "#e0e0e0";
                          e.target.style.backgroundColor = "white";
                        }
                      }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount */}
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: colors.textPrimary,
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    Or enter custom amount:
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount("");
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "16px",
                      boxSizing: "border-box",
                      outline: "none",
                      transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                  />
                </div>
              </div>

              {/* Donation Message */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textPrimary,
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  Message (optional):
                </label>
                <textarea
                  placeholder="Leave a message for the artist..."
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleDonationSubmit}
                disabled={!donationAmount && !customAmount}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: (!donationAmount && !customAmount) ? colors.gray : colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: (!donationAmount && !customAmount) ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  if (donationAmount || customAmount) {
                    e.target.style.backgroundColor = colors.primaryHover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (donationAmount || customAmount) {
                    e.target.style.backgroundColor = colors.primary;
                  }
                }}
              >
                Donate ${donationAmount || customAmount || "0"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: colors.background,
        overflow: "auto",
      }}
    >
      <Header />
      <DonationModal />
      
      <main
        className="main-content-background"
        style={{
          flex: 1,
          padding: isMobile ? "16px" : "32px",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1 style={{
            margin: "0 0 16px 0",
            color: colors.primary,
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "bold"
          }}>
            Support Your Favorite Artists
          </h1>
          <p style={{
            margin: 0,
            color: colors.textSecondary,
            fontSize: isMobile ? "16px" : "18px",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Help independent artists continue creating amazing music by making a donation. 
            Every contribution makes a difference in supporting their artistic journey.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "32px" }}>
          <input
            type="text"
            placeholder="Search artists..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              display: "block",
              padding: "12px 16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              background: colors.white,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />
        </div>

        {/* Artists Grid */}
        {loading ? (
          <div style={{
            textAlign: "center",
            color: colors.textSecondary,
            padding: "40px",
            fontSize: "18px"
          }}>
            Loading artists...
          </div>
        ) : filteredArtists.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {filteredArtists.map((artist, index) => (
              <div
                key={artist.id || index}
                style={{
                  background: colors.white,
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <ArtistProfileImage
                    artistId={artist.id}
                    artistName={artist.name}
                    size={80}
                    style={{
                      marginBottom: "16px",
                      border: `3px solid ${colors.primary}`
                    }}
                  />
                  
                  <h3 style={{
                    margin: "0 0 8px 0",
                    color: colors.primary,
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}>
                    {artist.name}
                  </h3>
                  
                  <p style={{
                    margin: "0 0 20px 0",
                    color: colors.textSecondary,
                    fontSize: "14px",
                    lineHeight: "1.5"
                  }}>
                    {artist.description}
                  </p>
                  
                  <button
                    onClick={() => handleDonate(artist)}
                    style={{
                      background: colors.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                    Support Artist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            color: colors.textSecondary,
            padding: "40px",
            fontSize: "18px"
          }}>
            {searchValue ? "No artists match your search" : "No artists found"}
          </div>
        )}

        {/* Footer Info */}
        <div style={{
          marginTop: "48px",
          padding: "24px",
          background: colors.white,
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          textAlign: "center",
          maxWidth: "800px",
          margin: "48px auto 0"
        }}>
          <h3 style={{
            margin: "0 0 12px 0",
            color: colors.primary,
            fontSize: "20px",
            fontWeight: "bold"
          }}>
            How Donations Work
          </h3>
          <p style={{
            margin: "0 0 16px 0",
            color: colors.textSecondary,
            fontSize: "14px",
            lineHeight: "1.6"
          }}>
            Your donations go directly to the artists to help them continue creating music, 
            fund recording sessions, purchase equipment, and support their artistic endeavors. 
            We believe in empowering independent artists to pursue their passion.
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill={colors.success}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6.5L7 10l-2.5-2.5L3.5 9 7 12.5l5.5-5.5-1-1z"/>
              </svg>
              <span style={{ fontSize: "14px", color: colors.textSecondary }}>Secure Payments</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill={colors.success}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6.5L7 10l-2.5-2.5L3.5 9 7 12.5l5.5-5.5-1-1z"/>
              </svg>
              <span style={{ fontSize: "14px", color: colors.textSecondary }}>Direct to Artists</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill={colors.success}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6.5L7 10l-2.5-2.5L3.5 9 7 12.5l5.5-5.5-1-1z"/>
              </svg>
              <span style={{ fontSize: "14px", color: colors.textSecondary }}>No Fees</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getArtists } from '../../../util/users';
import { colors } from '../styles/colors';
import DynamicHeader from '../components/DynamicHeader';
import ArtistProfileImage from '../components/ArtistProfileImage';

// DonationModal component moved outside to prevent re-rendering issues
const DonationModal = ({
  showDonationModal,
  selectedArtist,
  donationSuccess,
  donationAmount,
  customAmount,
  donationMessage,
  donationAmounts,
  onClose,
  onDonationSubmit,
  onAmountChange,
  onCustomAmountChange,
  onMessageChange
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDonationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDonationModal]);

  if (!showDonationModal || !selectedArtist) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto",
      }}
      onClick={() => {
        if (!donationSuccess) {
          onClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
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
              onClick={onClose}
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
                    onClick={() => onAmountChange(amount.toString())}
                    style={{
                      padding: "12px",
                      border:
                        donationAmount === amount.toString()
                          ? `2px solid ${colors.primary}`
                          : `1px solid ${colors.border}`,
                      borderRadius: "8px",
                      backgroundColor:
                        donationAmount === amount.toString()
                          ? colors.primaryLight
                          : colors.white,
                      color:
                        donationAmount === amount.toString()
                          ? colors.primary
                          : colors.textPrimary,
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (donationAmount !== amount.toString()) {
                        e.target.style.borderColor = colors.primary;
                        e.target.style.backgroundColor = colors.primaryLight;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (donationAmount !== amount.toString()) {
                        e.target.style.borderColor = colors.border;
                        e.target.style.backgroundColor = colors.white;
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
                  onChange={(e) => onCustomAmountChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "all 0.2s",
                    color: colors.textPrimary,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = "none";
                  }}
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
                onChange={(e) => onMessageChange(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.2s",
                  color: colors.textPrimary,
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={onDonationSubmit}
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
  // don't call useSearchParams at top-level to avoid SSR/prerender issues
  // we'll read the query param on the client inside useEffect via window.location
  // const searchParams = useSearchParams();

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
        // Auto-open modal if id query param is present (client-only)
        if (typeof window !== 'undefined') {
          try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (id) {
              const found = artistsData.find(a => a.id === id);
              if (found) {
                setSelectedArtist(found);
                setShowDonationModal(true);
              }
            }
          } catch (e) {
            // ignore
          }
        }
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

  const handleCloseModal = () => {
    setShowDonationModal(false);
    setSelectedArtist(null);
    setDonationAmount("");
    setCustomAmount("");
    setDonationMessage("");
  };

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setDonationAmount("");
  };

  const handleMessageChange = (value) => {
    setDonationMessage(value);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.backgroundSecondary,
        paddingTop: "64px", // Account for fixed header
      }}
    >
      <DynamicHeader />
      <DonationModal
        showDonationModal={showDonationModal}
        selectedArtist={selectedArtist}
        donationSuccess={donationSuccess}
        donationAmount={donationAmount}
        customAmount={customAmount}
        donationMessage={donationMessage}
        donationAmounts={donationAmounts}
        onClose={handleCloseModal}
        onDonationSubmit={handleDonationSubmit}
        onAmountChange={handleAmountChange}
        onCustomAmountChange={handleCustomAmountChange}
        onMessageChange={handleMessageChange}
      />

      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px" : "48px 24px",
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              margin: "0 0 12px 0",
              color: colors.textPrimary,
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Support Your Favorite Artists
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "16px" : "18px",
              color: colors.textSecondary,
              maxWidth: "600px",
            }}
          >
            Help independent artists continue creating amazing music by making a donation.
            Every contribution makes a difference in supporting their artistic journey.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              position: "relative",
              maxWidth: "600px",
            }}
          >
            <svg
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textTertiary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                fontSize: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                backgroundColor: colors.white,
                color: colors.textPrimary,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Artists Grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "64px 0",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: `4px solid ${colors.primaryLight}`,
                borderTop: `4px solid ${colors.primary}`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        ) : filteredArtists.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredArtists.map((artist, index) => (
              <div
                key={artist.id || index}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "16px",
                  border: `1px solid ${colors.border}`,
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "16px",
                      backgroundColor: colors.backgroundTertiary,
                    }}
                  >
                    <ArtistProfileImage
                      artistId={artist.id}
                      artistName={artist.name}
                      size={100}
                    />
                  </div>

                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: colors.textPrimary,
                    }}
                  >
                    {artist.name}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "14px",
                      color: colors.textSecondary,
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {artist.description || "No description available"}
                  </p>

                  <button
                    onClick={() => handleDonate(artist)}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = colors.primaryHover)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = colors.primary)
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Support Artist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              backgroundColor: colors.white,
              borderRadius: "16px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "18px",
                color: colors.textSecondary,
              }}
            >
              {searchValue
                ? `No artists found for "${searchValue}"`
                : "No artists found"}
            </p>
          </div>
        )}
      </main>

      {/* Spinner Animation */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../styles/shared-background.css";
import { colors } from "../styles/colors";

// Component that uses useSearchParams - needs to be wrapped in Suspense
function ConcertDetailsContent() {
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
    title: searchParams.get('title') || "Summer Concert",
    date: searchParams.get('date') || "December 15, 2024",
    time: searchParams.get('time') || "8:00 PM",
    venue: searchParams.get('venue') || "The Grand Theater",
    address: searchParams.get('address') || "123 Music Street, City, State 12345",
    price: searchParams.get('price') || "25",
    description: searchParams.get('description') || "Join us for an unforgettable evening of live music featuring amazing performances and great vibes. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere."
  });

  const handleRegisterForConcert = () => {
    // Navigate to purchase ticket page with concert data
    const url = `/purchaseticket?${new URLSearchParams({
      artist: concertDetails.artist,
      title: concertDetails.title,
      date: concertDetails.date,
      time: concertDetails.time,
      location: concertDetails.venue,
      address: concertDetails.address,
      price: concertDetails.price
    }).toString()}`;
    
    router.push(url);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="shared-background">
      <div style={{
        minHeight: '100vh',
        padding: isMobile ? '16px' : '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px',
          gap: '16px'
        }}>
          <button
            onClick={handleBackToDashboard}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: colors.primary,
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.lightBlue;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ←
          </button>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 'bold',
            color: colors.primary,
            margin: 0
          }}>
            Concert Details
          </h1>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '32px',
          alignItems: 'flex-start'
        }}>
          {/* Concert Image/Poster Placeholder */}
          <div style={{
            width: isMobile ? '100%' : '400px',
            height: isMobile ? '250px' : '500px',
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.primary}30`,
            flexShrink: 0
          }}>
            <div style={{
              textAlign: 'center',
              color: colors.primary,
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '500'
            }}>
              <div style={{ fontSize: isMobile ? '48px' : '64px', marginBottom: '16px' }}>🎵</div>
              <div>Concert Poster</div>
            </div>
          </div>

          {/* Concert Information */}
          <div style={{
            flex: 1,
            background: colors.white,
            borderRadius: '12px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: `1px solid ${colors.lightGray}`
          }}>
            {/* Concert Title */}
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: '8px',
              lineHeight: 1.2
            }}>
              {concertDetails.title}
            </h2>

            {/* Artist Name */}
            <h3 style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '600',
              color: colors.secondary,
              marginBottom: '24px'
            }}>
              by {concertDetails.artist}
            </h3>

            {/* Concert Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                background: colors.lightBlue,
                borderRadius: '8px',
                border: `1px solid ${colors.primary}20`
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.primary,
                  marginBottom: '4px'
                }}>
                  📅 Date & Time
                </div>
                <div style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '500',
                  color: colors.darkGray
                }}>
                  {concertDetails.date}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: colors.gray
                }}>
                  {concertDetails.time}
                </div>
              </div>

              <div style={{
                padding: '16px',
                background: colors.lightBlue,
                borderRadius: '8px',
                border: `1px solid ${colors.primary}20`
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.primary,
                  marginBottom: '4px'
                }}>
                  🏟️ Venue
                </div>
                <div style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '500',
                  color: colors.darkGray
                }}>
                  {concertDetails.venue}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: colors.gray
                }}>
                  {concertDetails.address}
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{
              padding: '20px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: '12px',
              textAlign: 'center',
              marginBottom: '24px',
              color: colors.white
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '4px',
                opacity: 0.9
              }}>
                Ticket Price
              </div>
              <div style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                ${concertDetails.price}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.8
              }}>
                per person
              </div>
            </div>

            {/* Description */}
            <div style={{
              marginBottom: '32px'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: colors.primary,
                marginBottom: '12px'
              }}>
                About This Concert
              </h4>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: colors.darkGray,
                margin: 0
              }}>
                {concertDetails.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '16px'
            }}>
              <button
                onClick={handleRegisterForConcert}
                style={{
                  flex: 1,
                  background: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: isMobile ? '16px 24px' : '18px 32px',
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.primaryHover;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.primary;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                }}
              >
                🎫 Register for Concert
              </button>

              <button
                onClick={handleBackToDashboard}
                style={{
                  flex: isMobile ? 1 : 'none',
                  background: 'transparent',
                  color: colors.primary,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: '8px',
                  padding: isMobile ? '16px 24px' : '18px 32px',
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: isMobile ? 'auto' : '160px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.primary;
                  e.target.style.color = colors.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.primary;
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function ConcertDetailsLoading() {
  return (
    <div className="shared-background">
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.primary,
          fontSize: '18px'
        }}>
          Loading concert details...
        </div>
      </div>
    </div>
  );
}

// Main export component that wraps the content in Suspense
export default function ConcertDetailsPage() {
  return (
    <Suspense fallback={<ConcertDetailsLoading />}>
      <ConcertDetailsContent />
    </Suspense>
  );
}

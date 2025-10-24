"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { colors } from "../styles/colors";
import { useRouter } from "next/navigation";
import { navigateToConcertDetails } from "../utils/concertNavigation";

export default function ConcertStatsPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [showConcertDetails, setShowConcertDetails] = useState(false);

  // Sample concert statistics data
  const [concertStats, setConcertStats] = useState([
    {
      id: 1,
      name: "Summer Vibes Concert",
      date: "2024-07-15",
      time: "19:00",
      location: "Central Park Amphitheater",
      admissionFee: 6,
      audienceRegistered: 150,
      totalEarnings: 1200,
      earningsFromAdmission: 900,
      earningsFromTips: 300,
      genre: "Pop"
    },
    {
      id: 2,
      name: "Jazz Night",
      date: "2024-08-20",
      time: "20:30",
      location: "Blue Note Club",
      admissionFee: 7,
      audienceRegistered: 85,
      totalEarnings: 850,
      earningsFromAdmission: 595,
      earningsFromTips: 255,
      genre: "Jazz"
    },
    {
      id: 3,
      name: "Rock Revolution",
      date: "2024-06-10",
      time: "21:00",
      location: "Madison Square Garden",
      admissionFee: 8,
      audienceRegistered: 200,
      totalEarnings: 1800,
      earningsFromAdmission: 1600,
      earningsFromTips: 200,
      genre: "Rock"
    },
    {
      id: 4,
      name: "Acoustic Sessions",
      date: "2024-05-25",
      time: "18:30",
      location: "Coffee House Downtown",
      admissionFee: 5,
      audienceRegistered: 60,
      totalEarnings: 450,
      earningsFromAdmission: 300,
      earningsFromTips: 150,
      genre: "Folk"
    }
  ]);

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter concerts based on search
  const filteredConcerts = concertStats.filter(concert =>
    concert.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    concert.location.toLowerCase().includes(searchValue.toLowerCase()) ||
    concert.genre.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Calculate total statistics
  const totalStats = {
    totalConcerts: concertStats.length,
    totalAudience: concertStats.reduce((sum, concert) => sum + concert.audienceRegistered, 0),
    totalEarnings: concertStats.reduce((sum, concert) => sum + concert.totalEarnings, 0),
    totalAdmissionEarnings: concertStats.reduce((sum, concert) => sum + concert.earningsFromAdmission, 0),
    totalTipsEarnings: concertStats.reduce((sum, concert) => sum + concert.earningsFromTips, 0),
    averageAudience: Math.round(concertStats.reduce((sum, concert) => sum + concert.audienceRegistered, 0) / concertStats.length) || 0,
    averageEarnings: Math.round(concertStats.reduce((sum, concert) => sum + concert.totalEarnings, 0) / concertStats.length) || 0
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Concert Details Modal
  const ConcertDetailsModal = () => {
    if (!showConcertDetails || !selectedConcert) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }}
        onClick={() => setShowConcertDetails(false)}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setShowConcertDetails(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>

          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              color: colors.primary, 
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              {selectedConcert.name}
            </h2>
            <p style={{ 
              margin: 0, 
              color: '#666', 
              fontSize: '16px'
            }}>
              {formatDate(selectedConcert.date)} at {selectedConcert.time}
            </p>
          </div>

          {/* Concert Image */}
          <div
            style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              borderRadius: '8px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Concert Image
          </div>

          {/* Statistics Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
                AUDIENCE REGISTERED
              </h4>
              <p style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                {selectedConcert.audienceRegistered}
              </p>
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
                TOTAL EARNINGS
              </h4>
              <p style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                {formatCurrency(selectedConcert.totalEarnings)}
              </p>
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
                ADMISSION FEE
              </h4>
              <p style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
                {formatCurrency(selectedConcert.admissionFee)}
              </p>
            </div>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
                LOCATION
              </h4>
              <p style={{ margin: 0, color: '#333', fontSize: '16px' }}>
                {selectedConcert.location}
              </p>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: colors.primary, 
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              Earnings Breakdown
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px'
            }}>
              <div style={{ 
                background: '#e8f5e8', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid #c8e6c9'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#2e7d32', fontSize: '14px', fontWeight: 'bold' }}>
                  FROM ADMISSION FEES
                </h4>
                <p style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: 'bold' }}>
                  {formatCurrency(selectedConcert.earningsFromAdmission)}
                </p>
                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '12px' }}>
                  {selectedConcert.audienceRegistered} × {formatCurrency(selectedConcert.admissionFee)}
                </p>
              </div>
              <div style={{ 
                background: '#fff3e0', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid #ffcc02'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#f57c00', fontSize: '14px', fontWeight: 'bold' }}>
                  FROM AUDIENCE TIPS
                </h4>
                <p style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: 'bold' }}>
                  {formatCurrency(selectedConcert.earningsFromTips)}
                </p>
                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '12px' }}>
                  Donations from audience
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            marginTop: '24px'
          }}>
            <button
              onClick={() => setShowConcertDetails(false)}
              style={{
                padding: '12px 24px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                color: '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Concert Stats List Component
  const ConcertStatsListSection = ({ isMobileLayout = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: isMobileLayout ? '0' : '24px' }}>
      {filteredConcerts.length > 0 ? (
        filteredConcerts.map((concert) => (
          <div
            key={concert.id}
            onClick={() => {
              // Navigate to concert details page
              const concertData = {
                artist: concert.name,
                title: concert.name,
                date: concert.date,
                time: concert.time,
                venue: concert.location,
                address: "123 Music Street, City, State 12345",
                price: concert.price,
                description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This ${concert.genre} concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
              };
              navigateToConcertDetails(router, concertData);
            }}
            style={{
              background: isMobileLayout ? colors.white : colors.lightGray,
              borderRadius: isMobileLayout ? '12px' : '8px',
              padding: isMobileLayout ? '16px' : '12px',
              boxShadow: isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: isMobileLayout ? '1px solid #e0e0e0' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.lightBlue;
              e.currentTarget.style.boxShadow = isMobileLayout ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)';
              if (isMobileLayout) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isMobileLayout ? colors.white : colors.lightGray;
              e.currentTarget.style.boxShadow = isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)';
              if (isMobileLayout) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h4 style={{ 
                margin: '0 0 4px 0', 
                color: colors.primary, 
                fontWeight: 'bold', 
                fontSize: isMobileLayout ? '16px' : '14px',
                textAlign: 'left' 
              }}>
                {concert.name}
              </h4>
              <p style={{ 
                margin: '0 0 2px 0', 
                color: colors.textPrimary, 
                fontSize: isMobileLayout ? '14px' : '12px', 
                textAlign: 'left' 
              }}>
                {formatDate(concert.date)} at {concert.time}
              </p>
              <p style={{ 
                margin: '0 0 2px 0', 
                color: colors.textSecondary, 
                fontSize: isMobileLayout ? '12px' : '11px', 
                textAlign: 'left' 
              }}>
                {concert.location} • {concert.genre}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    minWidth: '60px'
                  }}>
                    <span style={{ 
                      fontSize: isMobileLayout ? '12px' : '10px', 
                      color: colors.textSecondary,
                      fontWeight: '500'
                    }}>
                      Audience
                    </span>
                    <span style={{ 
                      fontSize: isMobileLayout ? '16px' : '14px', 
                      color: colors.primary,
                      fontWeight: 'bold'
                    }}>
                      {concert.audienceRegistered}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    minWidth: '60px'
                  }}>
                    <span style={{ 
                      fontSize: isMobileLayout ? '12px' : '10px', 
                      color: colors.textSecondary,
                      fontWeight: '500'
                    }}>
                      Earnings
                    </span>
                    <span style={{ 
                      fontSize: isMobileLayout ? '16px' : '14px', 
                      color: '#2e7d32',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(concert.totalEarnings)}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    minWidth: '60px'
                  }}>
                    <span style={{ 
                      fontSize: isMobileLayout ? '12px' : '10px', 
                      color: colors.textSecondary,
                      fontWeight: '500'
                    }}>
                      Fee
                    </span>
                    <span style={{ 
                      fontSize: isMobileLayout ? '16px' : '14px', 
                      color: colors.primary,
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(concert.admissionFee)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          {searchValue ? 'No concerts found' : 'No concert statistics available'}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f5f5f5",
        overflow: "auto",
        paddingTop: isMobile ? "60px" : "72px", // Account for fixed header
      }}
    >
      <DynamicHeader />
      <ConcertDetailsModal />
      {isMobile ? (
        // Mobile Layout - Single Column
        <main className="main-content-background" style={{ 
          flex: 1, 
          padding: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'auto',
          maxWidth: '100%'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Search concerts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                color: '#1a1a1a',
                padding: '12px 16px',
                border: '1px solid #666666',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
                background: colors.white,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Overall Statistics */}
          <div style={{
            background: colors.lightBlue,
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '24px'
          }}>
            <h2 style={{ 
              margin: '0 0 20px 0', 
              color: colors.primary, 
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Overall Statistics
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '16px'
            }}>
              <div style={{
                padding: '16px',
                background: colors.white,
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎵</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Concerts</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary }}>{totalStats.totalConcerts}</div>
              </div>
              <div style={{
                padding: '16px',
                background: colors.white,
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Audience</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary }}>{totalStats.totalAudience}</div>
              </div>
              <div style={{
                padding: '16px',
                background: colors.white,
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Earnings</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{formatCurrency(totalStats.totalEarnings)}</div>
              </div>
              <div style={{
                padding: '16px',
                background: colors.white,
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Avg. Earnings</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{formatCurrency(totalStats.averageEarnings)}</div>
              </div>
            </div>
          </div>

          {/* Concert Statistics Section */}
          <div style={{ marginBottom: '32px', marginTop: '20px' }}>
            <MainContentHeader>Concert Statistics</MainContentHeader>
            <div style={{ marginTop: '16px' }}>
              <ConcertStatsListSection isMobileLayout={true} />
            </div>
          </div>
        </main>
      ) : (
        // Desktop Layout - With Sidebar
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar>
            <div style={{ marginTop: '-40px'}}>
              <div style={{ marginLeft: '-100px'}}>
                <MainContentHeader>Concert Statistics</MainContentHeader>
              </div>
              
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search concerts..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  color: '#1a1a1a',
                  padding: '8px',
                  border: '1px solid #666666',
                  borderRadius: '6px',
                  margin: '0 0 24px 0',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />

              <ConcertStatsListSection isMobileLayout={false} />
            </div>
          </Sidebar>

          <main className="main-content-background" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: colors.primary,
              margin: '0 0 24px 0',
              textAlign: 'left'
            }}>
              Concert Statistics Dashboard
            </h1>
          
            {/* Overall Statistics */}
            <div style={{
              background: colors.lightBlue,
              padding: '32px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                margin: '0 0 24px 0', 
                color: colors.primary, 
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Overall Performance Summary
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px'
              }}>
                <div style={{
                  padding: '20px',
                  background: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎵</div>
                  <div style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '8px' }}>Total Concerts</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.primary }}>{totalStats.totalConcerts}</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
                  <div style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '8px' }}>Total Audience</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: colors.primary }}>{totalStats.totalAudience}</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>💰</div>
                  <div style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '8px' }}>Total Earnings</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>{formatCurrency(totalStats.totalEarnings)}</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                  <div style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '8px' }}>Avg. Earnings</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>{formatCurrency(totalStats.averageEarnings)}</div>
                </div>
              </div>
              
              {/* Earnings Breakdown */}
              <div style={{ 
                marginTop: '24px',
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '20px'
              }}>
                <div style={{
                  padding: '20px',
                  background: '#e8f5e8',
                  borderRadius: '8px',
                  border: '1px solid #c8e6c9',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎫</div>
                  <div style={{ fontSize: '14px', color: '#2e7d32', marginBottom: '8px', fontWeight: 'bold' }}>Admission Fees</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{formatCurrency(totalStats.totalAdmissionEarnings)}</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: '#fff3e0',
                  borderRadius: '8px',
                  border: '1px solid #ffcc02',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>💝</div>
                  <div style={{ fontSize: '14px', color: '#f57c00', marginBottom: '8px', fontWeight: 'bold' }}>Tips & Donations</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f57c00' }}>{formatCurrency(totalStats.totalTipsEarnings)}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

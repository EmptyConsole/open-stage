"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
// import Footer from "./components/footer";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsers, getArtists } from "../../../util/users";
import { colors } from "../styles/colors";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Sample ticket data - will be populated from Firebase artists
  const [tickets, setTickets] = useState([]);

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'purchased':
        return colors.lightBlue;
      case 'upcoming':
        return '#a8e6cf'; // Lighter green
      case 'late':
        return '#ffcdd2'; // Light red
      default:
        return colors.lightGray;
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  // Call getUsers and getArtists when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Always create the hardcoded ticket first
        const hardcodedTicket = {
          id: 'hardcoded-1',
          artist: {
            name: "Taylor Swift",
            profilePicture: "https://via.placeholder.com/80x80/1976d2/ffffff?text=TS",
            description: "Pop sensation and Grammy winner"
          },
          concert: "The Eras Tour",
          date: "2024-03-15",
          status: "purchased"
        };

        // Set the hardcoded ticket immediately
        setTickets([hardcodedTicket]);
        
        await getUsers();
        const artists = await getArtists();
        console.log('Fetched artists:', artists);
        setFollowedArtists(artists);
        
        // Generate tickets from Firebase artists
        const firebaseTickets = artists && artists.length > 0 ? artists.slice(0, 2).map((artist, index) => ({
          id: artist.id || index + 1,
          artist: {
            name: artist.name,
            profilePicture: artist.profilePicture || `https://via.placeholder.com/80x80/1976d2/ffffff?text=${artist.name.split(' ').map(n => n[0]).join('')}`,
            description: artist.description || "Artist description"
          },
          concert: `${artist.name} Tour ${new Date().getFullYear()}`,
          date: new Date(Date.now() + (index + 1) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days apart
          status: index === 0 ? 'purchased' : 'upcoming'
        })) : [];

        const generatedTickets = [hardcodedTicket, ...firebaseTickets];
        console.log('Generated tickets:', generatedTickets);
        setTickets(generatedTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Even if Firebase fails, we still have the hardcoded ticket
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Followed Artists Component
  const FollowedArtistsSection = ({ isMobileLayout = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: isMobileLayout ? '0' : '24px' }}>
      {loading ? (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          Loading artists...
        </div>
      ) : followedArtists.length > 0 ? (
        followedArtists.map((artist, index) => (
          <div
            key={artist.id || index}
            onClick={() => {
              console.log(`Clicked on ${artist.name}`);
              if (artist.id) {
                router.push(`/artistsprofiles?id=${artist.id}`);
              }
            }}
            style={{
              background: isMobileLayout ? colors.white : colors.lightGray,
              borderRadius: isMobileLayout ? '12px' : '8px',
              padding: '16px',
              boxShadow: isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: isMobileLayout ? '1px solid #e0e0e0' : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.lightBlue;
              e.target.style.boxShadow = isMobileLayout ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)';
              if (isMobileLayout) {
                e.target.style.transform = 'translateY(-2px)';
              }
              setHoveredArtist(artist);
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isMobileLayout ? colors.white : colors.lightGray;
              e.target.style.boxShadow = isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)';
              if (isMobileLayout) {
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobileLayout ? '16px' : '12px' }}>
              {/* Artist Profile Picture */}
              <div
                style={{
                  width: isMobileLayout ? '60px' : '80px',
                  height: isMobileLayout ? '60px' : '80px',
                  background: colors.lightGray,
                  borderRadius: isMobileLayout ? '12px' : '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.textLight,
                  fontSize: '10px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  border: isMobileLayout ? 'none' : `2px dashed ${colors.border}`
                }}
              >
                <img
                  src={artist.profilePicture || `https://via.placeholder.com/${isMobileLayout ? '60x60' : '80x80'}/1976d2/ffffff?text=${artist.name.split(' ').map(n => n[0]).join('')}`}
                  alt={artist.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.textLight,
                    fontSize: isMobileLayout ? '12px' : '10px',
                    background: colors.lightGray
                  }}
                >
                  {artist.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              {/* Text content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ 
                  margin: '0 0 4px 0', 
                  color: colors.primary, 
                  fontWeight: 'bold', 
                  fontSize: isMobileLayout ? '16px' : '14px', 
                  textAlign: 'left' 
                }}>
                  {artist.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: colors.textPrimary, 
                  fontSize: isMobileLayout ? '14px' : '12px', 
                  textAlign: 'left', 
                  lineHeight: '1.3' 
                }}>
                  {artist.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          No artists found
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
      }}
    >
      <DynamicHeader />
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
              placeholder="Search artists..."
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

          {/* Followed Artists Section */}
          <div style={{ marginBottom: '32px' }}>
            <MainContentHeader>Followed Artists</MainContentHeader>
            <div style={{ marginTop: '16px' }}>
              <FollowedArtistsSection isMobileLayout={true} />
            </div>
          </div>

          {/* Your Tickets Section */}
          <div>
            <MainContentHeader>Your Tickets</MainContentHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {loading && tickets.length === 0 ? (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  Loading tickets...
                </div>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: colors.white,
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: '1px solid #e0e0e0'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Artist Profile Picture */}
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: colors.lightGray,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={ticket.artist.profilePicture}
                        alt={ticket.artist.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div
                        style={{
                          display: 'none',
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.textLight,
                          fontSize: '12px',
                          background: colors.lightGray
                        }}
                      >
                        {ticket.artist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    {/* Artist and Concert Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ 
                        margin: '0 0 6px 0', 
                        color: colors.primary, 
                        fontWeight: 'bold', 
                        fontSize: '16px',
                        textAlign: 'left'
                      }}>
                        {ticket.artist.name}
                      </h3>
                      <p style={{ 
                        margin: '0 0 6px 0', 
                        color: colors.textPrimary, 
                        fontSize: '14px', 
                        textAlign: 'left',
                        lineHeight: '1.3'
                      }}>
                        {ticket.concert}
                      </p>
                      <div style={{ 
                        margin: 0, 
                        color: colors.textSecondary, 
                        fontSize: '12px', 
                        textAlign: 'left',
                        lineHeight: '1.3'
                      }}>
                        {formatDate(ticket.date)}
                      </div>
                    </div>
                    
                    {/* Status Capsule */}
                    <div
                      style={{
                        background: getStatusColor(ticket.status),
                        color: colors.textPrimary,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        textAlign: 'center'
                      }}
                    >
                      {ticket.status}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  No tickets found
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        // Desktop Layout - With Sidebar
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar>
            <div style={{ marginTop: '-40px'}}>
              <div style={{ marginLeft: '-100px'}}>
                <MainContentHeader>Followed Artists</MainContentHeader>
              </div>
              <input
                type="text"
                placeholder="Search artists..."
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
              <FollowedArtistsSection isMobileLayout={false} />
            </div>
          </Sidebar>
          <main className="main-content-background" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <MainContentHeader>Your Tickets</MainContentHeader>
            
            {/* Ticket Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {loading && tickets.length === 0 ? (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  Loading tickets...
                </div>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    background: colors.white,
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Artist Profile Picture */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      background: colors.lightGray,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={ticket.artist.profilePicture}
                      alt={ticket.artist.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      style={{
                        display: 'none',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.textLight,
                        fontSize: '12px',
                        background: colors.lightGray
                      }}
                    >
                      {ticket.artist.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Artist and Concert Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      color: colors.primary, 
                      fontWeight: 'bold', 
                      fontSize: '24px',
                      textAlign: 'left'
                    }}>
                      {ticket.artist.name}
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      color: colors.textPrimary, 
                      fontSize: '18px', 
                      textAlign: 'left',
                      lineHeight: '1.3'
                    }}>
                      {ticket.concert}
                    </p>
                  </div>
                  
                  {/* Date and Status Capsule */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Date */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        color: colors.textPrimary, 
                        fontSize: '18px', 
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>
                        {formatDate(ticket.date)}
                      </div>
                      <div style={{ 
                        color: colors.textSecondary, 
                        fontSize: '16px'
                      }}>
                        {ticket.concert}
                      </div>
                    </div>
                    
                    {/* Status Capsule */}
                    <div
                      style={{
                        background: getStatusColor(ticket.status),
                        color: colors.textPrimary,
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        minWidth: '100px',
                        textAlign: 'center'
                      }}
                    >
                      {ticket.status}
                    </div>
                  </div>
                </div>
                ))
              ) : (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  No tickets found
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsers, getArtists } from "../../../util/users";
import { colors } from "../styles/colors";

export default function VenueDashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [artistsNearYou, setArtistsNearYou] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [hoveredFollowedArtist, setHoveredFollowedArtist] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Sample local musician data with genres and contact info
  const [sampleArtists] = useState([
    {
      id: 'sample-1',
      name: "Marcus Chen",
      genre: "Indie Folk",
      contactInfo: "marcus.chen@music.com | (415) 555-0123",
      profilePicture: "https://via.placeholder.com/80x80/1976d2/ffffff?text=MC",
      description: "Local indie folk singer-songwriter with acoustic guitar"
    },
    {
      id: 'sample-2',
      name: "Sofia Rodriguez",
      genre: "Jazz Fusion",
      contactInfo: "sofia.rodriguez@jazz.com | (415) 555-0456",
      profilePicture: "https://via.placeholder.com/80x80/4caf50/ffffff?text=SR",
      description: "Jazz vocalist and keyboardist from the local scene"
    },
    {
      id: 'sample-3',
      name: "Jake Thompson",
      genre: "Alternative Rock",
      contactInfo: "jake.thompson@band.com | (415) 555-0789",
      profilePicture: "https://via.placeholder.com/80x80/ff9800/ffffff?text=JT",
      description: "Lead guitarist and vocalist for local alt-rock band"
    },
    {
      id: 'sample-4',
      name: "Luna Martinez",
      genre: "Electronic",
      contactInfo: "luna.martinez@electronic.com | (415) 555-0321",
      profilePicture: "https://via.placeholder.com/80x80/9c27b0/ffffff?text=LM",
      description: "Electronic music producer and DJ"
    },
    {
      id: 'sample-5',
      name: "David Kim",
      genre: "Blues",
      contactInfo: "david.kim@blues.com | (415) 555-0654",
      profilePicture: "https://via.placeholder.com/80x80/e91e63/ffffff?text=DK",
      description: "Blues guitarist and harmonica player"
    },
    {
      id: 'sample-6',
      name: "Emma Wilson",
      genre: "Singer-Songwriter",
      contactInfo: "emma.wilson@songs.com | (415) 555-0987",
      profilePicture: "https://via.placeholder.com/80x80/607d8b/ffffff?text=EW",
      description: "Intimate singer-songwriter with piano and vocals"
    },
    {
      id: 'sample-7',
      name: "Alex Rivera",
      genre: "Funk",
      contactInfo: "alex.rivera@funk.com | (415) 555-1357",
      profilePicture: "https://via.placeholder.com/80x80/795548/ffffff?text=AR",
      description: "Bassist and vocalist for local funk ensemble"
    },
    {
      id: 'sample-8',
      name: "Maya Patel",
      genre: "World Music",
      contactInfo: "maya.patel@worldmusic.com | (415) 555-2468",
      profilePicture: "https://via.placeholder.com/80x80/ff5722/ffffff?text=MP",
      description: "Multi-instrumentalist specializing in world fusion"
    }
  ]);

  // Sample followed artists data - local musicians only
  const [sampleFollowedArtists] = useState([
    {
      id: 'followed-1',
      name: "Zoe Chen",
      genre: "Indie Pop",
      contactInfo: "zoe.chen@localmusic.com | (415) 555-1001",
      profilePicture: "https://via.placeholder.com/80x80/ff4757/ffffff?text=ZC",
      description: "Local indie pop singer-songwriter with dreamy vocals"
    },
    {
      id: 'followed-2',
      name: "River Stone",
      genre: "Acoustic Folk",
      contactInfo: "river.stone@localmusic.com | (415) 555-1002",
      profilePicture: "https://via.placeholder.com/80x80/2ed573/ffffff?text=RS",
      description: "Acoustic folk musician and storyteller"
    },
    {
      id: 'followed-3',
      name: "Maya Johnson",
      genre: "Soul",
      contactInfo: "maya.johnson@localmusic.com | (415) 555-1003",
      profilePicture: "https://via.placeholder.com/80x80/ffa502/ffffff?text=MJ",
      description: "Local soul singer with powerful vocals"
    },
    {
      id: 'followed-4',
      name: "Alex Torres",
      genre: "Jazz Fusion",
      contactInfo: "alex.torres@localmusic.com | (415) 555-1004",
      profilePicture: "https://via.placeholder.com/80x80/3742fa/ffffff?text=AT",
      description: "Local jazz fusion guitarist and composer"
    },
    {
      id: 'followed-5',
      name: "Luna Park",
      genre: "Electronic",
      contactInfo: "luna.park@localmusic.com | (415) 555-1005",
      profilePicture: "https://via.placeholder.com/80x80/ff6348/ffffff?text=LP",
      description: "Electronic music producer and DJ"
    },
    {
      id: 'followed-6',
      name: "Sam Rivers",
      genre: "Blues Rock",
      contactInfo: "sam.rivers@localmusic.com | (415) 555-1006",
      profilePicture: "https://via.placeholder.com/80x80/2f3542/ffffff?text=SR",
      description: "Blues rock guitarist and vocalist"
    }
  ]);

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
        
        // Set sample artists immediately
        setArtistsNearYou(sampleArtists);
        setFollowedArtists(sampleFollowedArtists);
        
        await getUsers();
        const artists = await getArtists();
        console.log('Fetched artists:', artists);
        
        // Convert Firebase artists to venue format with genres and contact info
        const localGenres = ["Indie Rock", "Acoustic", "Jazz", "Blues", "Folk", "Alternative", "Electronic", "Funk", "Soul", "Reggae", "Country", "Punk"];
        const firebaseArtists = artists && artists.length > 0 ? artists.map((artist, index) => ({
          id: artist.id || `firebase-${index}`,
          name: artist.name,
          genre: localGenres[index % localGenres.length], // Assign local genres cyclically
          contactInfo: `${artist.name.toLowerCase().replace(/\s+/g, '')}@localmusic.com | (415) 555-${String(1000 + index).padStart(4, '0')}`,
          profilePicture: artist.profilePicture || `https://via.placeholder.com/80x80/1976d2/ffffff?text=${artist.name.split(' ').map(n => n[0]).join('')}`,
          description: artist.description || "Local musical artist"
        })) : [];

        // Combine sample and Firebase artists for "Artists Near You"
        const allArtists = [...sampleArtists, ...firebaseArtists];
        setArtistsNearYou(allArtists);
        
        // Keep followed artists as the sample followed artists (no Firebase mixing)
        setFollowedArtists(sampleFollowedArtists);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Even if Firebase fails, we still have the sample artists
        setArtistsNearYou(sampleArtists);
        setFollowedArtists(sampleFollowedArtists);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter artists based on search
  const filteredArtists = artistsNearYou.filter(artist =>
    artist.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Filter followed artists based on search
  const filteredFollowedArtists = followedArtists.filter(artist =>
    artist.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Followed Artists Component
  const FollowedArtistsSection = ({ isMobileLayout = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: isMobileLayout ? '0' : '24px' }}>
      {loading ? (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          Loading artists...
        </div>
      ) : filteredFollowedArtists.length > 0 ? (
        filteredFollowedArtists.map((artist, index) => (
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
              setHoveredFollowedArtist(artist);
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
                  margin: '0 0 4px 0', 
                  color: colors.textPrimary, 
                  fontSize: isMobileLayout ? '14px' : '12px', 
                  textAlign: 'left', 
                  lineHeight: '1.3' 
                }}>
                  {artist.genre}
                </p>
                <p style={{ 
                  margin: 0, 
                  color: colors.textSecondary, 
                  fontSize: isMobileLayout ? '12px' : '11px', 
                  textAlign: 'left', 
                  lineHeight: '1.3' 
                }}>
                  {artist.contactInfo}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          No followed artists found
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
              placeholder="Search artists or genres..."
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

          {/* Artists Near You Section */}
          <div>
            <MainContentHeader>Artists Near You</MainContentHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {loading && artistsNearYou.length === 0 ? (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  Loading artists...
                </div>
              ) : filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      console.log(`Clicked on ${artist.name}`);
                      if (artist.id) {
                        router.push(`/artistsprofiles?id=${artist.id}`);
                      }
                    }}
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
                        src={artist.profilePicture}
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
                          fontSize: '12px',
                          background: colors.lightGray
                        }}
                      >
                        {artist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    {/* Artist Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ 
                        margin: '0 0 6px 0', 
                        color: colors.primary, 
                        fontWeight: 'bold', 
                        fontSize: '16px',
                        textAlign: 'left'
                      }}>
                        {artist.name}
                      </h3>
                      <div style={{ 
                        margin: '0 0 6px 0', 
                        color: colors.textPrimary, 
                        fontSize: '14px', 
                        textAlign: 'left',
                        fontWeight: '500'
                      }}>
                        {artist.genre}
                      </div>
                      <div style={{ 
                        margin: 0, 
                        color: colors.textSecondary, 
                        fontSize: '12px', 
                        textAlign: 'left',
                        lineHeight: '1.3'
                      }}>
                        {artist.contactInfo}
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
                placeholder="Search artists or genres..."
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
            <MainContentHeader>Artists Near You</MainContentHeader>
            
            {/* Artist Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {loading && artistsNearYou.length === 0 ? (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  Loading artists...
                </div>
              ) : filteredArtists.length > 0 ? (
                filteredArtists.slice(0, 3).map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => {
                    console.log(`Clicked on ${artist.name}`);
                    if (artist.id) {
                      router.push(`/artistsprofiles?id=${artist.id}`);
                    }
                  }}
                  style={{
                    background: colors.white,
                    borderRadius: '8px',
                    padding: '16px',
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
                      width: '70px',
                      height: '70px',
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
                      src={artist.profilePicture}
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
                        fontSize: '12px',
                        background: colors.lightGray
                      }}
                    >
                      {artist.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Artist Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      margin: '0 0 6px 0', 
                      color: colors.primary, 
                      fontWeight: 'bold', 
                      fontSize: '20px',
                      textAlign: 'left'
                    }}>
                      {artist.name}
                    </h3>
                    <div style={{ 
                      margin: '0 0 6px 0', 
                      color: colors.textPrimary, 
                      fontSize: '16px', 
                      textAlign: 'left',
                      fontWeight: '500'
                    }}>
                      {artist.genre}
                    </div>
                    <div style={{ 
                      margin: 0, 
                      color: colors.textSecondary, 
                      fontSize: '14px', 
                      textAlign: 'left',
                      lineHeight: '1.3'
                    }}>
                      {artist.contactInfo}
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
          </main>
        </div>
      )}
    </div>
  );
}

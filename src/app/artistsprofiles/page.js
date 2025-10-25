"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "@/app/globals.css";
import Sidebar from "../components/sidebar.js";
import DynamicHeader from "../components/DynamicHeader";
// import Footer from "../components/footer";n
import FollowButton from "../components/followbutton";
import ConcertSquare from "../components/ConcertSquare";
import ArtistSquare from "../components/ArtistSquare";
import MainContentHeader from "../components/MainContentHeader";
import MainButton from "../components/MainButton";
import ArtistProfileImage from "../components/ArtistProfileImage";
import { getArtists } from "../../../util/users";

function ArtistProfileContent() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const artistId = searchParams.get('id');

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch artist data based on ID
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        const artists = await getArtists();
        const artist = artists.find(a => a.id === artistId);
        setCurrentArtist(artist || { name: 'Unknown Artist', description: 'Artist not found' });
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setCurrentArtist({ name: 'Error', description: 'Failed to load artist data' });
      } finally {
        setLoading(false);
      }
    };
    
    if (artistId) {
      fetchArtistData();
    } else {
      setCurrentArtist({ name: 'No Artist Selected', description: 'Please select an artist from the sidebar' });
      setLoading(false);
    }
  }, [artistId]);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "var(--background-gradient)",
        overflow: "auto",
        paddingTop: isMobile ? "60px" : "72px", // Account for fixed header
      }}
    >
      <DynamicHeader />
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "calc(100vh - 60px)",
          overflow: "hidden",
        }}
      >
        <Sidebar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%", // changed from "100vh"
            }}
          >
            {/* Image placeholder with follow button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {/* Artist Profile Image - Distinct and Prominent */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArtistProfileImage
                    artistId={currentArtist?.id || artistId}
                    artistName={currentArtist?.name || 'Unknown Artist'}
                    size={280}
                    style={{
                      border: "4px solid #1976d2",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                    }}
                    showInitials={true}
                  />
                  
                  {/* Artist Name - Bottom Left of Image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: "8px",
                      color: "#1976d2",
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "2px solid #e3f2fd",
                    }}
                  >
                    {loading ? 'Loading...' : (currentArtist?.name || 'Unknown Artist')}
                  </div>

                </div>
                
                {/* Follow Button - Below Image */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <button 
                    onClick={toggleFollow}
                    style={{
                      backgroundColor: isFollowing ? '#6c757d' : '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      fontWeight: 'bold'
                    }}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                {loading ? 'Loading description...' : (currentArtist?.description || 'No description available')}
              </p>
            </div>

            {/* Slogan and Support Button - now sticky at the top */}
            <div
              style={{
                position: "absolute",
                top: "550px", // changed from 0 to 100px
                zIndex: 2,
                padding: "20px 0 0 0",
                marginBottom: "0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "14px",
                  textAlign: "center",
                  marginBottom: "20px",
                  lineHeight: "1.4",
                  background: "none",
                }}
              >
                One small step for you, one giant leap for {currentArtist?.name || 'this artist'}.
              </p>
              <MainButton onClick={() => router.push(`/donations?id=${currentArtist?.id || artistId}`)}>
                Help Support!
              </MainButton>
            </div>
          </div>
        </Sidebar>
        <main
          className="main-content-background"
          style={{
            flex: 1,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflow: "auto",
          }}
        >
          {/* <div
            style={{
              background: '#1976d2',
              color: 'white',
              padding: '24px 32px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '34px',
              fontWeight: 'bold',
              width: '120%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              height: '72px',
            }}
          >
            {/* Tooffu's Artist Profile */}
          {/* </div> */}

          <MainContentHeader>Upcoming Concerts</MainContentHeader>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "24px",
              paddingBottom: "8px"
            }}
          >
            {[
              {
                number: 1,
                title: "Summer Festival",
                date: "July 15",
                venue: "Central Park",
                price: "$45",
                time: "7:00 PM",
              },
              {
                number: 2,
                title: "Acoustic Night",
                date: "July 22",
                venue: "Blue Note",
                price: "$35",
                time: "8:30 PM",
              },
              {
                number: 3,
                title: "Rock Concert",
                date: "Aug 5",
                venue: "Madison Square",
                price: "$75",
                time: "8:00 PM",
              },
              {
                number: 4,
                title: "Jazz Session",
                date: "Aug 12",
                venue: "Birdland",
                price: "$40",
                time: "9:00 PM",
              },
              {
                number: 5,
                title: "Indie Show",
                date: "Aug 20",
                venue: "Bowery Ballroom",
                price: "$30",
                time: "7:30 PM",
              },
              {
                number: 6,
                title: "Festival Finale",
                date: "Aug 28",
                venue: "Governors Island",
                price: "$60",
                time: "6:00 PM",
              },
              {
                number: 7,
                title: "Intimate Set",
                date: "Sep 3",
                venue: "Joe's Pub",
                price: "$25",
                time: "8:00 PM",
              },
              {
                number: 8,
                title: "Outdoor Concert",
                date: "Sep 10",
                venue: "Prospect Park",
                price: "$50",
                time: "7:00 PM",
              },
              {
                number: 9,
                title: "Club Show",
                date: "Sep 17",
                venue: "Mercury Lounge",
                price: "$20",
                time: "9:30 PM",
              },
              {
                number: 10,
                title: "Theater Show",
                date: "Sep 24",
                venue: "Beacon Theatre",
                price: "$85",
                time: "8:00 PM",
              },
              {
                number: 11,
                title: "Halloween Special",
                date: "Oct 31",
                venue: "Brooklyn Bowl",
                price: "$55",
                time: "9:00 PM",
              },
              {
                number: 12,
                title: "Fall Festival",
                date: "Nov 7",
                venue: "Forest Hills",
                price: "$65",
                time: "6:30 PM",
              },
              {
                number: 13,
                title: "Holiday Concert",
                date: "Dec 15",
                venue: "Carnegie Hall",
                price: "$95",
                time: "7:30 PM",
              },
              {
                number: 14,
                title: "New Year's Eve",
                date: "Dec 31",
                venue: "Times Square",
                price: "$120",
                time: "11:00 PM",
              },
              {
                number: 15,
                title: "Winter Tour",
                date: "Jan 15",
                venue: "Radio City",
                price: "$80",
                time: "8:00 PM",
              },
            ].map((concert) => (
              <div
                key={concert.number}
              >
                <ConcertSquare
                  concertNumber={concert.number}
                  title={concert.title}
                  date={concert.date}
                  venue={concert.venue}
                  price={concert.price}
                  concertData={{
                    artist: currentArtist?.name || 'Unknown Artist',
                    title: concert.title,
                    date: concert.date,
                    time: concert.time,
                    venue: concert.venue,
                    address: "123 Music Street, City, State 12345",
                    price: concert.price,
                    description: `Join ${currentArtist?.name || 'this artist'} for an unforgettable ${concert.title.toLowerCase()} experience. This special event promises to deliver an amazing night of music and entertainment.`
                  }}
                />
              </div>
            ))}
          </div>

          <>
            <MainContentHeader>Similar Artists</MainContentHeader>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
                paddingBottom: "8px"
              }}
            >
              {[
                {
                  number: 1,
                  id: "luna-moon",
                  title: "Luna Moon",
                  genre: "Indie Rock",
                  followers: "125K",
                  albums: "3",
                  topSong: "Midnight Dreams",
                },
                {
                  number: 2,
                  id: "echo-valley",
                  title: "Echo Valley",
                  genre: "Alternative",
                  followers: "89K",
                  albums: "2",
                  topSong: "Valley Echo",
                },
                {
                  number: 3,
                  id: "midnight-sun",
                  title: "Midnight Sun",
                  genre: "Electronic",
                  followers: "200K",
                  albums: "4",
                  topSong: "Digital Dawn",
                },
              ].map((artist) => (
                <ArtistSquare
                  key={artist.number}
                  artistNumber={artist.number}
                  title={artist.title}
                  genre={artist.genre}
                  onClick={() => {
                    console.log(`Clicked on ${artist.title}`);
                    if (artist.id) {
                      router.push(`/artistsprofiles?id=${artist.id}`);
                    }
                  }}
                />
              ))}
            </div>
          </>

          {/* <Footer /> */}
        </main>
      </div>

    </div>
  );
}

export default function ArtistProfilePage() {
  return (
    <Suspense fallback={
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f5f5f5",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "18px", color: "#666" }}>Loading artist profile...</div>
      </div>
    }>
      <ArtistProfileContent />
    </Suspense>
  );
}
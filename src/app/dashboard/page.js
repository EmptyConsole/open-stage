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
import ArtistProfileImage from "../components/ArtistProfileImage";
import ConcertSquare from "../components/ConcertSquare";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [selectedTicket, setSelectedTicket] = useState(null);
  const router = useRouter();

  // Sample ticket data - will be populated from Firebase artists
  // const [tickets, setTickets] = useState([]);
  
  // Sample concerts data
  const [concerts, setConcerts] = useState([
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2024-07-15",
      venue: "Central Park",
      price: "25",
      artist: "Various Artists"
    },
    {
      id: 2,
      title: "Jazz Night",
      date: "2024-08-22",
      venue: "Blue Note Club",
      price: "35",
      artist: "Miles Davis Tribute"
    },
    {
      id: 3,
      title: "Rock Revolution",
      date: "2024-09-10",
      venue: "Madison Square Garden",
      price: "75",
      artist: "The Rolling Stones"
    },
    {
      id: 4,
      title: "Acoustic Sessions",
      date: "2024-10-05",
      venue: "Intimate Theater",
      price: "20",
      artist: "Ed Sheeran"
    },
    {
      id: 5,
      title: "Electronic Dreams",
      date: "2024-11-18",
      venue: "Warehouse District",
      price: "45",
      artist: "Deadmau5"
    },
    {
      id: 6,
      title: "Classical Symphony",
      date: "2024-12-08",
      venue: "Carnegie Hall",
      price: "60",
      artist: "New York Philharmonic"
    }
  ]);

  // Helper function to get status color
  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "purchased":
  //       return colors.lightBlue;
  //     case "upcoming":
  //       return "#a8e6cf"; // Lighter green
  //     case "late":
  //       return "#ffcdd2"; // Light red
  //     default:
  //       return colors.lightGray;
  //   }
  // };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  // Fetch artists and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Hardcoded ticket
        // const hardcodedTicket = {
        //   id: "hardcoded-1",
        //   artist: {
        //     id: "taylor-swift",
        //     name: "Taylor Swift",
        //     profilePicture:
        //       "https://via.placeholder.com/80x80/1976d2/ffffff?text=TS",
        //     description: "Pop sensation and Grammy winner",
        //   },
        //   concert: "The Eras Tour",
        //   date: "2024-03-15",
        //   status: "purchased",
        // };

        // setTickets([hardcodedTicket]);

        await getUsers();
        const artists = await getArtists();
        console.log("Fetched artists:", artists);
        setFollowedArtists(artists);

        // const firebaseTickets =
        //   artists && artists.length > 0
        //     ? artists.slice(0, 2).map((artist, index) => ({
        //         id: artist.id || index + 1,
        //         artist: {
        //           id: artist.id,
        //           name: artist.name,
        //           profilePicture:
        //             artist.profilePicture ||
        //             `https://via.placeholder.com/80x80/1976d2/ffffff?text=${artist.name
        //               .split(" ")
        //               .map((n) => n[0])
        //               .join("")}`,
        //           description: artist.description || "Artist description",
        //         },
        //         concert: `${artist.name} Tour ${new Date().getFullYear()}`,
        //         date: new Date(
        //           Date.now() + (index + 1) * 30 * 24 * 60 * 60 * 1000
        //         )
        //           .toISOString()
        //           .split("T")[0],
        //         status: index === 0 ? "purchased" : "upcoming",
        //       }))
        //     : [];

        // const generatedTickets = [hardcodedTicket, ...firebaseTickets];
        // console.log("Generated tickets:", generatedTickets);
        // setTickets(generatedTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 Filter artists by search value
  const filteredArtists = followedArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Ticket Popup Component
  // const TicketPopup = () => {
  //   if (!showPopup || !selectedTicket) return null;

  //   return (
  //     <div
  //       style={{
  //         position: 'fixed',
  //         top: 0,
  //         left: 0,
  //         right: 0,
  //         bottom: 0,
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         zIndex: 1000,
  //         padding: '20px',
  //       }}
  //       onClick={() => setShowPopup(false)}
  //     >
  //       <div
  //         style={{
  //           backgroundColor: 'white',
  //           borderRadius: '12px',
  //           padding: '32px',
  //           maxWidth: '600px',
  //           width: '100%',
  //           maxHeight: '80vh',
  //           overflow: 'auto',
  //           boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  //           position: 'relative',
  //         }}
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         {/* Close button */}
  //         <button
  //           onClick={() => setShowPopup(false)}
  //           style={{
  //             position: 'absolute',
  //             top: '16px',
  //             right: '16px',
  //             background: 'none',
  //             border: 'none',
  //             fontSize: '24px',
  //             cursor: 'pointer',
  //             color: '#666',
  //             width: '32px',
  //             height: '32px',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             borderRadius: '50%',
  //             transition: 'background-color 0.2s',
  //           }}
  //           onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
  //           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
  //         >
  //           ×
  //         </button>

  //         {/* Header */}
  //         <div style={{ marginBottom: '24px' }}>
  //           <h2 style={{ 
  //             margin: '0 0 8px 0', 
  //             color: colors.primary, 
  //             fontSize: '28px',
  //             fontWeight: 'bold'
  //           }}>
  //             {selectedTicket.artist.name}'s Concert
  //           </h2>
  //           <p style={{ 
  //             margin: 0, 
  //             color: '#666', 
  //             fontSize: '16px'
  //           }}>
  //             {selectedTicket.concert}
  //           </p>
  //         </div>

  //         {/* Concert Image */}
  //         <div
  //           style={{
  //             width: '100%',
  //             height: '200px',
  //             background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
  //             borderRadius: '8px',
  //             marginBottom: '24px',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             color: 'white',
  //             fontSize: '18px',
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           Concert Image
  //         </div>

  //         {/* Concert Details Grid */}
  //         <div style={{ 
  //           display: 'grid', 
  //           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
  //           gap: '16px',
  //           marginBottom: '24px'
  //         }}>
  //           <div style={{ 
  //             background: '#f8f9fa', 
  //             padding: '16px', 
  //             borderRadius: '8px',
  //             border: '1px solid #e9ecef'
  //           }}>
  //             <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
  //               DATE
  //             </h4>
  //             <p style={{ margin: 0, color: '#333', fontSize: '16px' }}>
  //               {formatDate(selectedTicket.date)}
  //             </p>
  //           </div>
  //           <div style={{ 
  //             background: '#f8f9fa', 
  //             padding: '16px', 
  //             borderRadius: '8px',
  //             border: '1px solid #e9ecef'
  //           }}>
  //             <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
  //               STATUS
  //             </h4>
  //             <p style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}>
  //               {selectedTicket.status}
  //             </p>
  //           </div>
  //           <div style={{ 
  //             background: '#f8f9fa', 
  //             padding: '16px', 
  //             borderRadius: '8px',
  //             border: '1px solid #e9ecef'
  //           }}>
  //             <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
  //               VENUE
  //             </h4>
  //             <p style={{ margin: 0, color: '#333', fontSize: '16px' }}>
  //               TBD
  //             </p>
  //           </div>
  //           <div style={{ 
  //             background: '#f8f9fa', 
  //             padding: '16px', 
  //             borderRadius: '8px',
  //             border: '1px solid #e9ecef'
  //           }}>
  //             <h4 style={{ margin: '0 0 8px 0', color: colors.primary, fontSize: '14px', fontWeight: 'bold' }}>
  //               PRICE
  //             </h4>
  //             <p style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: 'bold' }}>
  //               $50
  //             </p>
  //           </div>
  //         </div>

  //         {/* Artist Description */}
  //         <div style={{ marginBottom: '24px' }}>
  //           <h3 style={{ 
  //             margin: '0 0 12px 0', 
  //             color: colors.primary, 
  //             fontSize: '20px',
  //             fontWeight: 'bold'
  //           }}>
  //             About {selectedTicket.artist.name}
  //           </h3>
  //           <p style={{ 
  //             margin: 0, 
  //             color: '#333', 
  //             fontSize: '16px', 
  //             lineHeight: '1.6'
  //           }}>
  //             {selectedTicket.artist.description}
  //           </p>
  //         </div>

  //         {/* Action Buttons */}
  //         <div style={{ 
  //           display: 'flex', 
  //           gap: '12px', 
  //           justifyContent: 'flex-end',
  //           marginTop: '24px'
  //         }}>
  //           <button
  //             onClick={() => setShowPopup(false)}
  //             style={{
  //               padding: '12px 24px',
  //               border: '1px solid #ddd',
  //               borderRadius: '6px',
  //               background: 'white',
  //               color: '#333',
  //               cursor: 'pointer',
  //               fontSize: '14px',
  //               fontWeight: '500',
  //               transition: 'all 0.2s',
  //             }}
  //             onMouseEnter={(e) => {
  //               e.target.style.backgroundColor = '#f8f9fa';
  //             }}
  //             onMouseLeave={(e) => {
  //               e.target.style.backgroundColor = 'white';
  //             }}
  //           >
  //             Close
  //           </button>
  //           <button
  //             onClick={() => {
  //               if (selectedTicket.artist.id) {
  //                 router.push(`/artistsprofiles?id=${selectedTicket.artist.id}`);
  //               }
  //               setShowPopup(false);
  //             }}
  //             style={{
  //               padding: '12px 24px',
  //               border: 'none',
  //               borderRadius: '6px',
  //               background: colors.primary,
  //               color: 'white',
  //               cursor: 'pointer',
  //               fontSize: '14px',
  //               fontWeight: '500',
  //               transition: 'all 0.2s',
  //             }}
  //             onMouseEnter={(e) => {
  //               e.target.style.backgroundColor = '#1565c0';
  //             }}
  //             onMouseLeave={(e) => {
  //               e.target.style.backgroundColor = colors.primary;
  //             }}
  //           >
  //             View Artist Profile
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Followed Artists Component
  const FollowedArtistsSection = ({ isMobileLayout = false }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        paddingBottom: isMobileLayout ? "0" : "24px",
      }}
    >
      {loading ? (
        <div
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            padding: "20px",
          }}
        >
          Loading artists...
        </div>
      ) : filteredArtists.length > 0 ? (
        filteredArtists.map((artist, index) => (
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
              borderRadius: isMobileLayout ? "12px" : "8px",
              padding: "16px",
              boxShadow: isMobileLayout
                ? "0 2px 8px rgba(0,0,0,0.1)"
                : "0 2px 4px rgba(0,0,0,0.04)",
              transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
              cursor: "pointer",
              border: isMobileLayout ? "1px solid #e0e0e0" : "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobileLayout ? "16px" : "12px",
              }}
            >
              {/* Artist Profile Picture */}
              <ArtistProfileImage
                artistId={artist.id || artist.name}
                artistName={artist.name}
                size={isMobileLayout ? 60 : 80}
                style={{
                  border: isMobileLayout
                    ? "none"
                    : `2px dashed ${colors.border}`,
                }}
              />

              {/* Text content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    color: colors.primary,
                    fontWeight: "bold",
                    fontSize: isMobileLayout ? "16px" : "14px",
                    textAlign: "left",
                  }}
                >
                  {artist.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: colors.textPrimary,
                    fontSize: isMobileLayout ? "14px" : "12px",
                    textAlign: "left",
                    lineHeight: "1.3",
                  }}
                >
                  {artist.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            padding: "20px",
          }}
        >
          {searchValue ? "No artists match your search" : "No artists found"}
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
        width: "100vw",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <DynamicHeader />
      {/* <TicketPopup /> */}
      {isMobile ? (
        // 📱 Mobile Layout
        <main
          className="main-content-background"
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            maxWidth: "100vw",
            width: "100vw",
            boxSizing: "border-box",
          }}
          >
          {/* Search Bar */}
          <div style={{ marginBottom: "24px" }}>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                color: "#1a1a1a",
                padding: "12px 16px",
                border: "1px solid #666666",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                background: colors.white,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Followed Artists Section */}
          <div style={{ marginBottom: "32px" }}>
            <MainContentHeader>Followed Artists</MainContentHeader>
            <div style={{ marginTop: "16px" }}>
              <FollowedArtistsSection isMobileLayout={true} />
            </div>
          </div>

          {/* Your Tickets Section - COMMENTED OUT */}
          {/* <div>
            <MainContentHeader>Your Tickets</MainContentHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              {loading && tickets.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    padding: "20px",
                  }}
                >
                  Loading tickets...
                </div>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowPopup(true);
                    }}
                    style={{
                      background: colors.white,
                      borderRadius: "12px",
                      padding: "16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "12px",
                        background: colors.lightGray,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={ticket.artist.profilePicture}
                        alt={ticket.artist.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: "0 0 6px 0",
                          color: colors.primary,
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {ticket.artist.name}
                      </h3>
                      <p
                        style={{
                          margin: "0 0 6px 0",
                          color: colors.textPrimary,
                          fontSize: "14px",
                        }}
                      >
                        {ticket.concert}
                      </p>
                      <div
                        style={{
                          color: colors.textSecondary,
                          fontSize: "12px",
                        }}
                      >
                        {formatDate(ticket.date)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    padding: "20px",
                  }}
                >
                  No tickets found
                </div>
              )}
            </div>
          </div> */}

          {/* Upcoming Concerts Section */}
          <div style={{ marginTop: "32px" }}>
            <MainContentHeader>Upcoming Concerts</MainContentHeader>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
                marginTop: "16px",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              {concerts.map((concert) => (
                <ConcertSquare
                  key={concert.id}
                  concertNumber={concert.id}
                  title={concert.title}
                  date={formatDate(concert.date)}
                  venue={concert.venue}
                  price={concert.price}
                  concertId={concert.id}
                />
              ))}
            </div>
          </div>
        </main>
      ) : (
        // 🖥️ Desktop Layout
        <div style={{ 
          display: "flex", 
          flex: 1, 
          width: "100vw", 
          maxWidth: "100vw", 
          boxSizing: "border-box",
          overflowX: "hidden",
          position: "relative"
        }}>
          <Sidebar>
            <div style={{ marginTop: "-40px" }}>
              <div style={{ marginLeft: "-100px" }}>
                <MainContentHeader>Followed Artists</MainContentHeader>
              </div>
              <input
                type="text"
                placeholder="Search artists..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  color: "#1a1a1a",
                  padding: "8px",
                  border: "1px solid #666666",
                  borderRadius: "6px",
                  margin: "0 0 24px 0",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              />
              <FollowedArtistsSection isMobileLayout={false} />
            </div>
          </Sidebar>

          {/* Tickets */}
          <main
            className="main-content-background"
            style={{
              flex: 1,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              maxWidth: "calc(100vw - 330px)",
              width: "calc(100vw - 330px)",
              boxSizing: "border-box",
              overflowX: "hidden",
              position: "relative",
            }}
          >
            {/* Your Tickets Section - COMMENTED OUT */}
            {/* <MainContentHeader>Your Tickets</MainContentHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {loading && tickets.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    padding: "20px",
                  }}
                >
                  Loading tickets...
                </div>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowPopup(true);
                    }}
                    style={{
                      background: colors.white,
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        background: colors.lightGray,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={ticket.artist.profilePicture}
                        alt={ticket.artist.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: "0 0 8px 0",
                          color: colors.primary,
                          fontWeight: "bold",
                          fontSize: "24px",
                        }}
                      >
                        {ticket.artist.name}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: colors.textPrimary,
                          fontSize: "18px",
                        }}
                      >
                        {ticket.concert}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          color: colors.textPrimary,
                          fontSize: "18px",
                          fontWeight: "500",
                          marginBottom: "4px",
                        }}
                      >
                        {formatDate(ticket.date)}
                      </div>
                      <div
                        style={{
                          color: colors.textSecondary,
                          fontSize: "16px",
                        }}
                      >
                        {ticket.concert}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    padding: "20px",
                  }}
                >
                  No tickets found
                </div>
              )}
            </div> */}

            {/* Upcoming Concerts Section */}
            <MainContentHeader>Upcoming Concerts</MainContentHeader>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "16px",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              {concerts.map((concert) => (
                <ConcertSquare
                  key={concert.id}
                  concertNumber={concert.id}
                  title={concert.title}
                  date={formatDate(concert.date)}
                  venue={concert.venue}
                  price={concert.price}
                  concertId={concert.id}
                />
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

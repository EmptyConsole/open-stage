"use client";
import React, { useState } from "react";
import "@/app/globals.css";
import Sidebar from "../components/sidebar.js";
import Header from "../components/Header";
// import Footer from "../components/footer";
import FollowButton from "../components/followbutton";
import ConcertSquare from "../components/ConcertSquare";
import ArtistSquare from "../components/ArtistSquare";
import MainContentHeader from "../components/MainContentHeader";

export default function HomePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleItemHover = (item, type) => {
    setHoveredItem(item);
    setHoveredType(type);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
    setHoveredType(null);
  };

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
      <Header />
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
              {/* ...existing code for image and follow button... */}
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  background: "#f0f0f0",
                  border: "2px dashed #ccc",
                  borderRadius: "0",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "8px",
                    color: "#000",
                    fontSize: "24px",
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  Tooffu
                </div>
                <FollowButton
                  isFollowing={isFollowing}
                  toggleFollow={toggleFollow}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                description...
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
                One small step for you, one giant leap for Tooffu.
              </p>
              <button
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                Help Support!
              </button>
            </div>
          </div>
        </Sidebar>
        <main
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
              gap: "16px",
              marginBottom: "24px",
              overflowX: "auto",
              paddingBottom: "8px",
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
                onMouseEnter={() => handleItemHover(concert, "concert")} // ✅ keep only this
              >
                <ConcertSquare
                  concertNumber={concert.number}
                  title={concert.title}
                  date={concert.date}
                  venue={concert.venue}
                  onClick={() => console.log(`Clicked on ${concert.title}`)}
                />
              </div>
            ))}
          </div>

          <>
            <MainContentHeader>Similar Artists</MainContentHeader>

            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "24px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {[
                {
                  number: 1,
                  title: "Luna Moon",
                  genre: "Indie Rock",
                  followers: "125K",
                  albums: "3",
                  topSong: "Midnight Dreams",
                },
                {
                  number: 2,
                  title: "Echo Valley",
                  genre: "Alternative",
                  followers: "89K",
                  albums: "2",
                  topSong: "Valley Echo",
                },
                {
                  number: 3,
                  title: "Midnight Sun",
                  genre: "Electronic",
                  followers: "200K",
                  albums: "4",
                  topSong: "Digital Dawn",
                },
                {
                  number: 4,
                  title: "River Stone",
                  genre: "Folk",
                  followers: "67K",
                  albums: "1",
                  topSong: "River Flow",
                },
                {
                  number: 5,
                  title: "Urban Beat",
                  genre: "Hip Hop",
                  followers: "300K",
                  albums: "5",
                  topSong: "City Rhythm",
                },
                {
                  number: 6,
                  title: "Crystal Clear",
                  genre: "Pop",
                  followers: "450K",
                  albums: "6",
                  topSong: "Clear Skies",
                },
                {
                  number: 7,
                  title: "Deep Forest",
                  genre: "Ambient",
                  followers: "78K",
                  albums: "3",
                  topSong: "Forest Whispers",
                },
                {
                  number: 8,
                  title: "City Lights",
                  genre: "Jazz",
                  followers: "95K",
                  albums: "2",
                  topSong: "Night Jazz",
                },
                {
                  number: 9,
                  title: "Ocean Wave",
                  genre: "Reggae",
                  followers: "110K",
                  albums: "4",
                  topSong: "Wave Rider",
                },
                {
                  number: 10,
                  title: "Mountain Peak",
                  genre: "Rock",
                  followers: "180K",
                  albums: "3",
                  topSong: "Peak Performance",
                },
                {
                  number: 11,
                  title: "Desert Wind",
                  genre: "Blues",
                  followers: "85K",
                  albums: "2",
                  topSong: "Wind Song",
                },
                {
                  number: 12,
                  title: "Night Sky",
                  genre: "R&B",
                  followers: "220K",
                  albums: "4",
                  topSong: "Sky High",
                },
                {
                  number: 13,
                  title: "Golden Hour",
                  genre: "Country",
                  followers: "140K",
                  albums: "3",
                  topSong: "Golden Days",
                },
                {
                  number: 14,
                  title: "Silver Moon",
                  genre: "Classical",
                  followers: "65K",
                  albums: "1",
                  topSong: "Moonlight Sonata",
                },
                {
                  number: 15,
                  title: "Fire Dance",
                  genre: "World",
                  followers: "160K",
                  albums: "3",
                  topSong: "Dance of Fire",
                },
              ].map((artist) => (
                <ArtistSquare
                  key={artist.number}
                  artistNumber={artist.number}
                  title={artist.title}
                  genre={artist.genre}
                  onClick={() => {
                    console.log(`Clicked on ${artist.title}`);
                    setHoveredItem(null); // ✅ close popup when artist clicked
                  }}
                />
              ))}
            </div>
          </>

          {/* <Footer /> */}
        </main>
      </div>

      {/* Detailed View */}
      {hoveredItem && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "330px", // sidebar width
            right: 0,
            background: "#fff",
            borderTop: "3px solid #1976d2",
            padding: "24px",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "40vh",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                background: "#ededed",
                borderRadius: "8px",
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "12px",
              }}
            >
              Concert Image
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  color: "#1976d2",
                  fontSize: "28px",
                  margin: "0 0 8px 0",
                  fontWeight: "bold",
                }}
              >
                {hoveredItem.title}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                  fontSize: "16px",
                  color: "#111", // darker, stronger text
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: "#1976d2" }}>
                    Date:
                  </span>{" "}
                  {hoveredItem.date}
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: "#1976d2" }}>
                    Time:
                  </span>{" "}
                  {hoveredItem.time}
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: "#1976d2" }}>
                    Venue:
                  </span>{" "}
                  {hoveredItem.venue}
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: "#1976d2" }}>
                    Price:
                  </span>{" "}
                  {hoveredItem.price}
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 16px 0",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                Join Tooffu for an unforgettable{" "}
                {hoveredItem.title.toLowerCase()} experience. This special event
                promises to deliver an amazing night of music and entertainment.
              </p>
              <button
                style={{
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

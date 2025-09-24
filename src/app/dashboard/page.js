"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import Footer from "../components/footer";
import SidebarArtistSquare from "../components/SidebarArtistSquare";
import ConcertSquare from "../components/ConcertSquare";
import MainContentHeader from "../components/MainContentHeader";
import MainButton from "../components/MainButton";
import React, { useState, useEffect } from "react";
import { getUsers, getArtists } from "../../../util/users";

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Call getUsers and getArtists when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getUsers();
        const artists = await getArtists();
        setFollowedArtists(artists);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Data arrays

  const yourTickets = [
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
  ];

  const concertsNearYou = [
    {
      number: 1,
      title: "Jazz Session",
      date: "July 18",
      venue: "Birdland",
      price: "$40",
      time: "9:00 PM",
    },
    {
      number: 2,
      title: "Indie Show",
      date: "July 25",
      venue: "Bowery Ballroom",
      price: "$30",
      time: "7:30 PM",
    },
    {
      number: 3,
      title: "Festival Finale",
      date: "Aug 8",
      venue: "Governors Island",
      price: "$60",
      time: "6:00 PM",
    },
    {
      number: 4,
      title: "Intimate Set",
      date: "Aug 15",
      venue: "Joe's Pub",
      price: "$25",
      time: "8:00 PM",
    },
    {
      number: 5,
      title: "Outdoor Concert",
      date: "Aug 22",
      venue: "Prospect Park",
      price: "$50",
      time: "7:00 PM",
    },
  ];

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
              height: "100%",
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                marginBottom: "20px",
                padding: "0 16px",
              }}
            >
              <input
                type="text"
                placeholder="Search artists, concerts..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1976d2";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                }}
              />
            </div>

            {/* Followed Artists Section */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0 16px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px 0",
                  color: "#333",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Followed Artists
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {loading ? (
                  <div style={{ textAlign: "center", color: "#666" }}>
                    Loading artists...
                  </div>
                ) : followedArtists.length > 0 ? (
                  followedArtists.slice(0, 5).map((artist, index) => (
                    <SidebarArtistSquare
                      key={artist.id || index}
                      artistNumber={index + 1}
                      title={artist.name}
                      onClick={() => {
                        console.log(`Clicked on ${artist.name}`);
                      }}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: "center", color: "#666" }}>
                    No artists followed yet
                  </div>
                )}
              </div>
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
          <MainContentHeader>Your Tickets</MainContentHeader>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "32px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {yourTickets.map((ticket) => (
              <ConcertSquare
                key={ticket.number}
                concertNumber={ticket.number}
                title={ticket.title}
                date={ticket.date}
                venue={ticket.venue}
                onClick={() => console.log(`Clicked on ${ticket.title}`)}
              />
            ))}
          </div>

          <MainContentHeader>Concerts Near You</MainContentHeader>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {concertsNearYou.map((concert) => (
              <ConcertSquare
                key={concert.number}
                concertNumber={concert.number}
                title={concert.title}
                date={concert.date}
                venue={concert.venue}
                onClick={() => console.log(`Clicked on ${concert.title}`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

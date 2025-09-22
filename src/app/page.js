"use client";
// import styles from "./page.module.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
// import Footer from "./components/footer";
// import SidebarArtistSquare from "./components/SidebarArtistSquare";
import ConcertSquare from "./components/ConcertSquare";
import MainContentHeader from "./components/MainContentHeader";
import MainButton from "./components/MainButton";
import React, { useState, useEffect } from "react";
import { getArtists } from "../../util/users";
import Link from "next/link";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetch followed artists on mount (replace with your logic)
  useEffect(() => {
    async function fetchArtists() {
      setLoading(true);
      // Replace with your actual fetching logic
      const artists = await getArtists();
      setFollowedArtists(artists || []);
      setLoading(false);
    }
    fetchArtists();
  }, []);

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
      date: "Aug 12",
      venue: "Birdland",
      price: "$40",
      time: "9:00 PM",
    },
    {
      number: 2,
      title: "Indie Show",
      date: "Aug 20",
      venue: "Bowery Ballroom",
      price: "$30",
      time: "7:30 PM",
    },
    {
      number: 3,
      title: "Festival Finale",
      date: "Aug 28",
      venue: "Governors Island",
      price: "$60",
      time: "6:00 PM",
    },
    {
      number: 4,
      title: "Intimate Set",
      date: "Sep 3",
      venue: "Joe's Pub",
      price: "$25",
      time: "8:00 PM",
    },
    {
      number: 5,
      title: "Outdoor Concert",
      date: "Sep 10",
      venue: "Prospect Park",
      price: "$50",
      time: "7:00 PM",
    },
  ];

  const supportArtists = ["Luna Moon", "Echo Valley", "Midnight Sun"];

  // Filter function for concerts
  const filterItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTickets = filterItems(yourTickets, searchValue);
  const filteredConcerts = filterItems(concertsNearYou, searchValue);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar>
          <div>
            <h2
              style={{
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: "25px",
                margin: "-30px 0 16px 8px",
                textAlign: "left",
              }}
            >
              Followed Artists
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {loading ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#666",
                    padding: "20px",
                  }}
                >
                  Loading artists...
                </div>
              ) : followedArtists.length > 0 ? (
                followedArtists.map((artist, index) => (
                  <Link
                    key={artist.id || index}
                    href={`/artist/${artist.id || index}`}
                    style={{
                      display: "block",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      console.log(`Clicked on ${artist.name}`)
                    }
                  >
                    <div>{artist.name}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {artist.description}
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#666",
                    padding: "20px",
                  }}
                >
                  No artists found
                </div>
              )}
            </div>
          </div>
        </Sidebar>
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          <MainContentHeader
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <section>
            <h2>Your Tickets</h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {filteredTickets.map((ticket) => (
                <ConcertSquare key={ticket.number} {...ticket} />
              ))}
            </div>
          </section>
          <section style={{ marginTop: "40px" }}>
            <h2>Concerts Near You</h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {filteredConcerts.map((concert) => (
                <ConcertSquare key={concert.number} {...concert} />
              ))}
            </div>
          </section>
          <section style={{ marginTop: "40px" }}>
            <h2>Support Artists</h2>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {supportArtists.map((artist, idx) => (
                <MainButton key={idx} label={`Support ${artist}`} />
              ))}
            </div>
          </section>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

"use client";
import styles from "./page.module.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
// import Footer from "./components/footer";
import SidebarArtistSquare from "./components/SidebarArtistSquare";
import ConcertSquare from "./components/ConcertSquare";
import MainContentHeader from "./components/MainContentHeader";
import MainButton from "./components/MainButton";
import React, { useState, useEffect } from "react";
import { getUsers, getArtists } from "./viewtickets/util/users";

export default function HomePage() {
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
    if (!searchTerm.trim()) return items;
    
    return items.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      // For concerts
      return item.title.toLowerCase().includes(searchLower) || 
             item.venue.toLowerCase().includes(searchLower) ||
             item.date.toLowerCase().includes(searchLower);
    });
  };


  // Get filtered data
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
                <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                  Loading artists...
                </div>
              ) : followedArtists.length > 0 ? (
                followedArtists.map((artist, index) => (
                  <SidebarArtistSquare
                    key={artist.id || index}
                    artistName={artist.name}
                    description={artist.description}
                    onClick={() => console.log(`Clicked on ${artist.name}`)}
                  />
                ))
              ) : (
                <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                  No artists found
                </div>
              )}
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
          }}
        >
          {/* Searchbar at the top */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for concerts, artists, genres:"
            style={{
              padding: "12px 16px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "24px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
              background: "#fff",
              color: "#000", // <-- Added to make text black
            }}
          />
          
          {/* Your Tickets Section */}
          <MainContentHeader>Your Tickets</MainContentHeader>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {filteredTickets.map((ticket) => (
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

          {/* Concerts Near You Section */}
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
            {filteredConcerts.map((concert) => (
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

          {/* Support Section */}
          <p
            style={{
              margin: "0 0 8px 0",
              color: "#333",
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            Loved your latest concert?
          </p>
            <MainContentHeader>Help Support!</MainContentHeader>

            {/* Recent Artists Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              {supportArtists.map((artistName) => (
                <MainButton
                  key={artistName}
                  onClick={() => console.log(`Clicked on ${artistName}`)}
                >
                  {artistName}
                </MainButton>
              ))}
            </div>

           
          <div className="main-content"></div>
          {/* <Footer>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#ccc' }}>
              Built with Next.js and React. 
            </div>
          </Footer> */}
        </main>
      </div>
    </div>
  );
}

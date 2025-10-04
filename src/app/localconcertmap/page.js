"use client";
import React, { useState } from "react";
import styles from "./localconcertmap.module.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
// import Footer from "../components/footer";
// import styles from "./src/app/globals.css"

// Dummy concert data
const concerts = [
  { id: 1, name: "Jazz Night", lat: 37.7749, lng: -122.4194 },
  { id: 2, name: "Rock Fest", lat: 37.7849, lng: -122.4094 },
  { id: 3, name: "Indie Jam", lat: 37.7649, lng: -122.4294 },
];

// Simple map using Google Maps Static API (for demo purposes)
const MAP_CENTER = { lat: 37.7749, lng: -122.4194 };
const MAP_ZOOM = 13;
const MAP_SIZE = "600x400";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key

function getMapUrl() {
  // Handle missing API key gracefully
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("Google Maps API key is missing. Please add GOOGLE_MAPS_API_KEY to your environment variables.");
    return ""; // Return empty string to prevent broken image
  }
  
  const markers = concerts
    .map(
      (concert) =>
        `&markers=color:red%7Clabel:${concert.id}%7C${concert.lat},${concert.lng}`
    )
    .join("");
  return `https://maps.googleapis.com/maps/api/staticmap?center=${MAP_CENTER.lat},${MAP_CENTER.lng}&zoom=${MAP_ZOOM}&size=${MAP_SIZE}${markers}&key=${GOOGLE_MAPS_API_KEY}`;
}

export default function LocalConcertMapPage() {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  // Use useEffect to ensure consistent behavior between server and client
  React.useEffect(() => {
    setMapUrl(getMapUrl());
  }, []);

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
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar>
          <div>
            <h2 className={styles.sidebarTitle}>Concerts Nearby</h2>
            <ul className={styles.concertList}>
              {concerts.map((concert) => (
                <li
                  key={concert.id}
                  className={
                    selectedConcert === concert.id
                      ? styles.concertItemSelected
                      : styles.concertItem
                  }
                  onClick={() => setSelectedConcert(concert.id)}
                >
                  <span className={styles.concertName}>{concert.name}</span>
                  <br />
                  <span className={styles.concertCoords}>
                    Lat: {concert.lat}, Lng: {concert.lng}
                  </span>
                </li>
              ))}
            </ul>
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
          }}
        >
          {mapUrl ? (
            <img
              src={mapUrl}
              alt="Concert Map"
              className={selectedConcert ? styles.mapSelected : styles.map}
            />
          ) : (
            <div className={styles.mapPlaceholder}>
              <p>Map unavailable - Please configure GOOGLE_MAPS_API_KEY</p>
            </div>
          )}
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
}

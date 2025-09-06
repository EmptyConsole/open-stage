"use client";
import React, { useState } from "react";
import styles from "./localconcertmap.module.css";
import Sidebar from "../components/sidebar";
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
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY"; // Replace with your API key

function getMapUrl() {
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

  return (
    <main className={styles.main}>
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
      <div className={styles.header_main}>
        <header className={styles.headerContainer}>
          <div className={styles.headerBar}>
            <div>Header content goes here</div>
          </div>
          <div className={styles.mainContent}>
            <img
              src={getMapUrl()}
              alt="Concert Map"
              className={selectedConcert ? styles.mapSelected : styles.map}
            />
          </div>
        </header>
      </div>
    </main>
  );
}

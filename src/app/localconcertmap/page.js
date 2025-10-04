"use client";
import React, { useState, useEffect, useRef } from "react";
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

// Map configuration
const MAP_CENTER = { lat: 37.7749, lng: -122.4194 };
const MAP_ZOOM = 13;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function LocalConcertMapPage() {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  // Load Google Maps API
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.warn("Google Maps API key is missing. Please add GOOGLE_MAPS_API_KEY to your environment variables.");
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      mapTypeId: 'roadmap',
      gestureHandling: 'greedy', // Enable mouse wheel zoom and drag
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    });

    setMap(mapInstance);

    // Create markers for concerts
    const concertMarkers = concerts.map((concert) => {
      const marker = new window.google.maps.Marker({
        position: { lat: concert.lat, lng: concert.lng },
        map: mapInstance,
        title: concert.name,
        label: concert.id.toString(),
        animation: window.google.maps.Animation.DROP,
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        setSelectedConcert(concert.id);
        // Center map on selected concert
        mapInstance.setCenter({ lat: concert.lat, lng: concert.lng });
        mapInstance.setZoom(15);
      });

      return marker;
    });

    setMarkers(concertMarkers);
  };

  // Handle concert selection from sidebar
  const handleConcertSelect = (concertId) => {
    setSelectedConcert(concertId);
    const concert = concerts.find(c => c.id === concertId);
    if (concert && map) {
      map.setCenter({ lat: concert.lat, lng: concert.lng });
      map.setZoom(15);
    }
  };

  return (
    <div className="main"
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
          <div className="desktop-only">
            <h2 className={styles.sidebarTitle}>Concerts Nearby</h2>
            <ul className={styles.concertList}>
              {concerts.slice(0, 4).map((concert) => (
                <li
                  key={concert.id}
                  className={
                    selectedConcert === concert.id
                      ? styles.concertItemSelected
                      : styles.concertItem
                  }
                  onClick={() => handleConcertSelect(concert.id)}
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
          className="main-content-background main_content"
          style={{
            flex: 1,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          {/* Mobile Concert List - Only visible on mobile */}
          <div className="mobile-only" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>Concerts Nearby</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {concerts.slice(0, 3).map((concert) => (
                <div
                  key={concert.id}
                  onClick={() => handleConcertSelect(concert.id)}
                  style={{
                    padding: '12px',
                    background: selectedConcert === concert.id ? '#e3f2fd' : '#fff',
                    border: selectedConcert === concert.id ? '2px solid #1976d2' : '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{concert.name}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    Lat: {concert.lat}, Lng: {concert.lng}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {GOOGLE_MAPS_API_KEY ? (
            <div
              ref={mapRef}
              className={selectedConcert ? styles.mapSelected : styles.map}
              style={{
                width: "100%",
                height: "500px",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              }}
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

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
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);

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
        <main
          className="main-content-background"
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          {/* Concerts List Section */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ 
              margin: "0 0 16px 0", 
              color: "#1976d2", 
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              Concerts Nearby
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {concerts.map((concert) => (
                <div
                  key={concert.id}
                  onClick={() => handleConcertSelect(concert.id)}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: selectedConcert === concert.id ? "#e3f2fd" : "#f8f9fa",
                    border: selectedConcert === concert.id ? "2px solid #1976d2" : "1px solid #e0e0e0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ 
                    fontWeight: "bold", 
                    color: "#1976d2", 
                    fontSize: "16px",
                    marginBottom: "4px"
                  }}>
                    {concert.name}
                  </div>
                  <div style={{ 
                    color: "#666", 
                    fontSize: "12px" 
                  }}>
                    Lat: {concert.lat}, Lng: {concert.lng}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          {GOOGLE_MAPS_API_KEY ? (
            <div
              ref={mapRef}
              className={selectedConcert ? styles.mapSelected : styles.map}
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              }}
            />
          ) : (
            <div 
              className={styles.mapPlaceholder}
              style={{
                height: "400px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9fa",
                border: "2px dashed #ccc"
              }}
            >
              <p style={{ color: "#666", textAlign: "center" }}>
                Map unavailable - Please configure GOOGLE_MAPS_API_KEY
              </p>
            </div>
          )}
        </main>
      ) : (
        // Desktop Layout - With Sidebar
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
            className="main-content-background"
            style={{
              flex: 1,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
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
          </main>
        </div>
      )}
    </div>
  );
}

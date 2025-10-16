"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./localconcertmap.module.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import { useRouter } from "next/navigation";
import { navigateToConcertDetails } from "../utils/concertNavigation";
import ConcertSquare from "../components/ConcertSquare";
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

// Global flag to track if Google Maps script is being loaded
let isGoogleMapsLoading = false;
let googleMapsLoadPromise = null;

export default function LocalConcertMapPage() {
  const router = useRouter();
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef(null);
  // Filter concerts by search term
  const filteredConcerts = concerts.filter(concert =>
    concert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Zoom and fit map to filtered concerts when search changes
  useEffect(() => {
    if (!map || filteredConcerts.length === 0 || !window.google) return;
    if (filteredConcerts.length === 1) {
      // Center and zoom to single concert
      const c = filteredConcerts[0];
      map.setCenter({ lat: c.lat, lng: c.lng });
      map.setZoom(15);
    } else {
      // Fit bounds to all filtered concerts
      const bounds = new window.google.maps.LatLngBounds();
      filteredConcerts.forEach(c => {
        bounds.extend(new window.google.maps.LatLng(c.lat, c.lng));
      });
      map.fitBounds(bounds);
    }
  }, [searchTerm, map]);

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

    // If script is already being loaded, wait for it
    if (isGoogleMapsLoading && googleMapsLoadPromise) {
      googleMapsLoadPromise.then(initializeMap);
      return;
    }

    // Start loading the script
    isGoogleMapsLoading = true;
    googleMapsLoadPromise = new Promise((resolve, reject) => {
      // Check if script already exists in DOM
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        // Script already exists, just wait for it to load
        if (window.google && window.google.maps) {
          resolve();
        } else {
          existingScript.addEventListener('load', resolve);
          existingScript.addEventListener('error', reject);
        }
        return;
      }

      // Create and load new script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    googleMapsLoadPromise
      .then(() => {
        isGoogleMapsLoading = false;
        initializeMap();
      })
      .catch((error) => {
        isGoogleMapsLoading = false;
        console.error('Failed to load Google Maps API:', error);
      });

    // No cleanup needed as we want to keep the script loaded globally
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
            position: "relative"
          }}
        >
          {/* Search bar hovering over the map */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderRadius: "8px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              minWidth: "220px",
              maxWidth: "90%"
            }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search concerts..."
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "16px",
                outline: "none"
              }}
            />
          </div>
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
            <div style={{ 
              display: "flex", 
              flexDirection: "row", 
              gap: "12px", 
              overflowX: "auto",
              paddingBottom: "8px"
            }}>
              {filteredConcerts.map((concert) => (
                <div
                  key={concert.id}
                  style={{
                    opacity: selectedConcert === concert.id ? 1 : 0.7,
                    transform: selectedConcert === concert.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <ConcertSquare
                    concertNumber={concert.id}
                    title={concert.name}
                    date="TBD"
                    venue="TBD Venue"
                    price="25"
                    concertData={{
                      artist: concert.name,
                      title: concert.name,
                      date: "TBD",
                      time: "8:00 PM",
                      venue: "TBD Venue",
                      address: "123 Music Street, City, State 12345",
                      price: "25",
                      description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
                    }}
                  />
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
              {/* Search bar below heading in sidebar */}
              <div
                style={{
                  margin: "16px 0 20px 0",
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "180px",
                  maxWidth: "100%"
                }}
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search concerts..."
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "16px",
                    outline: "none"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {filteredConcerts.map((concert) => (
                  <div
                    key={concert.id}
                    style={{
                      opacity: selectedConcert === concert.id ? 1 : 0.7,
                      transform: selectedConcert === concert.id ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ConcertSquare
                      concertNumber={concert.id}
                      title={concert.name}
                      date="TBD"
                      venue="TBD Venue"
                      price="25"
                      concertData={{
                        artist: concert.name,
                        title: concert.name,
                        date: "TBD",
                        time: "8:00 PM",
                        venue: "TBD Venue",
                        address: "123 Music Street, City, State 12345",
                        price: "25",
                        description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
                      }}
                    />
                  </div>
                ))}
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
              position: "relative"
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

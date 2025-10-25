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
// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Global flag to track if Google Maps script is being loaded
// let isGoogleMapsLoading = false;
// let googleMapsLoadPromise = null;

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
  // useEffect(() => {
  //   if (!map || filteredConcerts.length === 0 || !window.google) return;
  //   if (filteredConcerts.length === 1) {
  //     // Center and zoom to single concert
  //     const c = filteredConcerts[0];
  //     map.setCenter({ lat: c.lat, lng: c.lng });
  //     map.setZoom(15);
  //   } else {
  //     // Fit bounds to all filtered concerts
  //     const bounds = new window.google.maps.LatLngBounds();
  //     filteredConcerts.forEach(c => {
  //       bounds.extend(new window.google.maps.LatLng(c.lat, c.lng));
  //     });
  //     map.fitBounds(bounds);
  //   }
  // }, [searchTerm, map]);

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

  // Load Google Maps API - COMMENTED OUT
  // useEffect(() => {
  //   if (!GOOGLE_MAPS_API_KEY) {
  //     console.warn("Google Maps API key is missing. Please add GOOGLE_MAPS_API_KEY to your environment variables.");
  //     return;
  //   }

  //   // Check if Google Maps is already loaded
  //   if (window.google && window.google.maps) {
  //     initializeMap();
  //     return;
  //   }

  //   // If script is already being loaded, wait for it
  //   if (isGoogleMapsLoading && googleMapsLoadPromise) {
  //     googleMapsLoadPromise.then(initializeMap);
  //     return;
  //   }

  //   // Start loading the script
  //   isGoogleMapsLoading = true;
  //   googleMapsLoadPromise = new Promise((resolve, reject) => {
  //     // Check if script already exists in DOM
  //     const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  //     if (existingScript) {
  //       // Script already exists, just wait for it to load
  //       if (window.google && window.google.maps) {
  //         resolve();
  //       } else {
  //         existingScript.addEventListener('load', resolve);
  //         existingScript.addEventListener('error', reject);
  //       }
  //       return;
  //     }

  //     // Create and load new script
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = resolve;
  //     script.onerror = reject;
  //     document.head.appendChild(script);
  //   });

  //   googleMapsLoadPromise
  //     .then(() => {
  //       isGoogleMapsLoading = false;
  //       initializeMap();
  //     })
  //     .catch((error) => {
  //       isGoogleMapsLoading = false;
  //       console.error('Failed to load Google Maps API:', error);
  //     });

  //   // No cleanup needed as we want to keep the script loaded globally
  // }, []);

  // const initializeMap = () => {
  //   if (!mapRef.current || !window.google) return;

  //   const mapInstance = new window.google.maps.Map(mapRef.current, {
  //     center: MAP_CENTER,
  //     zoom: MAP_ZOOM,
  //     mapTypeId: 'roadmap',
  //     gestureHandling: 'greedy', // Enable mouse wheel zoom and drag
  //     zoomControl: true,
  //     mapTypeControl: true,
  //     scaleControl: true,
  //     streetViewControl: true,
  //     rotateControl: true,
  //     fullscreenControl: true,
  //   });

  //   setMap(mapInstance);

  //   // Create markers for concerts
  //   const concertMarkers = concerts.map((concert) => {
  //     const marker = new window.google.maps.Marker({
  //       position: { lat: concert.lat, lng: concert.lng },
  //       map: mapInstance,
  //       title: concert.name,
  //       label: concert.id.toString(),
  //       animation: window.google.maps.Animation.DROP,
  //     });

  //     // Add click listener to marker
  //     marker.addListener('click', () => {
  //       setSelectedConcert(concert.id);
  //       // Center map on selected concert
  //       mapInstance.setCenter({ lat: concert.lat, lng: concert.lng });
  //       mapInstance.setZoom(15);
  //     });

  //     return marker;
  //   });

  //   setMarkers(concertMarkers);
  // };


  // Handle concert selection from sidebar
  const handleConcertSelect = (concertId) => {
    setSelectedConcert(concertId);
    // const concert = concerts.find(c => c.id === concertId);
    // if (concert && map) {
    //   map.setCenter({ lat: concert.lat, lng: concert.lng });
    //   map.setZoom(15);
    // }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#f5f5f5",
          overflow: "auto",
          paddingTop: isMobile ? "60px" : "72px", // Account for fixed header
        }}
      >
      <DynamicHeader />
      {isMobile ? (
        // Mobile Layout - Single Column
        <main
          className="main-content-background"
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            position: "relative",
            gap: "20px"
          }}
        >
          {/* Search bar - properly positioned above content */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search concerts..."
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          {/* Concerts List Section */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ 
              margin: "0 0 20px 0", 
              color: "#1976d2", 
              fontSize: "22px",
              fontWeight: "bold"
            }}>
              Concerts Nearby
            </h2>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px"
            }}>
              {filteredConcerts.map((concert) => (
                <div
                  key={concert.id}
                  style={{
                    opacity: selectedConcert === concert.id ? 1 : 0.7,
                    transform: selectedConcert === concert.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    width: "100%"
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

          {/* Static Map Section */}
          <div 
            style={{
              position: "relative",
              width: "100%",
              height: "250px",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              overflow: "hidden"
            }}
          >
            {/* Static map background */}
            <img
              src="/MAP-SF.png"
              alt="San Francisco Map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback background if image fails to load */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1
              }}
            >
              San Francisco Area
            </div>
            
            {/* Concert markers */}
            {filteredConcerts.map((concert, index) => {
              // Convert lat/lng to approximate pixel positions on the map
              // Use larger scale factor for mobile to spread out pins more
              const scaleFactor = isMobile ? 2000 : 1000;
              const latOffset = (concert.lat - MAP_CENTER.lat) * scaleFactor;
              const lngOffset = (concert.lng - MAP_CENTER.lng) * scaleFactor;
              const markerX = 50 + lngOffset; // 50% is center
              const markerY = 50 - latOffset; // 50% is center
              
              return (
                <div
                  key={concert.id}
                  className="concert-marker"
                  onClick={() => {
                    setSelectedConcert(concert.id);
                    // Navigate to concert details
                    const concertData = {
                      artist: concert.name,
                      title: concert.name,
                      date: "TBD",
                      time: "8:00 PM",
                      venue: "TBD Venue",
                      address: "123 Music Street, City, State 12345",
                      price: "25",
                      description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
                    };
                    navigateToConcertDetails(router, concertData);
                  }}
                  style={{
                    position: "absolute",
                    left: `${Math.max(10, Math.min(90, markerX))}%`,
                    top: `${Math.max(10, Math.min(90, markerY))}%`,
                    width: "36px",
                    height: "48px",
                    cursor: "pointer",
                    transform: "translate(-50%, -100%)",
                    transition: "all 0.2s ease",
                    zIndex: 2,
                    touchAction: "manipulation"
                  }}
                  title={concert.name}
                >
                  {/* Google Maps style pin */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: selectedConcert === concert.id ? "#ff6b6b" : "#4ecdc4",
                      borderRadius: "50% 50% 50% 0",
                      transform: "rotate(-45deg)",
                      border: "4px solid white",
                      boxShadow: "0 3px 12px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative"
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transform: "rotate(45deg)",
                        lineHeight: 1
                      }}
                    >
                      {concert.id}
                    </span>
                  </div>
                  {/* Pin shadow/dot */}
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      transform: "translateX(-50%)"
                    }}
                  />
                  {/* Always visible label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0, 0, 0, 0.9)",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      marginBottom: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      fontWeight: "500"
                    }}
                  >
                    {concert.name}
                    {/* Arrow pointing down */}
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid rgba(0, 0, 0, 0.9)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
            {/* Static Map Section */}
            <div 
              style={{
                position: "relative",
                width: "100%",
                height: "500px",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                overflow: "hidden"
              }}
            >
              {/* Static map background */}
              <img
                src="/MAP-SF.png"
                alt="San Francisco Map"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback background if image fails to load */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1
                }}
              >
                San Francisco Area
              </div>
              
              {/* Concert markers */}
              {filteredConcerts.map((concert, index) => {
                // Convert lat/lng to approximate pixel positions on the map
                // Use larger scale factor for mobile to spread out pins more
                const scaleFactor = isMobile ? 2000 : 1000;
                const latOffset = (concert.lat - MAP_CENTER.lat) * scaleFactor;
                const lngOffset = (concert.lng - MAP_CENTER.lng) * scaleFactor;
                const markerX = 50 + lngOffset; // 50% is center
                const markerY = 50 - latOffset; // 50% is center
                
                return (
                  <div
                    key={concert.id}
                    className="concert-marker"
                    onClick={() => {
                      setSelectedConcert(concert.id);
                      // Navigate to concert details
                      const concertData = {
                        artist: concert.name,
                        title: concert.name,
                        date: "TBD",
                        time: "8:00 PM",
                        venue: "TBD Venue",
                        address: "123 Music Street, City, State 12345",
                        price: "25",
                        description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
                      };
                      navigateToConcertDetails(router, concertData);
                    }}
                    style={{
                      position: "absolute",
                      left: `${Math.max(10, Math.min(90, markerX))}%`,
                      top: `${Math.max(10, Math.min(90, markerY))}%`,
                      width: "32px",
                      height: "48px",
                      cursor: "pointer",
                      transform: "translate(-50%, -100%)",
                      transition: "all 0.2s ease",
                      zIndex: 2
                    }}
                    title={concert.name}
                  >
                    {/* Google Maps style pin */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        background: selectedConcert === concert.id ? "#ff6b6b" : "#4ecdc4",
                        borderRadius: "50% 50% 50% 0",
                        transform: "rotate(-45deg)",
                        border: "4px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          transform: "rotate(45deg)",
                          lineHeight: 1
                        }}
                      >
                        {concert.id}
                      </span>
                    </div>
                    {/* Pin shadow/dot */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        background: "rgba(0,0,0,0.2)",
                        borderRadius: "50%",
                        position: "absolute",
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)"
                      }}
                    />
                    {/* Always visible label */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(0, 0, 0, 0.9)",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        zIndex: 10,
                        marginBottom: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.2)"
                      }}
                    >
                      {concert.name}
                      {/* Arrow pointing down */}
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid rgba(0, 0, 0, 0.9)"
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      )}
      </div>
    </>
  );
}

"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import Footer from "./components/footer";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsers, getArtists } from "../../../util/users";
import { colors } from "../styles/colors";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const router = useRouter();

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
          <div style={{ marginTop: '-40px'}}>
            <div style={{ marginLeft: '-100px'}}>
              <MainContentHeader>Followed Artists</MainContentHeader>
            </div>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                color: colors.black,
                padding: '8px',
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                margin: '0 0 24px 0',
                fontSize: '14px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
              {loading ? (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  Loading artists...
                </div>
              ) : followedArtists.length > 0 ? (
                followedArtists.map((artist, index) => (
                  <div
                    key={artist.id || index}
                    onClick={() => {
                      console.log(`Clicked on ${artist.name}`);
                      if (artist.id) {
                        router.push(`/artistsprofiles?id=${artist.id}`);
                      }
                    }}
                    style={{
                      background: colors.lightGray,
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                      transition: 'background 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = colors.lightBlue;
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      setHoveredArtist(artist);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = colors.lightGray;
                      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
                      // Don't clear hoveredArtist here - only change when hovering over a new artist
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Image placeholder */}
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          background: colors.lightGray,
                          borderRadius: '8px',
                          border: `2px dashed ${colors.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.textLight,
                          fontSize: '10px',
                          flexShrink: 0,
                        }}
                      >
                        Image
                      </div>
                      
                      {/* Text content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: '0 0 4px 0', color: colors.primary, fontWeight: 'bold', fontSize: '14px', textAlign: 'left' }}>{artist.name}</h3>
                        <p style={{ margin: 0, color: colors.textPrimary, fontSize: '12px', textAlign: 'left', lineHeight: '1.3' }}>{artist.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
                  No artists found
                </div>
              )}
            </div>
          </div>
        </Sidebar>
        <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <MainContentHeader>Your Tickets</MainContentHeader>
          <div
            style={{
              background: colors.primary,
              color: colors.white,
              padding: '24px 32px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '34px',
              fontWeight: 'bold',
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              height: '72px',
            }}
          >
            Your Concert Tickets
          </div>

          <MainContentHeader>Concert Details</MainContentHeader>
          <div
            style={{
              background: colors.white,
              padding: '24px',
              borderRadius: '8px',
              marginBottom: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ color: colors.textPrimary, fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
              Welcome to your concert dashboard! Here you'll find all your upcoming events, ticket details, and concert information. Select a ticket from the sidebar to view specific details.
            </p>
          </div>

          <MainContentHeader>Artist Overview</MainContentHeader>
          <div
            style={{
              background: colors.white,
              padding: '24px 28px',
              borderRadius: '8px',
              marginBottom: '24px',
              boxShadow: hoveredArtist ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              minHeight: '140px',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                background: hoveredArtist ? colors.lightBlue : colors.lightGray,
                borderRadius: '8px',
                border: `2px dashed ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.textLight,
                fontSize: '12px',
                flexShrink: 0,
                transition: 'background 0.2s ease',
              }}
            >
              {hoveredArtist ? 'Artist' : 'Image'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 8px 0', color: colors.primary, fontWeight: 'bold', fontSize: '22px' }}>
                {hoveredArtist ? hoveredArtist.name : 'Select an Artist'}
              </h3>
              <p style={{ margin: 0, color: colors.textPrimary, fontSize: '16px', lineHeight: '1.5' }}>
                {hoveredArtist ? hoveredArtist.description : 'Choose an artist from the sidebar to view their description and details.'}
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
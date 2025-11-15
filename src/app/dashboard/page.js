"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DynamicHeader from "../components/DynamicHeader";
import { colors } from "../styles/colors";
import { getArtists } from "../../../util/users";

export default function Dashboard() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch artists
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const artistsData = await getArtists();
        setArtists(artistsData || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter artists by search
  const filteredArtists = artists.filter((artist) =>
    artist.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.backgroundSecondary,
        paddingTop: "64px",
      }}
    >
      <DynamicHeader />

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px" : "48px 24px",
        }}
      >
        {/* Hero Section */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              margin: "0 0 12px 0",
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: 700,
              color: colors.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Discover Live Music
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "16px" : "18px",
              color: colors.textSecondary,
              maxWidth: "600px",
            }}
          >
            Explore upcoming concerts and connect with your favorite artists
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              position: "relative",
              maxWidth: "600px",
            }}
          >
            <svg
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textTertiary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                fontSize: "16px",
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                backgroundColor: colors.white,
                color: colors.textPrimary,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Artists Grid */}
        <div>
          <h2
            style={{
              margin: "0 0 24px 0",
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            Featured Artists
          </h2>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "64px 0",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: `4px solid ${colors.primaryLight}`,
                  borderTop: `4px solid ${colors.primary}`,
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          ) : filteredArtists.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
                backgroundColor: colors.white,
                borderRadius: "16px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "18px",
                  color: colors.textSecondary,
                }}
              >
                No artists found{searchValue && ` for "${searchValue}"`}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => router.push(`/artistsprofiles?id=${artist.id}`)}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    border: `1px solid ${colors.border}`,
                    padding: "24px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  {/* Artist Image */}
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      position: "relative",
                      marginBottom: "16px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: colors.backgroundTertiary,
                    }}
                  >
                    {artist.profilePicture ? (
                      <img
                        src={artist.profilePicture}
                        alt={artist.name}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "48px",
                          fontWeight: 700,
                          color: colors.primary,
                          backgroundColor: colors.primaryLight,
                        }}
                      >
                        {artist.name?.charAt(0).toUpperCase() || "A"}
                      </div>
                    )}
                  </div>

                  {/* Artist Info */}
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: colors.textPrimary,
                    }}
                  >
                    {artist.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "14px",
                      color: colors.textSecondary,
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {artist.description || "No description available"}
                  </p>

                  {/* View Profile Button */}
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: colors.primaryLight,
                      color: colors.primary,
                      fontSize: "14px",
                      fontWeight: 600,
                      textAlign: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    View Profile
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Spinner Animation */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

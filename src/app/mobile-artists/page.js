"use client";
import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import ArtistSquare from "../components/ArtistSquare";
import { getArtists } from "../../../util/users";
import { colors } from "../styles/colors";

export default function MobileArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState(null);
  
  const itemsPerPage = 6;
  
  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (artist.description && artist.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtists = filteredArtists.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const fetchedArtists = await getArtists();
        setArtists(fetchedArtists || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtists();
  }, []);

  return (
    <div className="main" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      background: '#f5f5f5',
      overflow: 'hidden'
    }}>
      <DynamicHeader />
      
      <main className="main_content" style={{ 
        flex: 1, 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <MainContentHeader>Artists</MainContentHeader>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            color: colors.textSecondary, 
            padding: '40px 20px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Loading artists...
          </div>
        ) : (
          <>
            {/* Artists Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '16px',
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '20px'
            }}>
              {currentArtists.map((artist, index) => (
                <div
                  key={artist.id || index}
                  onClick={() => setSelectedArtist(artist)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedArtist?.id === artist.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Artist Avatar */}
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: '#f0f0f0', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#666',
                    margin: '0 auto 12px auto'
                  }}>
                    {artist.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  {/* Artist Info */}
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    color: '#1976d2', 
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {artist.name}
                  </h3>
                  <p style={{ 
                    margin: '0', 
                    color: '#666', 
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}>
                    {artist.description || 'Artist description'}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '12px', 
                marginTop: '20px',
                padding: '16px 0'
              }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    background: currentPage === 1 ? '#f5f5f5' : 'white',
                    color: currentPage === 1 ? '#999' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    minHeight: '40px'
                  }}
                >
                  Previous
                </button>
                
                <span style={{ 
                  padding: '8px 12px', 
                  fontSize: '14px',
                  color: '#666',
                  minWidth: '80px',
                  textAlign: 'center'
                }}>
                  {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    background: currentPage === totalPages ? '#f5f5f5' : 'white',
                    color: currentPage === totalPages ? '#999' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    minHeight: '40px'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

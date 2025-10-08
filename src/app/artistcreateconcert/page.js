"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { colors } from "../styles/colors";

export default function MusicianPage() {
  const [searchValue, setSearchValue] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    place: "",
    genre: "",
    time: "",
    admissionFee: ""
  });
  const [editingConcert, setEditingConcert] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Sample concerts data
  useEffect(() => {
    const sampleConcerts = [
      {
        id: 1,
        name: "Summer Vibes Concert",
        date: "2024-07-15",
        place: "Central Park Amphitheater",
        genre: "Pop",
        time: "19:00",
        admissionFee: "$25"
      },
      {
        id: 2,
        name: "Jazz Night",
        date: "2024-08-20",
        place: "Blue Note Club",
        genre: "Jazz",
        time: "20:30",
        admissionFee: "$35"
      }
    ];
    setConcerts(sampleConcerts);
  }, []);

  // Filter concerts based on search
  const filteredConcerts = concerts.filter(concert =>
    concert.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    concert.place.toLowerCase().includes(searchValue.toLowerCase()) ||
    concert.genre.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingConcert) {
      // Update existing concert
      setConcerts(concerts.map(concert => 
        concert.id === editingConcert.id 
          ? { ...formData, id: editingConcert.id }
          : concert
      ));
      setEditingConcert(null);
    } else {
      // Add new concert
      const newConcert = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      setConcerts([...concerts, newConcert]);
    }
    
    // Reset form
    setFormData({
      name: "",
      date: "",
      place: "",
      genre: "",
      time: "",
      admissionFee: ""
    });
    setShowForm(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Edit concert
  const handleEdit = (concert) => {
    setFormData(concert);
    setEditingConcert(concert);
    setShowForm(true);
  };

  // Delete concert
  const handleDelete = (concertId) => {
    setConcerts(concerts.filter(concert => concert.id !== concertId));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Concerts List Component
  const ConcertsListSection = ({ isMobileLayout = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: isMobileLayout ? '0' : '24px' }}>
      {filteredConcerts.length > 0 ? (
        filteredConcerts.map((concert) => (
          <div
            key={concert.id}
            onClick={() => handleEdit(concert)}
            style={{
              background: isMobileLayout ? colors.white : colors.lightGray,
              borderRadius: isMobileLayout ? '12px' : '8px',
              padding: isMobileLayout ? '16px' : '12px',
              boxShadow: isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: isMobileLayout ? '1px solid #e0e0e0' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.lightBlue;
              e.currentTarget.style.boxShadow = isMobileLayout ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)';
              if (isMobileLayout) {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isMobileLayout ? colors.white : colors.lightGray;
              e.currentTarget.style.boxShadow = isMobileLayout ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)';
              if (isMobileLayout) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h4 style={{ 
                margin: '0 0 4px 0', 
                color: colors.primary, 
                fontWeight: 'bold', 
                fontSize: isMobileLayout ? '16px' : '14px',
                textAlign: 'left' 
              }}>
                {concert.name}
              </h4>
              <p style={{ 
                margin: '0 0 2px 0', 
                color: colors.textPrimary, 
                fontSize: isMobileLayout ? '14px' : '12px', 
                textAlign: 'left' 
              }}>
                {formatDate(concert.date)} at {concert.time}
              </p>
              <p style={{ 
                margin: '0 0 2px 0', 
                color: colors.textSecondary, 
                fontSize: isMobileLayout ? '12px' : '11px', 
                textAlign: 'left' 
              }}>
                {concert.place} • {concert.genre}
              </p>
              <p style={{ 
                margin: '0', 
                color: colors.textSecondary, 
                fontSize: isMobileLayout ? '12px' : '11px', 
                textAlign: 'left',
                fontWeight: '500'
              }}>
                {concert.admissionFee}
              </p>
            </div>
            
            {/* Action buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(concert.id);
                }}
                style={{
                  padding: isMobileLayout ? '6px 12px' : '4px 8px',
                  backgroundColor: '#ffebee',
                  color: '#d32f2f',
                  border: '2px solid #d32f2f',
                  borderRadius: isMobileLayout ? '6px' : '4px',
                  fontSize: isMobileLayout ? '12px' : '10px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#efaeaeff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffebee';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", color: colors.textSecondary, padding: "20px" }}>
          {searchValue ? 'No concerts found' : 'No concerts yet'}
        </div>
      )}
    </div>
  );

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
        <main className="main-content-background" style={{ 
          flex: 1, 
          padding: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'auto',
          maxWidth: '100%'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Search concerts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                color: '#1a1a1a',
                padding: '12px 16px',
                border: '1px solid #666666',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
                background: colors.white,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* New Concert Button */}
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingConcert(null);
                setFormData({
                  name: "",
                  date: "",
                  place: "",
                  genre: "",
                  time: "",
                  admissionFee: ""
                });
              }}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                border: '2px solid #64b5f6',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#bbdefb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e3f2fd';
              }}
            >
              + New Concert
            </button>
          </div>

          {/* Concert Management Form */}
          {showForm ? (
            <div style={{
              background: colors.lightBlue,
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                margin: '0 0 24px 0', 
                color: colors.primary, 
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {editingConcert ? `Edit Concert: ${editingConcert.name}` : 'Create New Concert'}
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Concert Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Venue/Place *
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Genre *
                    </label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="">Select Genre</option>
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Classical">Classical</option>
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Country">Country</option>
                      <option value="R&B">R&B</option>
                      <option value="Blues">Blues</option>
                      <option value="Folk">Folk</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Admission Fee *
                    </label>
                    <input
                      type="text"
                      name="admissionFee"
                      value={formData.admissionFee}
                      onChange={handleInputChange}
                      placeholder="e.g., $25, Free, $15-30"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingConcert(null);
                      setFormData({
                        name: "",
                        date: "",
                        place: "",
                        genre: "",
                        time: "",
                        admissionFee: ""
                      });
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#f5f5f5',
                      color: colors.textPrimary,
                      border: '2px solid #bdbdbd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#e3f2fd',
                      color: colors.primary,
                      border: '2px solid #64b5f6',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    {editingConcert ? 'Update Concert' : 'Create Concert'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{
              background: colors.lightBlue,
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                color: colors.textPrimary, 
                fontSize: '18px'
              }}>
                Welcome to Concert Management
              </h3>
              <p style={{ 
                margin: '0 0 24px 0', 
                color: colors.textSecondary, 
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                Use the search bar to find your concerts or click "+ New Concert" to create your first event.
              </p>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'center'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    padding: '16px',
                    background: colors.lightGray,
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minWidth: '120px'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎵</div>
                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Concerts</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>{concerts.length}</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: colors.lightGray,
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minWidth: '120px'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>This Month</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>
                      {concerts.filter(concert => {
                        const concertDate = new Date(concert.date);
                        const now = new Date();
                        return concertDate.getMonth() === now.getMonth() && 
                               concertDate.getFullYear() === now.getFullYear();
                      }).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Owned Concerts Section */}
          <div style={{ marginBottom: '32px', marginTop: '20px' }}>
            <MainContentHeader>Owned Concerts</MainContentHeader>
            <div style={{ marginTop: '16px' }}>
              <ConcertsListSection isMobileLayout={true} />
            </div>
          </div>
        </main>
      ) : (
        // Desktop Layout - With Sidebar
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <Sidebar>
            <div style={{ marginTop: '-40px'}}>
              <div style={{ marginLeft: '-100px'}}>
                <MainContentHeader>Owned Concerts</MainContentHeader>
              </div>
              
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search concerts..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  color: '#1a1a1a',
                  padding: '8px',
                  border: '1px solid #666666',
                  borderRadius: '6px',
                  margin: '0 0 24px 0',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />

              {/* New Concert Button */}
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingConcert(null);
                  setFormData({
                    name: "",
                    date: "",
                    place: "",
                    genre: "",
                    time: "",
                    admissionFee: ""
                  });
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  border: '2px solid #64b5f6',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#bbdefb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#e3f2fd';
                }}
              >
                + New Concert
              </button>

              <ConcertsListSection isMobileLayout={false} />
            </div>
          </Sidebar>

          <main className="main-content-background" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: colors.primary,
              margin: '0 0 24px 0',
              textAlign: 'left'
            }}>
              Concert Management
            </h1>
          
            {showForm ? (
              <div style={{
                background: colors.lightBlue,
                padding: '32px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '24px'
              }}>
                <h2 style={{ 
                  margin: '0 0 24px 0', 
                  color: colors.primary, 
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {editingConcert ? `Edit Concert: ${editingConcert.name}` : 'Create New Concert'}
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Concert Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Venue/Place *
                      </label>
                      <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Genre *
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Select Genre</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Classical">Classical</option>
                        <option value="Hip-Hop">Hip-Hop</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Country">Country</option>
                        <option value="R&B">R&B</option>
                        <option value="Blues">Blues</option>
                        <option value="Folk">Folk</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Time *
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: colors.textPrimary,
                        fontWeight: '500'
                      }}>
                        Admission Fee *
                      </label>
                      <input
                        type="text"
                        name="admissionFee"
                        value={formData.admissionFee}
                        onChange={handleInputChange}
                        placeholder="e.g., $25, Free, $15-30"
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingConcert(null);
                        setFormData({
                          name: "",
                          date: "",
                          place: "",
                          genre: "",
                          time: "",
                          admissionFee: ""
                        });
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#f5f5f5',
                        color: colors.textPrimary,
                        border: '2px solid #bdbdbd',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#e3f2fd',
                        color: colors.primary,
                        border: '2px solid #64b5f6',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {editingConcert ? 'Update Concert' : 'Create Concert'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{
                background: colors.lightBlue,
                padding: '32px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: colors.textPrimary, 
                  fontSize: '18px'
                }}>
                  Welcome to Concert Management
                </h3>
                <p style={{ 
                  margin: '0 0 24px 0', 
                  color: colors.textSecondary, 
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  Use the sidebar to search through your concerts or click "+ New Concert" to create your first event.
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      padding: '16px',
                      background: colors.lightGray,
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minWidth: '120px'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎵</div>
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Concerts</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>{concerts.length}</div>
                    </div>
                    <div style={{
                      padding: '16px',
                      background: colors.lightGray,
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minWidth: '120px'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>This Month</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.primary }}>
                        {concerts.filter(concert => {
                          const concertDate = new Date(concert.date);
                          const now = new Date();
                          return concertDate.getMonth() === now.getMonth() && 
                                 concertDate.getFullYear() === now.getFullYear();
                        }).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
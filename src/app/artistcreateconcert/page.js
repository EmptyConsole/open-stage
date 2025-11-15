"use client";
import styles from "../page.module.css";
import "../globals.css";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import React, { useState, useEffect } from "react";
import { colors } from "../styles/colors";
import { useRouter } from "next/navigation";
import { navigateToConcertDetails } from "../utils/concertNavigation";

export default function MusicianPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    place: "",
    genre: "",
    time: "",
    admissionFee: "",
    image: null
  });
  const [editingConcert, setEditingConcert] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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
        admissionFee: "$6",
        imageUrl: "/Landscapes/00000000.jpg"
      },
      {
        id: 2,
        name: "Jazz Night",
        date: "2024-08-20",
        place: "Blue Note Club",
        genre: "Jazz",
        time: "20:30",
        admissionFee: "$7",
        imageUrl: "/Landscapes/00000005.jpg"
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
    
    // Create concert data with image URL
    const concertData = {
      ...formData,
      imageUrl: imagePreview || null
    };
    
    if (editingConcert) {
      // Update existing concert
      setConcerts(concerts.map(concert => 
        concert.id === editingConcert.id 
          ? { ...concertData, id: editingConcert.id }
          : concert
      ));
      setEditingConcert(null);
    } else {
      // Add new concert
      const newConcert = {
        ...concertData,
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
      admissionFee: "",
      image: null
    });
    setImagePreview(null);
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

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Store the file
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  // Edit concert
  const handleEdit = (concert) => {
    setFormData(concert);
    setEditingConcert(concert);
    setImagePreview(concert.imageUrl || null);
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
            onClick={() => {
              // Navigate to concert details page
              const concertData = {
                artist: concert.name,
                title: concert.name,
                date: concert.date,
                time: concert.time,
                venue: concert.place,
                address: "123 Music Street, City, State 12345",
                price: concert.admissionFee,
                description: `Join us for an unforgettable evening of live music featuring ${concert.name}. This ${concert.genre} concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere.`
              };
              navigateToConcertDetails(router, concertData);
            }}
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {concert.imageUrl && (
                <img
                  src={concert.imageUrl}
                  alt={concert.name}
                  style={{
                    width: isMobileLayout ? '60px' : '50px',
                    height: isMobileLayout ? '60px' : '50px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
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
        minHeight: "100vh",
        backgroundColor: colors.backgroundSecondary,
        paddingTop: "64px",
      }}
    >
      <DynamicHeader />
      {isMobile ? (
        // Mobile Layout - Single Column
        <main
          style={{
            padding: "24px 16px",
            maxWidth: "100%",
          }}
        >
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

          {/* Action Buttons */}
          <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  admissionFee: "",
                  image: null
                });
                setImagePreview(null);
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
            <button
              onClick={() => window.location.href = '/concertstats'}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#f3e5f5',
                color: '#7b1fa2',
                border: '2px solid #ba68c8',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e1bee7';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3e5f5';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zM2 1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm1 3h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
              </svg>
              View Concert Statistics
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

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Concert Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
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
                    {imagePreview && (
                      <div style={{ marginTop: '12px', position: 'relative' }}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: '100%',
                            maxWidth: '200px',
                            height: 'auto',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(255, 0, 0, 0.8)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
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
                        admissionFee: "",
                        image: null
                      });
                      setImagePreview(null);
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
            <div>
              <MainContentHeader>Owned Concerts</MainContentHeader>

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

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
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
                      admissionFee: "",
                      image: null
                    });
                    setImagePreview(null);
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
                <button
                  onClick={() => window.location.href = '/concertstats'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f3e5f5',
                    color: '#7b1fa2',
                    border: '2px solid #ba68c8',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e1bee7';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3e5f5';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zM2 1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm1 3h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
                  </svg>
                  View Stats
                </button>
              </div>

              <ConcertsListSection isMobileLayout={false} />
            </div>
          </Sidebar>

          <main
            style={{
              flex: 1,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
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

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: colors.textPrimary,
                      fontWeight: '500'
                    }}>
                      Concert Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
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
                    {imagePreview && (
                      <div style={{ marginTop: '12px', position: 'relative', display: 'inline-block' }}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: '300px',
                            height: 'auto',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(255, 0, 0, 0.8)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
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
                          admissionFee: "",
                          image: null
                        });
                        setImagePreview(null);
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
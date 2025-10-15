'use client';

import { useState } from 'react';
import { getArtistProfilePhotoWithFallback } from '../utils/artistProfileUtils';

/**
 * Reusable component for displaying artist profile images
 * Uses the dataset to provide consistent profile photos for each artist
 */
export default function ArtistProfileImage({ 
  artistId, 
  artistName, 
  category = null, 
  size = 80, 
  style = {},
  className = "",
  showInitials = true,
  ...props 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const photoData = getArtistProfilePhotoWithFallback(artistId, artistName, category, size);
  
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: size <= 60 ? '12px' : '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    ...style
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {!imageError && (
        <img
          src={photoData.primary}
          alt={`${artistName} profile picture`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: size <= 60 ? '12px' : '8px',
            display: imageLoaded ? 'block' : 'none'
          }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {/* Fallback display with initials */}
      {imageError && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            color: '#666',
            fontSize: size <= 60 ? '12px' : '10px',
            fontWeight: 'bold',
            border: size > 60 ? '2px dashed #ccc' : 'none'
          }}
        >
          {showInitials ? photoData.initials : 'IMG'}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { getConcertImageWithFallback } from '../utils/concertImageUtils';

/**
 * Reusable component for displaying concert images
 * Uses the landscape pictures dataset to provide consistent images for each concert
 */
export default function ConcertImage({ 
  concertId, 
  concertName, 
  venue = null,
  width = 300, 
  height = 200,
  style = {},
  className = "",
  showInitials = true,
  ...props 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageData = getConcertImageWithFallback(concertId, concertName, venue, width, height);
  
  const containerStyle = {
    width: style.width || `${width}px`,
    height: style.height || `${height}px`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
    position: 'relative',
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
          src={imageData.primary}
          alt={`${concertName} concert image`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '8px',
            display: imageLoaded ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            left: 0
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
            fontSize: width <= 200 ? '14px' : '18px',
            fontWeight: 'bold',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {showInitials ? imageData.initials : 'CONCERT'}
        </div>
      )}
    </div>
  );
}

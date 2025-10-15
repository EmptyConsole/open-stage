'use client';

import { useState } from 'react';
import { getArtistProfilePhoto } from '../utils/artistProfileUtils';
import { getConcertImage } from '../utils/concertImageUtils';

export default function ImageTestPage() {
  const [artistImage, setArtistImage] = useState('');
  const [concertImage, setConcertImage] = useState('');

  const testArtistImage = () => {
    const path = getArtistProfilePhoto('Test Artist');
    setArtistImage(path);
    console.log('Artist image path:', path);
  };

  const testConcertImage = () => {
    const path = getConcertImage('Test Concert');
    setConcertImage(path);
    console.log('Concert image path:', path);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Image Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Artist Profile Image Test</h2>
        <button onClick={testArtistImage} style={{ marginBottom: '10px', padding: '10px' }}>
          Generate Artist Image Path
        </button>
        {artistImage && (
          <div>
            <p>Path: {artistImage}</p>
            <img 
              src={artistImage} 
              alt="Artist test" 
              style={{ width: '200px', height: '200px', objectFit: 'cover', border: '1px solid #ccc' }}
              onLoad={() => console.log('Artist image loaded successfully')}
              onError={(e) => console.error('Artist image failed to load:', e)}
            />
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Concert Image Test</h2>
        <button onClick={testConcertImage} style={{ marginBottom: '10px', padding: '10px' }}>
          Generate Concert Image Path
        </button>
        {concertImage && (
          <div>
            <p>Path: {concertImage}</p>
            <img 
              src={concertImage} 
              alt="Concert test" 
              style={{ width: '300px', height: '200px', objectFit: 'cover', border: '1px solid #ccc' }}
              onLoad={() => console.log('Concert image loaded successfully')}
              onError={(e) => console.error('Concert image failed to load:', e)}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h3>Direct Image Tests</h3>
        <p>Testing direct access to image files:</p>
        
        <div style={{ marginBottom: '10px' }}>
          <p>Profile Image: /Profiles/img-95.jpg</p>
          <img 
            src="/Profiles/img-95.jpg" 
            alt="Direct profile test" 
            style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ccc' }}
            onLoad={() => console.log('Direct profile image loaded')}
            onError={(e) => console.error('Direct profile image failed:', e)}
          />
        </div>

        <div>
          <p>Landscape Image: /Landscapes/00000434.jpg</p>
          <img 
            src="/Landscapes/00000434.jpg" 
            alt="Direct landscape test" 
            style={{ width: '150px', height: '100px', objectFit: 'cover', border: '1px solid #ccc' }}
            onLoad={() => console.log('Direct landscape image loaded')}
            onError={(e) => console.error('Direct landscape image failed:', e)}
          />
        </div>
      </div>
    </div>
  );
}

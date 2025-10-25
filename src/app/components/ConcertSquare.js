import { useRouter } from 'next/navigation';
import { navigateToConcertDetails } from '../utils/concertNavigation';
import ConcertImage from './ConcertImage';

export default function ConcertSquare({ 
  concertNumber, 
  title, 
  date, 
  venue, 
  onClick, 
  concertData,
  price = "7",
  concertId = null
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: navigate to concert details page
      const defaultConcertData = {
        artist: title || `Artist ${concertNumber}`,
        title: title || `Concert ${concertNumber}`,
        date: date || "TBD",
        time: "8:00 PM",
        venue: venue || "TBD Venue",
        address: "123 Music Street, City, State 12345",
        price: price,
        description: "Join us for an unforgettable evening of live music featuring amazing performances and great vibes. This concert promises to deliver an incredible experience with top-notch sound quality and an intimate atmosphere."
      };
      
      navigateToConcertDetails(router, defaultConcertData);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '120px',
        background: '#ededed',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dce6f1';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ededed';
      }}
    >
      {/* Concert Image - left side */}
      <div style={{ 
        width: '120px',
        height: '100%',
        flexShrink: 0,
        zIndex: 1
      }}>
        <ConcertImage
          concertId={concertId || title || `concert_${concertNumber}`}
          concertName={title || `Concert ${concertNumber}`}
          venue={venue}
          width={120}
          height={120}
          style={{
            border: 'none',
            borderRadius: '6px',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Concert Info - right side */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px',
        color: '#333',
        fontSize: '14px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
          {title || `Concert ${concertNumber}`}
        </div>
        {date && (
          <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
            📅 {date}
          </div>
        )}
        {venue && (
          <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
            📍 {venue}
          </div>
        )}
        {price && (
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1976d2' }}>
            {price}
          </div>
        )}
      </div>
    </div>
  );
}

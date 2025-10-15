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
        minWidth: '200px',
        height: '200px',
        background: '#ededed',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: '8px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dce6f1';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ededed';
      }}
    >
      {/* Concert Image */}
      <div style={{ marginBottom: '8px', flex: '1' }}>
        <ConcertImage
          concertId={concertId || title || `concert_${concertNumber}`}
          concertName={title || `Concert ${concertNumber}`}
          venue={venue}
          width={184}
          height={120}
          style={{
            border: 'none',
            borderRadius: '4px'
          }}
        />
      </div>
      
      {/* Concert Info */}
      <div style={{ 
        color: '#999', 
        fontSize: '12px',
        textAlign: 'center',
        padding: '0 4px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>
          {title || `Concert ${concertNumber}`}
        </div>
        {date && (
          <div style={{ marginBottom: '2px' }}>
            {date}
          </div>
        )}
        {venue && (
          <div style={{ fontSize: '11px' }}>
            {venue}
          </div>
        )}
      </div>
    </div>
  );
}

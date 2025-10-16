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
      {/* Concert Image - fills entire square */}
      <div style={{ flex: '1', position: 'relative' }}>
        <ConcertImage
          concertId={concertId || title || `concert_${concertNumber}`}
          concertName={title || `Concert ${concertNumber}`}
          venue={venue}
          width={200}
          height={200}
          style={{
            border: 'none',
            borderRadius: '6px'
          }}
        />
      </div>
      
      {/* Concert Info - overlaid on bottom of image */}
      <div style={{ 
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        color: 'white', 
        fontSize: '12px',
        textAlign: 'center',
        padding: '8px 4px 4px 4px',
        borderRadius: '0 0 6px 6px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '2px', fontSize: '14px' }}>
          {title || `Concert ${concertNumber}`}
        </div>
        {date && (
          <div style={{ marginBottom: '1px', fontSize: '11px' }}>
            {date}
          </div>
        )}
        {venue && (
          <div style={{ fontSize: '10px', opacity: '0.9' }}>
            {venue}
          </div>
        )}
      </div>
    </div>
  );
}

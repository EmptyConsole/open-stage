import { useRouter } from 'next/navigation';
import { navigateToConcertDetails } from '../utils/concertNavigation';

export default function ConcertSquare({ 
  concertNumber, 
  title, 
  date, 
  venue, 
  onClick, 
  concertData,
  price = "7" 
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
        height: '150px',
        background: '#ededed',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '14px',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: '16px',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dce6f1';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ededed';
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {title || `Concert ${concertNumber}`}
      </div>
      {date && (
        <div style={{ fontSize: '12px', marginBottom: '4px' }}>
          {date}
        </div>
      )}
      {venue && (
        <div style={{ fontSize: '12px', textAlign: 'center' }}>
          {venue}
        </div>
      )}
    </div>
  );
}

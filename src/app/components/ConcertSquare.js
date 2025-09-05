export default function ConcertSquare({ concertNumber, title, date, venue, onClick }) {
  return (
    <div
      onClick={onClick}
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

export default function ArtistSquare({ artistNumber, title, genre, onClick }) {
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
        {title || `Artist ${artistNumber}`}
      </div>
      {genre && (
        <div style={{ fontSize: '12px', textAlign: 'center' }}>
          {genre}
        </div>
      )}
    </div>
  );
}

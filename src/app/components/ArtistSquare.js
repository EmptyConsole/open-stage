import ArtistProfileImage from './ArtistProfileImage';

export default function ArtistSquare({ artistNumber, title, genre, onClick, artistId }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '120px',
        background: '#ededed',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#333',
        fontSize: '14px',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: '0',
        boxSizing: 'border-box',
        gap: '20px',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dce6f1';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ededed';
      }}
    >
      {/* Artist Profile Image */}
      <div style={{ 
        width: '120px',
        height: '100%',
        flexShrink: 0,
        zIndex: 1
      }}>
        <ArtistProfileImage
          artistId={artistId || title || `artist_${artistNumber}`}
          artistName={title || `Artist ${artistNumber}`}
          size={120}
          style={{
            border: 'none',
            borderRadius: '6px',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      {/* Artist Info */}
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
          {title || `Artist ${artistNumber}`}
        </div>
        {genre && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            {genre}
          </div>
        )}
      </div>
    </div>
  );
}

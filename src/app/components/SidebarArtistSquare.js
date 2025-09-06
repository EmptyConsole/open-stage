export default function SidebarArtistSquare({ artistName, description, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dce6f1';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      {/* Image placeholder square */}
      <div
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: '#f0f0f0',
          border: '2px dashed #ccc',
          borderRadius: '4px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
        }}
      >
        IMG
      </div>
      
      {/* Artist info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {artistName}
        </div>
        {description && (
          <div
            style={{
              fontWeight: 'normal',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

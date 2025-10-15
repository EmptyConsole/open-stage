"use client";
import { useRouter } from 'next/navigation';
import { colors } from '../styles/colors';
import ArtistProfileImage from './ArtistProfileImage';

export default function SidebarArtistSquare({ artistName, description, artistId, onClick }) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to artist profile page with artist ID
    if (artistId) {
      router.push(`/artistsprofiles?id=${artistId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
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
        e.target.style.backgroundColor = colors.lightBlue;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      {/* Artist Profile Image */}
      <ArtistProfileImage
        artistId={artistId || artistName}
        artistName={artistName}
        size={150}
        style={{
          border: `2px dashed ${colors.border}`,
          borderRadius: '4px',
        }}
        showInitials={false}
      />
      
      {/* Artist info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: colors.textPrimary,
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
              color: colors.textSecondary,
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
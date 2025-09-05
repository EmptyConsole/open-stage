export default function FollowButton({ isFollowing, toggleFollow }) {
    return (
        <button 
        onClick={toggleFollow}
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: isFollowing ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    );
  }
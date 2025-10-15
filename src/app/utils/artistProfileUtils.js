/**
 * Utility functions for generating consistent artist profile photos
 * Uses the human profile photos dataset to provide distinct, consistent images for each artist
 */

/**
 * Generate a consistent profile photo path for an artist based on their ID or name
 * @param {string|number} artistId - Artist ID or name
 * @param {string} category - Optional category (male/female)
 * @returns {string} Path to the profile photo
 */
export function getArtistProfilePhoto(artistId, category = null) {
  // Convert artistId to string and create a hash-like number for consistency
  const idString = String(artistId);
  let hash = 0;
  
  // Simple hash function to convert string to number
  for (let i = 0; i < idString.length; i++) {
    const char = idString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Make hash positive
  hash = Math.abs(hash);
  
  // If category is specified, use it; otherwise determine based on hash
  const photoCategory = category || (hash % 2 === 0 ? 'male' : 'female');
  
  // Generate a consistent photo index based on the hash
  // This ensures the same artist always gets the same photo
  const photoIndex = (hash % 100) + 1; // Use modulo to keep index reasonable
  
  return `/dataset/${photoCategory}/profile_${photoIndex}.jpg`;
}

/**
 * Get a fallback profile photo when the dataset is not available
 * @param {string} artistName - Artist name for initials
 * @param {number} size - Size of the placeholder (default: 80)
 * @returns {string} Placeholder image URL
 */
export function getFallbackProfilePhoto(artistName, size = 80) {
  const initials = artistName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  return `https://via.placeholder.com/${size}x${size}/1976d2/ffffff?text=${initials}`;
}

/**
 * Get artist profile photo with fallback
 * @param {string|number} artistId - Artist ID or name
 * @param {string} artistName - Artist name for fallback
 * @param {string} category - Optional category (male/female)
 * @param {number} size - Size for fallback placeholder
 * @returns {object} Object with photo path and fallback info
 */
export function getArtistProfilePhotoWithFallback(artistId, artistName, category = null, size = 80) {
  const profilePhoto = getArtistProfilePhoto(artistId, category);
  const fallbackPhoto = getFallbackProfilePhoto(artistName, size);
  
  return {
    primary: profilePhoto,
    fallback: fallbackPhoto,
    initials: artistName.split(' ').map(n => n[0]).join('').toUpperCase()
  };
}

/**
 * Generate multiple consistent profile photos for a list of artists
 * @param {Array} artists - Array of artist objects with id and name
 * @param {string} category - Optional category filter
 * @returns {Array} Array of artist objects with profile photos
 */
export function generateArtistProfilePhotos(artists, category = null) {
  return artists.map(artist => ({
    ...artist,
    profilePhoto: getArtistProfilePhoto(artist.id || artist.name, category),
    profilePhotoData: getArtistProfilePhotoWithFallback(
      artist.id || artist.name, 
      artist.name, 
      category
    )
  }));
}

/**
 * Check if the dataset is available
 * @returns {boolean} True if dataset is available
 */
export function isDatasetAvailable() {
  // This would check if the dataset directory exists and has photos
  // For now, we'll assume it's available if we can access the API
  return true; // In a real implementation, you'd check the file system
}

/**
 * Get artist profile photo component props
 * @param {string|number} artistId - Artist ID or name
 * @param {string} artistName - Artist name
 * @param {string} category - Optional category
 * @param {number} size - Size for styling
 * @returns {object} Props for image component
 */
export function getArtistImageProps(artistId, artistName, category = null, size = 80) {
  const photoData = getArtistProfilePhotoWithFallback(artistId, artistName, category, size);
  
  return {
    src: photoData.primary,
    alt: `${artistName} profile picture`,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    onError: (e) => {
      // Fallback to placeholder on error
      e.target.src = photoData.fallback;
    }
  };
}

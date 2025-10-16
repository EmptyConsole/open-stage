/**
 * Utility functions for generating consistent concert images
 * Uses the landscape pictures dataset to provide distinct, consistent images for each concert
 */

/**
 * Generate a consistent concert image path based on concert ID or name
 * @param {string|number} concertId - Concert ID or name
 * @param {string} venue - Optional venue name for additional variation
 * @returns {string} Path to the concert image
 */
export function getConcertImage(concertId, venue = null) {
  // Convert concertId to string and create a hash-like number for consistency
  const idString = String(concertId) + (venue ? String(venue) : '');
  let hash = 0;
  
  // Simple hash function to convert string to number
  for (let i = 0; i < idString.length; i++) {
    const char = idString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Make hash positive
  hash = Math.abs(hash);
  
  // Generate a consistent image index based on the hash
  // This ensures the same concert always gets the same image
  const imageIndex = (hash % 899) + 1; // Use modulo to keep index reasonable (899 landscapes available)
  
  // Convert to the landscape naming pattern (00000000.jpg format)
  const paddedIndex = String(imageIndex - 1).padStart(8, '0');
  return `/Landscapes/${paddedIndex}.jpg`;
}

/**
 * Get a fallback concert image when the dataset is not available
 * @param {string} concertName - Concert name for placeholder
 * @param {number} width - Width of the placeholder (default: 300)
 * @param {number} height - Height of the placeholder (default: 200)
 * @returns {string} Placeholder image URL
 */
export function getFallbackConcertImage(concertName, width = 300, height = 200) {
  const initials = concertName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 3); // Limit to 3 characters
  
  return `https://via.placeholder.com/${width}x${height}/1976d2/ffffff?text=${initials}`;
}

/**
 * Get concert image with fallback
 * @param {string|number} concertId - Concert ID or name
 * @param {string} concertName - Concert name for fallback
 * @param {string} venue - Optional venue name
 * @param {number} width - Width for fallback placeholder
 * @param {number} height - Height for fallback placeholder
 * @returns {object} Object with image path and fallback info
 */
export function getConcertImageWithFallback(concertId, concertName, venue = null, width = 300, height = 200) {
  const concertImage = getConcertImage(concertId, venue);
  const fallbackImage = getFallbackConcertImage(concertName, width, height);
  
  return {
    primary: concertImage,
    fallback: fallbackImage,
    initials: concertName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 3)
  };
}

/**
 * Generate multiple consistent concert images for a list of concerts
 * @param {Array} concerts - Array of concert objects with id and name
 * @param {string} venue - Optional venue filter
 * @returns {Array} Array of concert objects with images
 */
export function generateConcertImages(concerts, venue = null) {
  return concerts.map(concert => ({
    ...concert,
    concertImage: getConcertImage(concert.id || concert.name, venue),
    concertImageData: getConcertImageWithFallback(
      concert.id || concert.name, 
      concert.name, 
      venue
    )
  }));
}

/**
 * Get concert image component props
 * @param {string|number} concertId - Concert ID or name
 * @param {string} concertName - Concert name
 * @param {string} venue - Optional venue name
 * @param {number} width - Width for styling
 * @param {number} height - Height for styling
 * @returns {object} Props for image component
 */
export function getConcertImageProps(concertId, concertName, venue = null, width = 300, height = 200) {
  const imageData = getConcertImageWithFallback(concertId, concertName, venue, width, height);
  
  return {
    src: imageData.primary,
    alt: `${concertName} concert image`,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    onError: (e) => {
      // Fallback to placeholder on error
      e.target.src = imageData.fallback;
    }
  };
}

/**
 * Get concert image by genre/type for themed concerts
 * @param {string|number} concertId - Concert ID or name
 * @param {string} genre - Concert genre (rock, jazz, classical, etc.)
 * @param {string} venue - Optional venue name
 * @returns {string} Path to themed concert image
 */
export function getThemedConcertImage(concertId, genre, venue = null) {
  // Add genre to the hash for more variation
  const themedId = String(concertId) + String(genre) + (venue ? String(venue) : '');
  let hash = 0;
  
  for (let i = 0; i < themedId.length; i++) {
    const char = themedId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  hash = Math.abs(hash);
  const imageIndex = (hash % 899) + 1;
  
  // Convert to the landscape naming pattern (00000000.jpg format)
  const paddedIndex = String(imageIndex - 1).padStart(8, '0');
  return `/Landscapes/${paddedIndex}.jpg`;
}

/**
 * Get multiple random concert images for display
 * @param {number} count - Number of images to return
 * @returns {Array} Array of random landscape image paths
 */
export function getRandomConcertImages(count = 5) {
  const images = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * 899) + 1;
    const paddedIndex = String(randomIndex - 1).padStart(8, '0');
    images.push(`/Landscapes/${paddedIndex}.jpg`);
  }
  return images;
}

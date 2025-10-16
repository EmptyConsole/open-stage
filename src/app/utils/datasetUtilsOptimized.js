/**
 * Optimized utility functions for working with the human profile photos dataset
 * Uses pre-generated file list to avoid file system scanning at runtime
 */

import fileList from './fileList.json';

/**
 * Get a random profile photo from the dataset
 * @returns {string|null} Path to a random profile photo or null if none found
 */
export function getRandomProfilePhoto() {
  try {
    const photos = getAllProfilePhotos();
    if (photos.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  } catch (error) {
    console.error('Error getting random profile photo:', error);
    return null;
  }
}

/**
 * Get all profile photos from the dataset
 * @returns {string[]} Array of photo paths
 */
export function getAllProfilePhotos() {
  try {
    return fileList.profiles.all || [];
  } catch (error) {
    console.error('Error getting all profile photos:', error);
    return [];
  }
}

/**
 * Get profile photos by category
 * @param {string} category - Category name
 * @returns {string[]} Array of photo paths in the category
 */
export function getProfilePhotosByCategory(category) {
  try {
    return fileList.profiles.categories[category] || [];
  } catch (error) {
    console.error('Error getting photos by category:', error);
    return [];
  }
}

/**
 * Get dataset statistics
 * @returns {object} Dataset statistics
 */
export function getDatasetStats() {
  try {
    return {
      totalPhotos: fileList.profiles.total || 0,
      totalLandscapes: fileList.landscapes.total || 0,
      categories: Object.keys(fileList.profiles.categories || {}).reduce((acc, category) => {
        acc[category] = fileList.profiles.categories[category].length;
        return acc;
      }, {}),
      isAvailable: (fileList.profiles.total || 0) > 0,
      generatedAt: fileList.generatedAt
    };
  } catch (error) {
    console.error('Error getting dataset stats:', error);
    return {
      totalPhotos: 0,
      totalLandscapes: 0,
      categories: {},
      isAvailable: false,
      generatedAt: null
    };
  }
}

/**
 * Get a specific number of random profile photos
 * @param {number} count - Number of photos to return
 * @returns {string[]} Array of random photo paths
 */
export function getRandomProfilePhotos(count = 5) {
  try {
    const allPhotos = getAllProfilePhotos();
    if (allPhotos.length === 0) return [];
    
    const shuffled = [...allPhotos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, allPhotos.length));
  } catch (error) {
    console.error('Error getting random profile photos:', error);
    return [];
  }
}

/**
 * Search for profile photos by filename pattern
 * @param {string} pattern - Search pattern
 * @returns {string[]} Array of matching photo paths
 */
export function searchProfilePhotos(pattern) {
  try {
    const allPhotos = getAllProfilePhotos();
    const regex = new RegExp(pattern, 'i');
    
    return allPhotos.filter(photo => {
      const filename = photo.split('/').pop();
      return regex.test(filename);
    });
  } catch (error) {
    console.error('Error searching profile photos:', error);
    return [];
  }
}

/**
 * Get all landscape images from the dataset
 * @returns {string[]} Array of landscape image paths
 */
export function getAllLandscapeImages() {
  try {
    return fileList.landscapes.all || [];
  } catch (error) {
    console.error('Error getting all landscape images:', error);
    return [];
  }
}

/**
 * Get a random landscape image from the dataset
 * @returns {string|null} Path to a random landscape image or null if none found
 */
export function getRandomLandscapeImage() {
  try {
    const images = getAllLandscapeImages();
    if (images.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  } catch (error) {
    console.error('Error getting random landscape image:', error);
    return null;
  }
}

/**
 * Get multiple random landscape images
 * @param {number} count - Number of images to return
 * @returns {string[]} Array of random landscape image paths
 */
export function getRandomLandscapeImages(count = 5) {
  try {
    const allImages = getAllLandscapeImages();
    if (allImages.length === 0) return [];
    
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, allImages.length));
  } catch (error) {
    console.error('Error getting random landscape images:', error);
    return [];
  }
}

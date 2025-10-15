/**
 * Utility functions for working with the human profile photos dataset
 * Dataset: osmankagankurnaz/human-profile-photos-dataset
 */

import fs from 'fs';
import path from 'path';

const DATASET_PATH = path.join(process.cwd(), 'public', 'dataset');
const PROFILES_PATH = path.join(process.cwd(), 'Profiles');
const LANDSCAPES_PATH = path.join(process.cwd(), 'Landscapes');

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
    if (!fs.existsSync(PROFILES_PATH)) {
      console.warn('Profiles dataset directory not found:', PROFILES_PATH);
      return [];
    }

    const photos = [];
    
    function scanDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stat.isFile() && isImageFile(item)) {
          // Convert to web-accessible path
          const webPath = fullPath.replace(path.join(process.cwd(), 'public'), '');
          photos.push(webPath);
        }
      }
    }
    
    scanDirectory(PROFILES_PATH);
    return photos;
  } catch (error) {
    console.error('Error scanning profiles dataset:', error);
    return [];
  }
}

/**
 * Get profile photos by category (if the dataset has categories)
 * @param {string} category - Category name
 * @returns {string[]} Array of photo paths in the category
 */
export function getProfilePhotosByCategory(category) {
  try {
    const categoryPath = path.join(DATASET_PATH, category);
    
    if (!fs.existsSync(categoryPath)) {
      console.warn('Category directory not found:', categoryPath);
      return [];
    }

    const photos = [];
    const items = fs.readdirSync(categoryPath);
    
    for (const item of items) {
      const fullPath = path.join(categoryPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile() && isImageFile(item)) {
        const webPath = fullPath.replace(path.join(process.cwd(), 'public'), '');
        photos.push(webPath);
      }
    }
    
    return photos;
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
    const allPhotos = getAllProfilePhotos();
    
    // Group by directory (category)
    const categories = {};
    allPhotos.forEach(photo => {
      const category = path.dirname(photo).split('/').pop() || 'root';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    return {
      totalPhotos: allPhotos.length,
      categories: categories,
      datasetPath: DATASET_PATH,
      isAvailable: allPhotos.length > 0
    };
  } catch (error) {
    console.error('Error getting dataset stats:', error);
    return {
      totalPhotos: 0,
      categories: {},
      datasetPath: DATASET_PATH,
      isAvailable: false
    };
  }
}

/**
 * Check if a file is an image file
 * @param {string} filename - File name to check
 * @returns {boolean} True if the file is an image
 */
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
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
      const filename = path.basename(photo);
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
    if (!fs.existsSync(LANDSCAPES_PATH)) {
      console.warn('Landscapes dataset directory not found:', LANDSCAPES_PATH);
      return [];
    }

    const images = [];
    
    function scanDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stat.isFile() && isImageFile(item)) {
          // Convert to web-accessible path
          const webPath = fullPath.replace(path.join(process.cwd(), 'public'), '');
          images.push(webPath);
        }
      }
    }
    
    scanDirectory(LANDSCAPES_PATH);
    return images;
  } catch (error) {
    console.error('Error scanning landscapes dataset:', error);
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

#!/usr/bin/env node

/**
 * Script to generate a static list of all image files for the dataset API
 * This prevents Vercel from bundling all image files into the serverless function
 */

const fs = require('fs');
const path = require('path');

const PROFILES_PATH = path.join(process.cwd(), 'public', 'Profiles');
const LANDSCAPES_PATH = path.join(process.cwd(), 'public', 'Landscapes');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'app', 'utils', 'fileList.json');

/**
 * Check if a file is an image file
 */
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

/**
 * Scan directory recursively for image files
 */
function scanDirectory(dir, basePath = '') {
  const images = [];
  
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return images;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const subDir = path.join(basePath, item);
      images.push(...scanDirectory(fullPath, subDir));
    } else if (stat.isFile() && isImageFile(item)) {
      const webPath = path.join(basePath, item).replace(/\\/g, '/');
      images.push(webPath);
    }
  }
  
  return images;
}

/**
 * Generate file list
 */
function generateFileList() {
  console.log('Generating file list...');
  
  const profiles = scanDirectory(PROFILES_PATH, '/Profiles');
  const landscapes = scanDirectory(LANDSCAPES_PATH, '/Landscapes');
  
  // Group profiles by category (subdirectory)
  const profileCategories = {};
  profiles.forEach(photo => {
    const parts = photo.split('/');
    const category = parts.length > 2 ? parts[2] : 'root';
    if (!profileCategories[category]) {
      profileCategories[category] = [];
    }
    profileCategories[category].push(photo);
  });
  
  const fileList = {
    profiles: {
      all: profiles,
      categories: profileCategories,
      total: profiles.length
    },
    landscapes: {
      all: landscapes,
      total: landscapes.length
    },
    generatedAt: new Date().toISOString(),
    totalFiles: profiles.length + landscapes.length
  };
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fileList, null, 2));
  
  console.log(`✅ Generated file list with ${fileList.totalFiles} files:`);
  console.log(`   - Profiles: ${profiles.length} files`);
  console.log(`   - Landscapes: ${landscapes.length} files`);
  console.log(`   - Output: ${OUTPUT_FILE}`);
  
  return fileList;
}

// Run if called directly
if (require.main === module) {
  try {
    generateFileList();
  } catch (error) {
    console.error('Error generating file list:', error);
    process.exit(1);
  }
}

module.exports = { generateFileList };

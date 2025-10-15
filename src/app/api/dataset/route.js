import { NextResponse } from 'next/server';
import { 
  getAllProfilePhotos, 
  getRandomProfilePhotos, 
  getProfilePhotosByCategory,
  getDatasetStats,
  searchProfilePhotos,
  getRandomProfilePhoto,
  getAllLandscapeImages,
  getRandomLandscapeImage,
  getRandomLandscapeImages
} from '../../../utils/datasetUtils';

/**
 * API endpoint for accessing the human profile photos dataset
 * GET /api/dataset?action=stats&category=male&count=5&search=pattern
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stats';
    const category = searchParams.get('category');
    const count = parseInt(searchParams.get('count')) || 5;
    const search = searchParams.get('search');

    let result;

    switch (action) {
      case 'stats':
        result = getDatasetStats();
        break;
        
      case 'random':
        if (count === 1) {
          const photo = getRandomProfilePhoto();
          result = photo ? [photo] : [];
        } else {
          result = getRandomProfilePhotos(count);
        }
        break;
        
      case 'category':
        if (!category) {
          return NextResponse.json(
            { error: 'Category parameter is required' },
            { status: 400 }
          );
        }
        result = getProfilePhotosByCategory(category);
        break;
        
      case 'search':
        if (!search) {
          return NextResponse.json(
            { error: 'Search parameter is required' },
            { status: 400 }
          );
        }
        result = searchProfilePhotos(search);
        break;
        
      case 'all':
        result = getAllProfilePhotos();
        break;
        
      case 'landscapes':
        if (count === 1) {
          const image = getRandomLandscapeImage();
          result = image ? [image] : [];
        } else {
          result = getRandomLandscapeImages(count);
        }
        break;
        
      case 'all_landscapes':
        result = getAllLandscapeImages();
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: stats, random, category, search, all, landscapes, or all_landscapes' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      data: result,
      count: Array.isArray(result) ? result.length : 1,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dataset API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for dataset operations
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    let result;

    switch (action) {
      case 'batch_random':
        const { count = 10, categories = [] } = params;
        result = getRandomProfilePhotos(count);
        if (categories.length > 0) {
          // Filter by categories if specified
          result = result.filter(photo => {
            const photoCategory = photo.split('/')[2]; // Assuming structure: /dataset/category/filename
            return categories.includes(photoCategory);
          });
        }
        break;
        
      case 'stats_detailed':
        const stats = getDatasetStats();
        const allPhotos = getAllProfilePhotos();
        
        // Add more detailed statistics
        result = {
          ...stats,
          fileTypes: getFileTypeStats(allPhotos),
          averageFileSize: getAverageFileSize(allPhotos),
          lastUpdated: new Date().toISOString()
        };
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid POST action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dataset POST API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper functions for detailed statistics
function getFileTypeStats(photos) {
  const types = {};
  photos.forEach(photo => {
    const ext = photo.split('.').pop().toLowerCase();
    types[ext] = (types[ext] || 0) + 1;
  });
  return types;
}

function getAverageFileSize(photos) {
  // This would require file system access to get actual file sizes
  // For now, return a mock value
  return "~50KB per image";
}

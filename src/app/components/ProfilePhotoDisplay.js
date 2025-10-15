'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Component to display profile photos from the dataset
 */
export default function ProfilePhotoDisplay({ 
  count = 1, 
  category = null, 
  searchPattern = null,
  className = "",
  showStats = false 
}) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, [count, category, searchPattern]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      // In a real implementation, you would call your API endpoint
      // For now, we'll simulate the data structure
      const mockPhotos = generateMockPhotos(count);
      setPhotos(mockPhotos);

      if (showStats) {
        setStats({
          totalPhotos: 1000, // Mock data
          categories: { 'male': 500, 'female': 500 },
          isAvailable: true
        });
      }
    } catch (err) {
      setError('Failed to load profile photos');
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock function to generate sample photo paths
  const generateMockPhotos = (num) => {
    const mockPhotos = [];
    for (let i = 0; i < num; i++) {
      mockPhotos.push({
        id: i + 1,
        path: `/dataset/sample/profile_${i + 1}.jpg`,
        alt: `Profile photo ${i + 1}`,
        category: i % 2 === 0 ? 'male' : 'female'
      });
    }
    return mockPhotos;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading photos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-500 text-center ${className}`}>
        <p>{error}</p>
        <button 
          onClick={loadPhotos}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className={`text-gray-500 text-center ${className}`}>
        <p>No profile photos found</p>
        <p className="text-sm mt-1">
          Make sure the dataset is properly downloaded and organized
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Stats Display */}
      {showStats && stats && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Dataset Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Photos:</span> {stats.totalPhotos}
            </div>
            <div>
              <span className="font-medium">Available:</span> {stats.isAvailable ? 'Yes' : 'No'}
            </div>
            {stats.categories && (
              <div className="col-span-2">
                <span className="font-medium">Categories:</span>
                <ul className="mt-1">
                  {Object.entries(stats.categories).map(([category, count]) => (
                    <li key={category} className="ml-4">
                      {category}: {count} photos
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={photo.path}
                alt={photo.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={(e) => {
                  // Fallback for missing images
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-sm"
                style={{ display: 'none' }}
              >
                No Image
              </div>
            </div>
            
            {/* Photo Info */}
            <div className="mt-2 text-xs text-gray-600">
              <p className="truncate">{photo.alt}</p>
              {photo.category && (
                <p className="text-gray-400">Category: {photo.category}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="mt-4 text-center">
        <button
          onClick={loadPhotos}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Photos
        </button>
      </div>
    </div>
  );
}

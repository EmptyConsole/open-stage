'use client';

import { useState, useEffect } from 'react';
import ProfilePhotoDisplay from '../components/ProfilePhotoDisplay';

export default function DatasetDemo() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatasetStats();
  }, []);

  const fetchDatasetStats = async () => {
    try {
      const response = await fetch('/api/dataset?action=stats');
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching dataset stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Human Profile Photos Dataset
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Dataset: osmankagankurnaz/human-profile-photos-dataset
          </p>
          
          {/* Dataset Status */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <div className={`w-2 h-2 rounded-full mr-2 ${stats?.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {loading ? 'Checking...' : stats?.isAvailable ? 'Dataset Available' : 'Dataset Not Found'}
          </div>
        </div>

        {/* Dataset Statistics */}
        {stats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dataset Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalPhotos}</div>
                <div className="text-gray-600">Total Photos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{Object.keys(stats.categories).length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.isAvailable ? 'Yes' : 'No'}
                </div>
                <div className="text-gray-600">Available</div>
              </div>
            </div>
            
            {/* Categories Breakdown */}
            {Object.keys(stats.categories).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(stats.categories).map(([category, count]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="font-semibold text-gray-900 capitalize">{category}</div>
                      <div className="text-sm text-gray-600">{count} photos</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Setup Instructions */}
        {!loading && (!stats || !stats.isAvailable) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Dataset Setup Required</h3>
            <p className="text-yellow-700 mb-4">
              The human profile photos dataset is not yet available. Follow these steps to set it up:
            </p>
            <ol className="list-decimal list-inside text-yellow-700 space-y-2">
              <li>Set up Kaggle API authentication (see instructions below)</li>
              <li>Run the download script: <code className="bg-yellow-100 px-2 py-1 rounded">python3 download_dataset.py</code></li>
              <li>Refresh this page to see the dataset</li>
            </ol>
          </div>
        )}

        {/* Demo Sections */}
        <div className="space-y-8">
          {/* Random Photos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Random Profile Photos</h2>
            <ProfilePhotoDisplay 
              count={8} 
              className="w-full"
              showStats={false}
            />
          </div>

          {/* Category-based Photos */}
          {stats && Object.keys(stats.categories).length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Photos by Category</h2>
              <div className="space-y-6">
                {Object.keys(stats.categories).slice(0, 2).map(category => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                      {category} Photos
                    </h3>
                    <ProfilePhotoDisplay 
                      count={6} 
                      category={category}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* API Usage Examples */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Usage Examples</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Get Dataset Statistics</h3>
              <code className="text-sm text-gray-700">
                GET /api/dataset?action=stats
              </code>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Get Random Photos</h3>
              <code className="text-sm text-gray-700">
                GET /api/dataset?action=random&count=5
              </code>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Get Photos by Category</h3>
              <code className="text-sm text-gray-700">
                GET /api/dataset?action=category&category=male
              </code>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Search Photos</h3>
              <code className="text-sm text-gray-700">
                GET /api/dataset?action=search&search=profile
              </code>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Setup Instructions</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              To use this dataset in your application, you need to download it from Kaggle first.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Option 1: Using Kaggle API</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
              <li>Get your Kaggle API credentials from <a href="https://www.kaggle.com/account" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Kaggle Account Settings</a></li>
              <li>Place your <code className="bg-gray-100 px-1 rounded">kaggle.json</code> file in <code className="bg-gray-100 px-1 rounded">~/.kaggle/</code></li>
              <li>Run: <code className="bg-gray-100 px-2 py-1 rounded">python3 download_dataset.py</code></li>
            </ol>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Option 2: Manual Download</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Visit the <a href="https://www.kaggle.com/datasets/osmankagankurnaz/human-profile-photos-dataset" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">dataset page</a></li>
              <li>Download the dataset manually</li>
              <li>Extract it to the <code className="bg-gray-100 px-1 rounded">./data/</code> directory</li>
              <li>Run the organization script to move files to <code className="bg-gray-100 px-1 rounded">./public/dataset/</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

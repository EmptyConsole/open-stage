"use client";
import { useEffect, useState } from 'react';
import Header from './Header';
import VenueHeader from './VenueHeader';
import MusicianHeader from './MusicianHeader';

export default function DynamicHeader() {
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user type from localStorage
    const getUserType = () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          return userData.type || userData.userType || 'general'; // Support different property names
        }
        return 'general';
      } catch (error) {
        console.error('Error parsing user data:', error);
        return 'general';
      }
    };

    const type = getUserType();
    setUserType(type);
    setIsLoading(false);

    // Listen for storage changes to update header when user logs in/out
    const handleStorageChange = () => {
      const newType = getUserType();
      setUserType(newType);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab changes)
    window.addEventListener('userLogin', handleStorageChange);
    window.addEventListener('userLogout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
    };
  }, []);

  // Show loading state or default header while determining user type
  if (isLoading) {
    return <Header />;
  }

  // Render appropriate header based on user type
  switch (userType) {
    case 'venue':
      return <VenueHeader />;
    case 'musician':
    case 'artist':
      return <MusicianHeader />;
    case 'donor':
    case 'general':
    default:
      return <Header />;
  }
}

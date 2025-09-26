// Centralized color system for Open Stage
export const colors = {
  // Primary blues
  primary: '#1976d2',
  primaryHover: '#1565c0',
  primaryActive: '#0d47a1',
  
  // Header blue (darker, intentional)
  header: 'rgba(31, 70, 117, 1)',
  headerHover: 'rgba(31, 70, 117, 0.9)',
  
  // Light blues for backgrounds and hover states
  lightBlue: '#dce6f1',
  lightBlueHover: '#c5d9f0',
  
  // Neutral colors
  white: '#ffffff',
  lightGray: '#f5f5f5',
  gray: '#e0e0e0',
  darkGray: '#666666',
  black: '#000000',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  
  // Border colors
  border: '#ccc',
  borderLight: '#e0e0e0',
  
  // Status colors
  success: '#04aa6d',
  error: '#c62828',
  warning: '#ff9800',
  
  // Background colors
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  sidebarBackground: '#e0e0e0'
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

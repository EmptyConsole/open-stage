// Modern sleek color system for Open Stage
export const colors = {
  // Primary colors - Deep purple/blue gradient style
  primary: '#6366F1',
  primaryHover: '#4F46E5',
  primaryActive: '#4338CA',
  primaryLight: '#EEF2FF',
  primaryLighter: '#F5F7FF',

  // Header - sleek dark mode inspired
  header: '#FFFFFF',
  headerBorder: '#E5E7EB',
  headerText: '#111827',

  // Light backgrounds for cards and sections
  lightBlue: '#F8FAFC',
  lightBlueHover: '#F1F5F9',

  // Neutral colors - modern gray scale
  white: '#FFFFFF',
  lightGray: '#F9FAFB',
  gray: '#E5E7EB',
  darkGray: '#6B7280',
  black: '#111827',

  // Text colors - improved hierarchy with better contrast
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textLight: '#D1D5DB',

  // Border colors - subtle and refined
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',

  // Status colors - vibrant and clear
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Background colors - layered depth
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  cardBackground: '#FFFFFF',

  // Sidebar - subtle contrast
  sidebarBackground: '#F9FAFB',
  sidebarBorder: '#E5E7EB',

  // Accent colors
  accent: '#8B5CF6',
  accentHover: '#7C3AED',
  accentLight: '#F5F3FF'
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

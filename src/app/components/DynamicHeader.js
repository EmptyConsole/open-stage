"use client";
import UnifiedHeader from './UnifiedHeader';

export default function DynamicHeader() {
  // Now we use a single unified header for all user types
  // The UnifiedHeader component handles different navigation based on user type internally
  return <UnifiedHeader />;
}

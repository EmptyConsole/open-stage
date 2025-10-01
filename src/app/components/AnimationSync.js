"use client";
import { useEffect } from 'react';

export default function AnimationSync() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const ANIMATION_DURATION_1 = 20000; // 20 seconds
    const ANIMATION_DURATION_2 = 25000; // 25 seconds
    
    // Get or create animation start time
    let animationStartTime = sessionStorage.getItem('animationStartTime');
    if (!animationStartTime) {
      animationStartTime = Date.now();
      sessionStorage.setItem('animationStartTime', animationStartTime);
    } else {
      animationStartTime = parseInt(animationStartTime);
    }
    
    // Calculate current animation progress
    const now = Date.now();
    const elapsed = now - animationStartTime;
    
    // Calculate delay for each animation layer
    const delay1 = (elapsed % ANIMATION_DURATION_1) / 1000;
    const delay2 = (elapsed % ANIMATION_DURATION_2) / 1000;
    
    // Set CSS custom properties
    document.documentElement.style.setProperty('--animation-start-time', '0s');
    document.documentElement.style.setProperty('--animation-duration-1', ANIMATION_DURATION_1 + 'ms');
    document.documentElement.style.setProperty('--animation-duration-2', ANIMATION_DURATION_2 + 'ms');
    
    // Apply calculated delays
    const style = document.createElement('style');
    style.textContent = `
      .main-content-background::before,
      .auth-container::before {
        animation-delay: -${delay1}s !important;
      }
      .main-content-background::after,
      .auth-container::after {
        animation-delay: -${delay2}s !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

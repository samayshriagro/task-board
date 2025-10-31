import React from 'react';

// Utility function to detect if the current device is mobile/touch
export const isMobileDevice = () => {
  // Check for touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check for mobile user agent patterns
  const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for screen size (mobile-like dimensions)
  const smallScreen = window.innerWidth < 1024; // lg breakpoint in Tailwind
  
  // Return true if device has touch AND (is mobile user agent OR has small screen)
  return hasTouch && (mobileUserAgent || smallScreen);
};

// Hook to use mobile detection with window resize listening
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for window resize to update mobile state
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
};
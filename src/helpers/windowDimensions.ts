import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let isMobile = false;
  let isTablet = false;
  let bigBox = false;
  let smallScreen = false;

  if (width < 767) {
    isMobile = true;
  }
  if (width > 767 && width < 1024) {
    isTablet = true;
  }
  if (width >= 1024) {
    bigBox = true;
  }

  if (width < 1400 && !isMobile) {
    smallScreen = true;
  }

  return {
    width,
    height,
    isMobile,
    isTablet,
    bigBox,
    smallScreen
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check screen width
      const isSmallScreen = window.innerWidth < breakpoint;

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);

      // Consider it mobile if either condition is true
      setIsMobile(isSmallScreen || isMobileDevice);
    };

    // Check on mount
    checkDevice();

    // Add resize listener
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;

import { useEffect, useState } from "react";

const MOBILE_WIDTH = 768;

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_WIDTH);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useMobile;

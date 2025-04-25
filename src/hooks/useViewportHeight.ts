import { useState, useEffect } from "react";

const useViewportHeight = () => {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return height;
};

export default useViewportHeight;

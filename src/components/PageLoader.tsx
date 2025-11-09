import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if all images are loaded
    const checkImagesLoaded = () => {
      const images = Array.from(document.images);
      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch(() => {
          // Even if some images fail, mark as loaded after a timeout
          setImagesLoaded(true);
        });
    };

    // Set a minimum loading time of 500ms for smooth UX
    const minLoadTime = setTimeout(() => {
      if (imagesLoaded) {
        setIsLoading(false);
      }
    }, 500);

    // Listen for window load event
    const handleLoad = () => {
      checkImagesLoaded();
    };

    if (document.readyState === 'complete') {
      checkImagesLoaded();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback: Hide loader after 5 seconds max
    const maxLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(minLoadTime);
      clearTimeout(maxLoadTime);
      window.removeEventListener('load', handleLoad);
    };
  }, [imagesLoaded]);

  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* DesignOPack Logo - Simplified */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#7A0C0C"
                  strokeWidth="4"
                  fill="none"
                />
                <motion.path
                  d="M40 60 L55 75 L80 45"
                  stroke="#7A0C0C"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <text
                  x="60"
                  y="100"
                  textAnchor="middle"
                  fill="#7A0C0C"
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  DesignOPack
                </text>
              </svg>
            </motion.div>

            {/* Circular Spinner */}
            <motion.div
              className="relative w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  border: '4px solid #f3f4f6',
                  borderTopColor: '#7A0C0C',
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-6 text-sm font-medium"
              style={{ color: '#7A0C0C' }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

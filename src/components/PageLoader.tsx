import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a longer loading time to allow images to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Set to 1500ms to give images time to load

    return () => clearTimeout(timer);
  }, []);

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
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Simple Circular Spinner */}
          <motion.div
            className="w-12 h-12 rounded-full border-4 border-gray-200"
            style={{
              borderTopColor: '#7A0C0C',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

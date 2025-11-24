import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt, 
  className = "",
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(placeholder || src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={imgSrc}
        alt={alt}
        className={`h-full w-full object-cover ${isLoading ? "blur-lg scale-110" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        {...props}
      />
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-8 w-8 rounded-full border-2 border-sky-400 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProgressiveImage;

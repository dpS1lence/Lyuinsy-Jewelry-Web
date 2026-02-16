import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  optimizeAppwriteImage,
  getResponsiveImages,
} from "../lib/imageOptimizer";

/**
 * OptimizedImage component for lazy loading and optimized image display
 * Supports automatic format detection, responsive images, and Appwrite optimization
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  style = {},
  loading = "lazy",
  onClick,
  width,
  height,
  srcSet: providedSrcSet,
  sizes: providedSizes,
  optimize = true,
  optimizeOptions = {},
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // If src is an object (from vite-imagetools), extract the default image
  let imageSrc =
    typeof src === "object" && src !== null ? src.default || src : src;

  // Optimize Appwrite images if enabled
  if (optimize && typeof imageSrc === "string") {
    const responsive = getResponsiveImages(imageSrc);

    // Use responsive images if not provided
    if (!providedSrcSet && responsive.srcSet) {
      imageSrc = responsive.src;
      var autoSrcSet = responsive.srcSet;
      var autoSizes = responsive.sizes;
    } else if (optimizeOptions.width || optimizeOptions.quality) {
      imageSrc = optimizeAppwriteImage(imageSrc, optimizeOptions);
    }
  }

  const finalSrcSet = providedSrcSet || autoSrcSet;
  const finalSizes = providedSizes || autoSizes;

  return (
    <div className={`relative ${className}`} style={style}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        style={style}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        width={width}
        height={height}
        srcSet={finalSrcSet}
        sizes={finalSizes}
        decoding="async"
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          Failed to load image
        </div>
      )}
    </div>
  );
}

OptimizedImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  optimize: PropTypes.bool,
  optimizeOptions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    quality: PropTypes.number,
    output: PropTypes.string,
  }),
};

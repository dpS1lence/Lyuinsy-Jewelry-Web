/**
 * Optimizes images from Appwrite or external URLs
 * For Appwrite images, adds transformation parameters
 * For local images, returns as-is (handled by vite)
 */

/**
 * Checks if URL is an Appwrite storage URL
 */
const isAppwriteUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  return (
    url.includes("appwrite") ||
    url.includes("cloud.appwrite.io") ||
    url.includes("/storage/buckets/")
  );
};

/**
 * Optimizes Appwrite image URLs with transformation parameters
 * @param {string} url - Original image URL
 * @param {object} options - Transformation options
 * @param {number} options.width - Target width
 * @param {number} options.height - Target height
 * @param {number} options.quality - Image quality (0-100)
 * @param {string} options.output - Output format (jpg, png, gif, webp)
 * @returns {string} Optimized URL
 */
export const optimizeAppwriteImage = (url, options = {}) => {
  if (!url || typeof url !== "string") return url;

  // If it's not an Appwrite URL, return original
  if (!isAppwriteUrl(url)) return url;

  const { width = 800, height, quality = 80, output = "webp" } = options;

  try {
    const urlObj = new URL(url);

    // Add Appwrite transformation parameters
    if (width) urlObj.searchParams.set("width", width);
    if (height) urlObj.searchParams.set("height", height);
    if (quality) urlObj.searchParams.set("quality", quality);
    if (output) urlObj.searchParams.set("output", output);

    return urlObj.toString();
  } catch (error) {
    console.warn("Failed to optimize image URL:", error);
    return url;
  }
};

/**
 * Get responsive image sources for different screen sizes
 * @param {string} url - Original image URL
 * @returns {object} Object with src and srcSet
 */
export const getResponsiveImages = (url) => {
  if (!url || !isAppwriteUrl(url)) {
    return { src: url, srcSet: "" };
  }

  const sizes = [400, 800, 1200, 1600];
  const srcSet = sizes
    .map(
      (size) =>
        `${optimizeAppwriteImage(url, { width: size, quality: 80 })} ${size}w`,
    )
    .join(", ");

  return {
    src: optimizeAppwriteImage(url, { width: 800, quality: 80 }),
    srcSet,
    sizes:
      "(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1600px",
  };
};

/**
 * Get thumbnail version of an image
 */
export const getThumbnail = (url, size = 300) => {
  return optimizeAppwriteImage(url, { width: size, height: size, quality: 75 });
};

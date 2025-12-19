import React, { useState, useRef, useEffect } from 'react';
import { AVAILABLE_THUMBNAILS, getThumbnailPath } from '../utils/thumbnailAssets';
import { PhotoIcon, LinkIcon, FilmIcon, CheckIcon, CloudIcon, SparklesIcon } from '@heroicons/react/24/solid';

/**
 * Check if a URL is a Cloudinary video URL
 */
const isCloudinaryUrl = (url) => {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};

/**
 * Generate Cloudinary thumbnail URL from video URL
 * Transforms: .../video/upload/.../video.mp4 → .../video/upload/so_X/.../video.jpg
 * @param {string} videoUrl - Cloudinary video URL
 * @param {number} timeSeconds - Time in seconds to extract frame
 * @param {object} options - Additional transformation options
 */
const generateCloudinaryThumbnail = (videoUrl, timeSeconds = 2, options = {}) => {
  if (!isCloudinaryUrl(videoUrl)) return null;

  const { width = 640, height = 360, crop = 'fill' } = options;

  try {
    // Parse Cloudinary URL
    // Format: https://res.cloudinary.com/{cloud_name}/video/upload/{transformations}/{public_id}.{format}
    const url = new URL(videoUrl);
    const pathParts = url.pathname.split('/');

    // Find 'upload' index and insert transformations after it
    const uploadIndex = pathParts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) return null;

    // Build transformation string
    const transforms = `so_${timeSeconds},w_${width},h_${height},c_${crop}`;

    // Check if there are already transformations (the part after 'upload' might be transforms)
    const afterUpload = pathParts[uploadIndex + 1];

    // If there's a version number (starts with 'v' followed by numbers), insert transform before it
    // If there are existing transforms, prepend our transforms
    if (afterUpload && (afterUpload.startsWith('v') && /^v\d+$/.test(afterUpload))) {
      // Has version number - insert transforms before version
      pathParts.splice(uploadIndex + 1, 0, transforms);
    } else if (afterUpload && afterUpload.includes('_')) {
      // Might have existing transforms - prepend ours
      pathParts[uploadIndex + 1] = transforms + '/' + afterUpload;
    } else {
      // No transforms - insert ours
      pathParts.splice(uploadIndex + 1, 0, transforms);
    }

    // Change file extension from video to image (mp4, mov, etc. → jpg)
    const lastPathIndex = pathParts.length - 1;
    pathParts[lastPathIndex] = pathParts[lastPathIndex].replace(/\.(mp4|mov|avi|webm|mkv|m4v|ogv|3gp)$/i, '.jpg');

    // Reconstruct URL
    url.pathname = pathParts.join('/');
    return url.toString();
  } catch (error) {
    console.error('Failed to generate Cloudinary thumbnail URL:', error);
    return null;
  }
};

const ThumbnailSelector = ({ value, onChange, videoUrl }) => {
  const [mode, setMode] = useState('existing'); // 'existing' | 'custom' | 'auto'
  const [customUrl, setCustomUrl] = useState('');
  const [capturedFrame, setCapturedFrame] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureTime, setCaptureTime] = useState(2); // Default to 2 seconds
  const [cloudinaryPreview, setCloudinaryPreview] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Check if video URL is from Cloudinary
  const isCloudinaryVideo = isCloudinaryUrl(videoUrl);

  // Determine which thumbnail is currently selected from existing
  const selectedThumbnail = AVAILABLE_THUMBNAILS.find(t =>
    value === getThumbnailPath(t.filename) || value === t.filename
  );

  // Auto-generate Cloudinary preview when time changes
  useEffect(() => {
    if (mode === 'auto' && isCloudinaryVideo && videoUrl) {
      const thumbnail = generateCloudinaryThumbnail(videoUrl, captureTime);
      setCloudinaryPreview(thumbnail);
    }
  }, [captureTime, videoUrl, mode, isCloudinaryVideo]);

  // Handle mode changes
  useEffect(() => {
    if (mode === 'custom' && customUrl) {
      onChange(customUrl);
    } else if (mode === 'auto' && capturedFrame) {
      onChange(capturedFrame);
    }
  }, [mode]);

  // Handle custom URL changes
  const handleCustomUrlChange = (url) => {
    setCustomUrl(url);
    if (mode === 'custom') {
      onChange(url);
    }
  };

  // Handle existing thumbnail selection
  const handleSelectExisting = (thumbnail) => {
    onChange(getThumbnailPath(thumbnail.filename));
  };

  // Generate Cloudinary thumbnail (instant - just URL transformation!)
  const generateCloudinaryFrame = () => {
    const thumbnail = generateCloudinaryThumbnail(videoUrl, captureTime);
    if (thumbnail) {
      setCapturedFrame(thumbnail);
      onChange(thumbnail);
    }
  };

  // Capture frame from video (fallback for non-Cloudinary videos)
  const captureVideoFrame = async () => {
    if (!videoUrl) return;

    // For Cloudinary videos, use URL transformation (much faster!)
    if (isCloudinaryVideo) {
      generateCloudinaryFrame();
      return;
    }

    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      // Load the video
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
          video.currentTime = Math.min(captureTime, video.duration || captureTime);
        };
        video.onseeked = resolve;
        video.onerror = reject;
        setTimeout(reject, 10000); // 10 second timeout
      });

      // Draw frame to canvas
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedFrame(dataUrl);
      onChange(dataUrl);
    } catch (error) {
      console.error('Failed to capture video frame:', error);
      // Fall back to a default thumbnail
      const defaultThumb = getThumbnailPath(AVAILABLE_THUMBNAILS[0].filename);
      setCapturedFrame(defaultThumb);
      onChange(defaultThumb);
    } finally {
      setIsCapturing(false);
    }
  };

  // Get preview image source
  const getPreviewSrc = () => {
    if (mode === 'existing' && selectedThumbnail) {
      return getThumbnailPath(selectedThumbnail.filename);
    } else if (mode === 'custom' && customUrl) {
      return customUrl;
    } else if (mode === 'auto' && capturedFrame) {
      return capturedFrame;
    }
    return null;
  };

  const previewSrc = getPreviewSrc();

  return (
    <div className="space-y-4">
      {/* Mode Selector Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setMode('existing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${mode === 'existing'
            ? 'bg-pm-purple text-white shadow-lg shadow-pm-purple/30'
            : 'bg-se-gray text-gray-300 hover:bg-pm-purple/50'
            }`}
        >
          <PhotoIcon className="w-4 h-4" />
          Existing
        </button>
        <button
          type="button"
          onClick={() => setMode('custom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${mode === 'custom'
            ? 'bg-pm-purple text-white shadow-lg shadow-pm-purple/30'
            : 'bg-se-gray text-gray-300 hover:bg-pm-purple/50'
            }`}
        >
          <LinkIcon className="w-4 h-4" />
          Custom URL
        </button>
        <button
          type="button"
          onClick={() => setMode('auto')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${mode === 'auto'
            ? 'bg-pm-purple text-white shadow-lg shadow-pm-purple/30'
            : 'bg-se-gray text-gray-300 hover:bg-pm-purple/50'
            }`}
        >
          {isCloudinaryVideo ? (
            <>
              <CloudIcon className="w-4 h-4" />
              <SparklesIcon className="w-3 h-3 -ml-1" />
            </>
          ) : (
            <FilmIcon className="w-4 h-4" />
          )}
          From Video
          {isCloudinaryVideo && (
            <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full ml-1">
              Cloudinary
            </span>
          )}
        </button>
      </div>

      {/* Mode Content */}
      <div className="bg-se-gray rounded-lg p-4">
        {/* Existing Thumbnails Grid */}
        {mode === 'existing' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {AVAILABLE_THUMBNAILS.map((thumbnail) => {
              const isSelected = selectedThumbnail?.filename === thumbnail.filename;
              return (
                <button
                  key={thumbnail.filename}
                  type="button"
                  onClick={() => handleSelectExisting(thumbnail)}
                  className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-200 cursor-pointer group ${isSelected
                    ? 'ring-3 ring-pm-purple scale-105 shadow-lg shadow-pm-purple/40'
                    : 'ring-1 ring-gray-600 hover:ring-pm-purple hover:scale-102'
                    }`}
                >
                  <img
                    src={getThumbnailPath(thumbnail.filename)}
                    alt={thumbnail.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Selection overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-pm-purple/30 flex items-center justify-center">
                      <CheckIcon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  )}
                  {/* Label on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white truncate">{thumbnail.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom URL Input */}
        {mode === 'custom' && (
          <div className="space-y-3">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => handleCustomUrlChange(e.target.value)}
              placeholder="Enter image URL (https://...)"
              className="w-full bg-primary-text border border-gray-600 rounded-md py-2 px-3 text-white 
                                focus:outline-none focus:ring-2 focus:ring-pm-purple focus:border-pm-purple"
            />
            {customUrl && (
              <div className="flex justify-center">
                <img
                  src={customUrl}
                  alt="Preview"
                  className="max-h-40 rounded-lg object-contain"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
        )}

        {/* Auto from Video */}
        {mode === 'auto' && (
          <div className="space-y-4">
            {!videoUrl ? (
              <p className="text-gray-400 text-center py-4">
                Enter a video URL above first to generate a thumbnail
              </p>
            ) : isCloudinaryVideo ? (
              /* Cloudinary-optimized UI */
              <>
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-300 text-sm mb-1">
                    <CloudIcon className="w-4 h-4" />
                    <span className="font-medium">Cloudinary Video Detected</span>
                    <SparklesIcon className="w-3 h-3 text-yellow-400" />
                  </div>
                  <p className="text-xs text-gray-400">
                    Thumbnails are generated instantly via Cloudinary's API - no video download needed!
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-300 whitespace-nowrap">
                    Frame at: <span className="font-mono text-pm-purple">{captureTime}s</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={captureTime}
                    onChange={(e) => setCaptureTime(Number(e.target.value))}
                    className="flex-1 accent-pm-purple"
                  />
                  <button
                    type="button"
                    onClick={generateCloudinaryFrame}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-medium
                                            transition-all shadow-lg shadow-purple-500/25 cursor-pointer flex items-center gap-2"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    Generate
                  </button>
                </div>

                {/* Live Preview from Cloudinary */}
                {cloudinaryPreview && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">Live Preview (updates as you move slider):</p>
                    <div className="flex justify-center bg-black/30 rounded-lg p-2">
                      <img
                        src={cloudinaryPreview}
                        alt="Cloudinary preview"
                        className="max-h-48 rounded-lg object-contain shadow-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Standard video capture UI (fallback for non-Cloudinary) */
              <>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-300">
                    Capture at: {captureTime}s
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={captureTime}
                    onChange={(e) => setCaptureTime(Number(e.target.value))}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={captureVideoFrame}
                    disabled={isCapturing}
                    className="px-4 py-2 bg-pm-purple hover:bg-pm-purple-hover rounded-lg text-white 
                                            transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isCapturing ? 'Capturing...' : 'Capture Frame'}
                  </button>
                </div>

                {capturedFrame && (
                  <div className="flex justify-center">
                    <img
                      src={capturedFrame}
                      alt="Captured frame"
                      className="max-h-40 rounded-lg object-contain shadow-lg"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {previewSrc && (
        <div className="bg-se-gray rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-2">Selected Thumbnail:</p>
          <div className="flex justify-center">
            <img
              src={previewSrc}
              alt="Selected thumbnail"
              className="max-h-32 rounded-lg object-contain shadow-md"
            />
          </div>
        </div>
      )}

      {/* Hidden video and canvas for frame capture (only needed for non-Cloudinary) */}
      {!isCloudinaryVideo && (
        <>
          <video ref={videoRef} className="hidden" muted playsInline />
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
};

export default ThumbnailSelector;

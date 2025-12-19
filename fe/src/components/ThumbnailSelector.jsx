import React, { useState, useEffect } from 'react';
import { AVAILABLE_THUMBNAILS, getThumbnailPath } from '../utils/thumbnailAssets';
import { PhotoIcon, LinkIcon, CheckIcon } from '@heroicons/react/24/solid';

const ThumbnailSelector = ({ value, onChange }) => {
  const selectedThumbnail = AVAILABLE_THUMBNAILS.find(t =>
    value === getThumbnailPath(t.filename) || value === t.filename
  );

  const isCustomValue = value && !selectedThumbnail && (value.startsWith('http://') || value.startsWith('https://'));

  const [mode, setMode] = useState(isCustomValue ? 'custom' : 'existing');
  const [customUrl, setCustomUrl] = useState(isCustomValue ? value : '');

  useEffect(() => {
    if (value && !selectedThumbnail && (value.startsWith('http://') || value.startsWith('https://'))) {
      setCustomUrl(value);
      setMode('custom');
    }
  }, [value, selectedThumbnail]);

  useEffect(() => {
    if (mode === 'custom' && customUrl) {
      onChange(customUrl);
    }
  }, [mode, customUrl, onChange]);

  const handleCustomUrlChange = (url) => {
    setCustomUrl(url);
    if (mode === 'custom') {
      onChange(url);
    }
  };

  const handleSelectExisting = (thumbnail) => {
    onChange(getThumbnailPath(thumbnail.filename));
  };

  const getPreviewSrc = () => {
    if (mode === 'existing' && selectedThumbnail) {
      return getThumbnailPath(selectedThumbnail.filename);
    } else if (mode === 'custom' && customUrl) {
      return customUrl;
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
            mode === 'existing'
              ? 'bg-nf-accent text-nf-bg shadow-lg shadow-nf-accent/20'
              : 'bg-nf-surface text-nf-text-secondary hover:bg-nf-surface-hover hover:text-nf-text'
          }`}
        >
          <PhotoIcon className="w-4 h-4" />
          Preset
        </button>
        <button
          type="button"
          onClick={() => setMode('custom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
            mode === 'custom'
              ? 'bg-nf-accent text-nf-bg shadow-lg shadow-nf-accent/20'
              : 'bg-nf-surface text-nf-text-secondary hover:bg-nf-surface-hover hover:text-nf-text'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          Custom URL
        </button>
      </div>

      {/* Mode Content */}
      <div className="bg-nf-bg rounded-xl p-4 border border-nf-border">
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
                  className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'ring-2 ring-nf-accent scale-105 shadow-lg shadow-nf-accent/30'
                      : 'ring-1 ring-nf-border hover:ring-nf-accent/50 hover:scale-102'
                  }`}
                >
                  <img
                    src={getThumbnailPath(thumbnail.filename)}
                    alt={thumbnail.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-nf-accent/20 flex items-center justify-center">
                      <CheckIcon className="w-8 h-8 text-nf-accent drop-shadow-lg" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nf-bg/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-nf-text truncate">{thumbnail.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom URL Input */}
        {mode === 'custom' && (
          <div className="space-y-4">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => handleCustomUrlChange(e.target.value)}
              placeholder="Enter image URL (https://...)"
              className="nf-input"
            />
            {customUrl && (
              <div className="flex justify-center">
                <img
                  src={customUrl}
                  alt="Preview"
                  className="max-h-40 rounded-lg object-contain border border-nf-border"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Section */}
      {previewSrc && (
        <div className="bg-nf-bg rounded-xl p-4 border border-nf-border">
          <p className="text-sm text-nf-text-muted mb-3">Selected Thumbnail:</p>
          <div className="flex justify-center">
            <img
              src={previewSrc}
              alt="Selected thumbnail"
              className="max-h-32 rounded-lg object-contain shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSelector;

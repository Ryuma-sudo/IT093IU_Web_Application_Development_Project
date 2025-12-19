import React, { useState, useRef } from 'react';
import { AVAILABLE_AVATARS, getAvatarPath } from '../utils/avatarAssets';
import { PhotoIcon, CloudArrowUpIcon, CheckIcon, CameraIcon } from '@heroicons/react/24/solid';

const AvatarSelector = ({ currentAvatar, onSelectExisting, onUpload, isUploading }) => {
  const [mode, setMode] = useState('existing');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const isExistingSelected = (filename) => {
    if (selectedAvatar === filename) return true;
    if (!selectedAvatar && currentAvatar) {
      return currentAvatar.includes(filename) || currentAvatar.endsWith(filename);
    }
    return false;
  };

  const handleSelectExisting = (avatar) => {
    setSelectedAvatar(avatar.filename);
    setPreviewUrl(null);
    onSelectExisting(getAvatarPath(avatar.filename));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setSelectedAvatar(null);
    onUpload(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector Tabs */}
      <div className="flex gap-2">
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
          Choose Avatar
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
            mode === 'upload'
              ? 'bg-nf-accent text-nf-bg shadow-lg shadow-nf-accent/20'
              : 'bg-nf-surface text-nf-text-secondary hover:bg-nf-surface-hover hover:text-nf-text'
          }`}
        >
          <CloudArrowUpIcon className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Mode Content */}
      <div className="bg-nf-bg-elevated rounded-xl p-4 border border-nf-border">
        {/* Existing Avatars Grid */}
        {mode === 'existing' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {AVAILABLE_AVATARS.map((avatar) => {
              const isSelected = isExistingSelected(avatar.filename);
              return (
                <button
                  key={avatar.filename}
                  type="button"
                  onClick={() => handleSelectExisting(avatar)}
                  className={`relative aspect-square rounded-full overflow-hidden transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'ring-3 ring-nf-accent scale-110 shadow-lg shadow-nf-accent/30'
                      : 'ring-2 ring-nf-border hover:ring-nf-accent/50 hover:scale-105'
                  }`}
                >
                  <img
                    src={getAvatarPath(avatar.filename)}
                    alt={avatar.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-nf-accent/30 flex items-center justify-center">
                      <CheckIcon className="w-8 h-8 text-nf-accent drop-shadow-lg" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nf-bg/90 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-nf-text text-center block truncate">{avatar.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Upload Section */}
        {mode === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={triggerFileInput}
              className={`border-2 border-dashed border-nf-border rounded-xl p-8 text-center cursor-pointer
                hover:border-nf-accent hover:bg-nf-accent/5 transition-all duration-200
                ${isUploading ? 'animate-pulse pointer-events-none' : ''}`}
            >
              {previewUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-nf-accent"
                  />
                  <p className="text-sm text-nf-text-muted">
                    {isUploading ? 'Uploading to Cloudinary...' : 'Click to change image'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-nf-accent/10 flex items-center justify-center">
                    <CameraIcon className="w-8 h-8 text-nf-accent" />
                  </div>
                  <div>
                    <p className="text-nf-text font-medium">Click to upload</p>
                    <p className="text-sm text-nf-text-muted">JPG, PNG, GIF up to 5MB</p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />

            <div className="bg-nf-secondary/5 border border-nf-secondary/20 rounded-lg p-3">
              <p className="text-xs text-nf-text-muted flex items-center gap-2">
                <CloudArrowUpIcon className="w-4 h-4 text-nf-secondary" />
                Images are uploaded to <span className="text-nf-secondary font-medium">Cloudinary</span> for secure, fast delivery
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarSelector;

import React, { useState, useRef } from 'react';
import { AVAILABLE_AVATARS, getAvatarPath } from '../utils/avatarAssets';
import { PhotoIcon, CloudArrowUpIcon, CheckIcon, CameraIcon } from '@heroicons/react/24/solid';

const AvatarSelector = ({ currentAvatar, onSelectExisting, onUpload, isUploading }) => {
  const [mode, setMode] = useState('existing'); // 'existing' | 'upload'
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Check if current avatar matches any existing asset
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

    // Show preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setSelectedAvatar(null);

    // Trigger upload
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${mode === 'existing'
              ? 'bg-pm-purple text-white shadow-lg shadow-pm-purple/30'
              : 'bg-se-gray text-gray-300 hover:bg-pm-purple/50'
            }`}
        >
          <PhotoIcon className="w-4 h-4" />
          Choose Avatar
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${mode === 'upload'
              ? 'bg-pm-purple text-white shadow-lg shadow-pm-purple/30'
              : 'bg-se-gray text-gray-300 hover:bg-pm-purple/50'
            }`}
        >
          <CloudArrowUpIcon className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Mode Content */}
      <div className="bg-se-gray rounded-lg p-4">
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
                  className={`relative aspect-square rounded-full overflow-hidden transition-all duration-200 cursor-pointer group ${isSelected
                      ? 'ring-4 ring-pm-purple scale-110 shadow-lg shadow-pm-purple/40'
                      : 'ring-2 ring-gray-600 hover:ring-pm-purple hover:scale-105'
                    }`}
                >
                  <img
                    src={getAvatarPath(avatar.filename)}
                    alt={avatar.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Selection overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-pm-purple/40 flex items-center justify-center">
                      <CheckIcon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  )}
                  {/* Label on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white text-center block truncate">{avatar.label}</span>
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
              className={`border-2 border-dashed border-gray-500 rounded-lg p-8 text-center cursor-pointer
                                hover:border-pm-purple hover:bg-pm-purple/10 transition-all duration-200
                                ${isUploading ? 'animate-pulse pointer-events-none' : ''}`}
            >
              {previewUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-pm-purple"
                  />
                  <p className="text-sm text-gray-400">
                    {isUploading ? 'Uploading to Cloudinary...' : 'Click to change image'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-pm-purple/20 flex items-center justify-center">
                    <CameraIcon className="w-8 h-8 text-pm-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Click to upload</p>
                    <p className="text-sm text-gray-400">JPG, PNG, GIF up to 5MB</p>
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

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-xs text-gray-400">
                📦 Images are uploaded to <span className="text-blue-300">Cloudinary</span> for secure, fast delivery
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarSelector;

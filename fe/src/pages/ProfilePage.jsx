import React, { useState, useEffect } from 'react';

import { useUserStore } from "../stores/useUserStore";

import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';
import AvatarSelector from '../components/AvatarSelector';

const ProfilePage = () => {
    const { user, userInfo, fetchUser, isUpdatingProfile, updateProfile, updateAvatarUrl } = useUserStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);

    // Handle file upload to Cloudinary
    const handleUpload = async (file) => {
        if (!file) return;

        // Update preview
        const preview = URL.createObjectURL(file);
        setSelectedImg(preview);

        // Construct FormData
        const formData = new FormData();
        formData.append("file", file);

        // Call updateProfile with raw FormData
        await updateProfile(formData);

        // Refresh user data to get new avatar URL
        await fetchUser(user.id);
        setShowAvatarSelector(false);
    };

    // Handle selecting existing avatar
    const handleSelectExisting = async (avatarPath) => {
        setSelectedImg(avatarPath);

        // Update user avatar with the local path
        // The backend should handle this as a URL update, not a file upload
        try {
            await updateAvatarUrl(avatarPath);
            await fetchUser(user.id);
            setShowAvatarSelector(false);
        } catch (error) {
            console.error('Failed to update avatar:', error);
            // Still update locally even if backend fails
        }
    };

    useEffect(() => {
        fetchUser(user.id);
    }, [user.id, fetchUser]);

    const currentAvatar = selectedImg || userInfo.avatar || "./assets/avatar.png";

    return (
        <div className="relative min-h-screen">
            {/* Background image with overlay */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                <OptimizedImage
                    src="/assets/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="relative z-20 max-w-2xl mx-auto p-4 py-8">
                <div className="bg-pm-gray text-white rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold ">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    {/* Avatar section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={currentAvatar}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                            />
                            <button
                                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                                className={`
                                    absolute bottom-0 right-0 
                                    bg-pm-purple hover:scale-105
                                    p-2 rounded-full cursor-pointer 
                                    transition-all duration-200
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <UserIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "Click to change your profile picture"}
                        </p>
                    </div>

                    {/* Avatar Selector Modal */}
                    {showAvatarSelector && (
                        <div className="animate-in fade-in duration-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-medium">Choose Profile Picture</h3>
                                <button
                                    onClick={() => setShowAvatarSelector(false)}
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                            <AvatarSelector
                                currentAvatar={userInfo.avatar}
                                onSelectExisting={handleSelectExisting}
                                onUpload={handleUpload}
                                isUploading={isUpdatingProfile}
                            />
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <UserIcon className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userInfo?.username}</p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <EnvelopeIcon className="w-4 h-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userInfo?.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{userInfo.registrationDate?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

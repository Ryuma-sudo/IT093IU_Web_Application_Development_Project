import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from '../config/axios';

import { useUserStore } from "../stores/useUserStore";

import { UserIcon, EnvelopeIcon, CalendarIcon, CheckBadgeIcon, KeyIcon } from '@heroicons/react/24/solid';
import { CameraIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import OptimizedImage from '../components/OptimizedImage';
import AvatarSelector from '../components/AvatarSelector';

const ProfilePage = () => {
    const { user, userInfo, fetchUser, isUpdatingProfile, updateProfile, updateAvatarUrl } = useUserStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);

    // Password change state
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [changingPassword, setChangingPassword] = useState(false);

    const handleUpload = async (file) => {
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setSelectedImg(preview);

        const formData = new FormData();
        formData.append("file", file);

        await updateProfile(formData);
        await fetchUser(user.id);
        setShowAvatarSelector(false);
    };

    const handleSelectExisting = async (avatarPath) => {
        setSelectedImg(avatarPath);

        try {
            await updateAvatarUrl(avatarPath);
            await fetchUser(user.id);
            setShowAvatarSelector(false);
        } catch (error) {
            console.error('Failed to update avatar:', error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setChangingPassword(true);
        try {
            await axios.put(`/users/${user.id}/password`, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, { withCredentials: true });

            toast.success('Password changed successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswordForm(false);
        } catch (error) {
            toast.error(error.response?.data || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    useEffect(() => {
        fetchUser(user.id);
    }, [user.id, fetchUser]);

    const currentAvatar = selectedImg || userInfo.avatar || "./assets/avatar.png";

    return (
        <div className="nf-page relative min-h-screen py-12 px-4">
            {/* Background */}
            <div className="fixed inset-0 nf-hero-bg">
                <OptimizedImage
                    src="/assets/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="nf-card-static overflow-hidden">
                    {/* Header banner */}
                    <div className="h-32 bg-gradient-to-r from-nf-accent/20 via-nf-secondary/10 to-nf-accent/20" />

                    {/* Profile content */}
                    <div className="px-6 sm:px-8 pb-8">
                        {/* Avatar section - overlapping the banner */}
                        <div className="flex flex-col items-center -mt-16 mb-6">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full ring-4 ring-nf-surface overflow-hidden bg-nf-surface">
                                    <img
                                        src={currentAvatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                                    className={`absolute bottom-0 right-0 p-2.5 rounded-full bg-nf-accent text-nf-bg transition-all duration-200 cursor-pointer hover:bg-nf-accent-hover ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                                        }`}
                                >
                                    <CameraIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-sm text-nf-text-muted mt-3">
                                {isUpdatingProfile ? "Uploading..." : "Click avatar to change"}
                            </p>
                        </div>

                        {/* Avatar Selector */}
                        {showAvatarSelector && (
                            <div className="mb-8 p-5 rounded-xl bg-nf-bg border border-nf-border animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-nf-text">Choose Profile Picture</h3>
                                    <button
                                        onClick={() => setShowAvatarSelector(false)}
                                        className="p-2 rounded-lg text-nf-text-muted hover:text-nf-text hover:bg-nf-surface transition-colors cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
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

                        {/* User Info */}
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-nf-bg border border-nf-border">
                                <div className="flex items-center gap-3 mb-1">
                                    <UserIcon className="w-5 h-5 text-nf-accent" />
                                    <span className="text-sm text-nf-text-muted">Username</span>
                                </div>
                                <p className="text-lg font-medium text-nf-text pl-8">{userInfo?.username}</p>
                            </div>

                            <div className="p-4 rounded-xl bg-nf-bg border border-nf-border">
                                <div className="flex items-center gap-3 mb-1">
                                    <EnvelopeIcon className="w-5 h-5 text-nf-secondary" />
                                    <span className="text-sm text-nf-text-muted">Email</span>
                                </div>
                                <p className="text-lg font-medium text-nf-text pl-8">{userInfo?.email}</p>
                            </div>
                        </div>

                        {/* Account Info Card */}
                        <div className="mt-6 p-5 rounded-xl bg-nf-bg border border-nf-border">
                            <h2 className="text-lg font-semibold text-nf-text mb-4 flex items-center gap-2">
                                <CheckBadgeIcon className="w-5 h-5 text-nf-success" />
                                Account Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-nf-border">
                                    <div className="flex items-center gap-3">
                                        <CalendarIcon className="w-5 h-5 text-nf-text-muted" />
                                        <span className="text-nf-text-secondary">Member Since</span>
                                    </div>
                                    <span className="text-nf-text font-medium">
                                        {userInfo.registrationDate?.split("T")[0]}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-nf-text-secondary">Account Status</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nf-success/10 text-nf-success text-sm font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-nf-success animate-pulse" />
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Password Change Section */}
                        <div className="mt-6 p-5 rounded-xl bg-nf-bg border border-nf-border">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-nf-text flex items-center gap-2">
                                    <KeyIcon className="w-5 h-5 text-nf-accent" />
                                    Password
                                </h2>
                                <button
                                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                                    className="text-sm text-nf-accent hover:text-nf-accent-hover transition-colors cursor-pointer"
                                >
                                    {showPasswordForm ? 'Cancel' : 'Change Password'}
                                </button>
                            </div>

                            {showPasswordForm && (
                                <form onSubmit={handlePasswordChange} className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm text-nf-text-muted mb-2">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.current ? 'text' : 'password'}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="nf-input pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-nf-text-muted hover:text-nf-text cursor-pointer"
                                            >
                                                {showPasswords.current ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-nf-text-muted mb-2">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.new ? 'text' : 'password'}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="nf-input pr-10"
                                                required
                                                minLength={6}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-nf-text-muted hover:text-nf-text cursor-pointer"
                                            >
                                                {showPasswords.new ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-nf-text-muted mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.confirm ? 'text' : 'password'}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="nf-input pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-nf-text-muted hover:text-nf-text cursor-pointer"
                                            >
                                                {showPasswords.confirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={changingPassword}
                                        className="w-full nf-btn nf-btn-primary"
                                    >
                                        {changingPassword ? 'Changing...' : 'Change Password'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

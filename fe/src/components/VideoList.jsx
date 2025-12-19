import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useVideoStore } from '../stores/useVideoStore';
import { useCategoryStore } from '../stores/useCategoryStore';
import { useUserStore } from '../stores/useUserStore';
import { useNavigateWithLoading } from '../hooks/useNavigateWithLoading';
import { getImageSrc } from '../utils/imageUtils';

import { TrashIcon, XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';
import { StarIcon, PencilIcon, FilmIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';
import ThumbnailSelector from '../components/ThumbnailSelector';
import toast from 'react-hot-toast';

const VideoList = () => {
    const navigate = useNavigate();
    const navigateWithLoading = useNavigateWithLoading();
    const { videos, loading, fetchAllVideos, deleteVideo, updateVideo } = useVideoStore();
    const { categories, fetchAllCategories } = useCategoryStore();
    const { user } = useUserStore();
    const [editingVideo, setEditingVideo] = useState(null);
    const [editedVideo, setEditedVideo] = useState({
        title: '',
        description: '',
        url: '',
        thumbnailUrl: '',
        categoryId: null
    });

    useEffect(() => {
        fetchAllVideos();
        fetchAllCategories();
    }, [fetchAllVideos, fetchAllCategories]);

    const userVideos = videos.filter(video => video.uploaderId === user?.id);

    const handleDeleteVideo = async (videoId) => {
        try {
            await deleteVideo(videoId);
            toast.success('Video removed');
            await fetchAllVideos();
        } catch (error) {
            toast.error('Failed to remove video');
        }
    };

    const handleEditClick = (video) => {
        setEditingVideo(video.id);
        setEditedVideo({
            title: video.title,
            description: video.description,
            url: video.url,
            thumbnailUrl: video.thumbnailUrl,
            categoryId: Number(video.categoryId)
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVideo(editingVideo, {
                ...editedVideo,
                categoryId: Number(editedVideo.categoryId)
            });
            toast.success('Video updated successfully');
            setEditingVideo(null);
            await fetchAllVideos();
        } catch (error) {
            toast.error('Failed to update video');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nf-accent"></div>
                <span className="text-nf-text-muted">Loading your videos...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {userVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="p-6 rounded-2xl bg-nf-surface mb-6">
                        <FilmIcon className="w-16 h-16 text-nf-text-muted" />
                    </div>
                    <h2 className="text-xl font-semibold text-nf-text mb-2">
                        No videos yet
                    </h2>
                    <p className="text-nf-text-secondary">
                        Create your first video to get started
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {userVideos.map((item, index) => (
                        <div 
                            key={item.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Video Card */}
                            <div className="group nf-card-static p-4 flex items-center gap-4 hover:border-nf-border-hover transition-all duration-200">
                                {/* Thumbnail */}
                                <div 
                                    className="relative flex-shrink-0 w-36 aspect-video rounded-lg overflow-hidden cursor-pointer"
                                    onClick={() => navigateWithLoading(`/watch/${item.id}`)}
                                >
                                    <OptimizedImage
                                        src={getImageSrc(item.thumbnailUrl)}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-nf-bg/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayIcon className="w-8 h-8 text-nf-accent" />
                                    </div>
                                </div>

                                {/* Info */}
                                <div 
                                    className="flex-1 min-w-0 cursor-pointer" 
                                    onClick={() => navigateWithLoading(`/watch/${item.id}`)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-nf-text line-clamp-1 group-hover:text-nf-accent transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="nf-tag text-xs py-1 px-2">
                                            {item.categoryName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-nf-text-muted">
                                        <span className="flex items-center gap-1.5">
                                            <StarIcon className="w-4 h-4 text-nf-accent" />
                                            {item.averageRating ? Number(item.averageRating).toFixed(1) : 'N/A'}
                                        </span>
                                        <span>{item.viewCount?.toLocaleString() || 0} views</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="p-2.5 rounded-lg text-nf-text-muted hover:text-nf-secondary hover:bg-nf-secondary/10 transition-all duration-200 cursor-pointer"
                                        title="Edit video"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteVideo(item.id)}
                                        className="p-2.5 rounded-lg text-nf-text-muted hover:text-nf-error hover:bg-nf-error/10 transition-all duration-200 cursor-pointer"
                                        title="Delete video"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Edit Form */}
                            {editingVideo === item.id && (
                                <div className="mt-2 nf-card-static p-6 animate-fade-in">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-nf-text">Edit Video</h3>
                                        <button
                                            onClick={() => setEditingVideo(null)}
                                            className="p-2 rounded-lg text-nf-text-muted hover:text-nf-text hover:bg-nf-surface-hover transition-colors cursor-pointer"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-nf-text mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={editedVideo.title}
                                                onChange={(e) => setEditedVideo({ ...editedVideo, title: e.target.value })}
                                                className="nf-input"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-nf-text mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                value={editedVideo.description}
                                                onChange={(e) => setEditedVideo({ ...editedVideo, description: e.target.value })}
                                                rows="3"
                                                className="nf-input resize-none"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="url" className="block text-sm font-medium text-nf-text mb-2">
                                                Video URL
                                            </label>
                                            <input
                                                type="text"
                                                id="url"
                                                value={editedVideo.url}
                                                onChange={(e) => setEditedVideo({ ...editedVideo, url: e.target.value })}
                                                className="nf-input"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-nf-text mb-2">
                                                Thumbnail
                                            </label>
                                            <ThumbnailSelector
                                                value={editedVideo.thumbnailUrl}
                                                onChange={(url) => setEditedVideo({ ...editedVideo, thumbnailUrl: url })}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-nf-text mb-2">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                value={editedVideo.categoryId}
                                                onChange={(e) => setEditedVideo({ ...editedVideo, categoryId: Number(e.target.value) })}
                                                className="nf-input cursor-pointer"
                                                required
                                            >
                                                <option value="" className="bg-nf-surface">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id} className="bg-nf-surface">
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVideo(null)}
                                                className="nf-btn nf-btn-ghost"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="nf-btn nf-btn-primary"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VideoList

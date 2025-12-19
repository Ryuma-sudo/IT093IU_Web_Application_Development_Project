import React from 'react';
import VideoThumbnail from './VideoThumbnail';
import { StarIcon } from '@heroicons/react/24/solid';

const RelatedVideos = ({ videos, title = "Related Videos", maxVideos = 6 }) => {
    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-nf-text text-xl font-semibold">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.slice(0, maxVideos).map((video) => (
                    <div 
                        key={video.id} 
                        className="group transform transition-all duration-300"
                    >
                        <VideoThumbnail 
                            videoId={video.id} 
                            title={video.title} 
                            description={video.description} 
                            url={video.url} 
                            thumbnailUrl={video.thumbnailUrl} 
                        />
                        
                        {/* Video Info */}
                        <div className="mt-3 px-1">
                            <h3 className="text-nf-text text-sm font-medium line-clamp-2 mb-1.5 group-hover:text-nf-accent transition-colors">
                                {video.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-nf-text-muted">
                                <span>{video.viewCount?.toLocaleString() || 0} views</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <StarIcon className="w-3.5 h-3.5 text-nf-accent" />
                                    <span>{video.averageRating?.toFixed(1) || 'N/A'}</span>
                                </div>
                                {video.categoryName && (
                                    <>
                                        <span>•</span>
                                        <span className="text-nf-secondary">{video.categoryName}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedVideos;

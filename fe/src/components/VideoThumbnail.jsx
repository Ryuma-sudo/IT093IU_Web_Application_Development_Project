import React from 'react';
import { useNavigateWithLoading } from '../hooks/useNavigateWithLoading';
import OptimizedImage from './OptimizedImage';
import { getImageSrc } from '../utils/imageUtils';
import { PlayIcon } from '@heroicons/react/24/solid';

const VideoThumbnail = ({ videoId, title, description, url, thumbnailUrl }) => {
    const navigateWithLoading = useNavigateWithLoading();

    const handleClick = (e) => {
        e.preventDefault();
        navigateWithLoading(`/watch/${videoId}`);
    };

    return (
        <div className="group relative w-full cursor-pointer aspect-[16/9] rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-nf-accent/10">
            {/* Thumbnail Image */}
            <div onClick={handleClick} className="relative block h-full cursor-pointer">
                <OptimizedImage
                    src={getImageSrc(thumbnailUrl)}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-110 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-nf-bg via-nf-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="p-4 rounded-full bg-nf-accent/90 text-nf-bg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <PlayIcon className="w-8 h-8" />
                    </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out transform translate-y-2 group-hover:translate-y-0">
                    <h2 className="text-lg md:text-xl font-bold text-nf-text mb-2 line-clamp-1 drop-shadow-lg">
                        {title}
                    </h2>
                    <p className="text-sm text-nf-text-secondary line-clamp-2 drop-shadow-md">
                        {description}
                    </p>
                </div>

                {/* Border highlight */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-nf-accent/30 transition-all duration-300 pointer-events-none" />
            </div>
        </div>
    )
}

export default VideoThumbnail

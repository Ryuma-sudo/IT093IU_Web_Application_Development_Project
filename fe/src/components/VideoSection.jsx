import React, { useEffect, useState } from 'react'

import { useVideoStore } from "../stores/useVideoStore";

import VideoThumbnail from './VideoThumbnail';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const VideoSection = ({ cid, name }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const { videos, fetchAllVideos, loading } = useVideoStore();

    useEffect(() => {
        fetchAllVideos();
    }, [fetchAllVideos]);

    const filteredVideos = videos.filter(video => String(video.categoryId) === String(cid));

    const videosPerPage = 2;

    const handleNavigation = (newIndex) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentIndex(newIndex);
        }, 150);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? filteredVideos.length - 1 : currentIndex - 1;
        handleNavigation(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % filteredVideos.length;
        handleNavigation(newIndex);
    };

    const getCurrentVideos = () => {
        if (filteredVideos.length === 0) return [];
        if (filteredVideos.length === 1) return [filteredVideos[0]];

        const videos = [];
        for (let i = 0; i < videosPerPage; i++) {
            const index = (currentIndex + i) % filteredVideos.length;
            videos.push(filteredVideos[index]);
        }
        return videos;
    };

    const currentVideos = getCurrentVideos();
    const totalPositions = filteredVideos.length;

    if (filteredVideos.length === 0) {
        return null;
    }

    return (
        <section className="bg-nf-bg py-16" data-video-section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-nf-text">
                        {name}
                    </h2>
                    
                    {/* Navigation arrows for desktop */}
                    {filteredVideos.length > 2 && (
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={goToPrevious}
                                disabled={isTransitioning}
                                className={`p-2.5 rounded-lg nf-glass transition-all duration-200 cursor-pointer ${
                                    isTransitioning
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:bg-nf-surface-hover'
                                }`}
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-nf-text" />
                            </button>
                            <button
                                onClick={goToNext}
                                disabled={isTransitioning}
                                className={`p-2.5 rounded-lg nf-glass transition-all duration-200 cursor-pointer ${
                                    isTransitioning
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:bg-nf-surface-hover'
                                }`}
                            >
                                <ChevronRightIcon className="w-5 h-5 text-nf-text" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Video Grid */}
                <div className="relative">
                    {/* Mobile navigation buttons */}
                    {filteredVideos.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                disabled={isTransitioning}
                                className={`sm:hidden absolute top-1/2 -translate-y-1/2 left-0 z-20 p-2 rounded-lg nf-glass transition-all duration-200 cursor-pointer ${
                                    isTransitioning
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:bg-nf-surface-hover'
                                }`}
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-nf-text" />
                            </button>
                            <button
                                onClick={goToNext}
                                disabled={isTransitioning}
                                className={`sm:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20 p-2 rounded-lg nf-glass transition-all duration-200 cursor-pointer ${
                                    isTransitioning
                                        ? 'opacity-30 cursor-not-allowed'
                                        : 'hover:bg-nf-surface-hover'
                                }`}
                            >
                                <ChevronRightIcon className="w-5 h-5 text-nf-text" />
                            </button>
                        </>
                    )}

                    {/* Videos */}
                    <div className="overflow-hidden">
                        <div
                            className={`grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[280px] transition-all duration-500 ease-out ${
                                isTransitioning
                                    ? 'opacity-0 scale-95'
                                    : 'opacity-100 scale-100'
                            }`}
                        >
                            {currentVideos.map((video, index) => (
                                <div
                                    key={`${video.id}-${currentIndex}-${index}`}
                                    className={`transform transition-all duration-500 ease-out ${
                                        isTransitioning
                                            ? 'translate-y-4 opacity-0'
                                            : 'translate-y-0 opacity-100'
                                    }`}
                                    style={{
                                        transitionDelay: isTransitioning
                                            ? `${index * 80}ms`
                                            : `${(1 - index) * 120}ms`
                                    }}
                                >
                                    <VideoThumbnail
                                        videoId={video.id}
                                        title={video.title}
                                        description={video.description}
                                        url={video.url}
                                        thumbnailUrl={video.thumbnailUrl}
                                    />
                                </div>
                            ))}

                            {filteredVideos.length === 1 && (
                                <div className="hidden md:block"></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination dots */}
                {filteredVideos.length > 2 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: totalPositions }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavigation(index)}
                                disabled={isTransitioning}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentIndex === index
                                        ? 'w-8 bg-nf-accent'
                                        : 'w-2 bg-nf-border hover:bg-nf-text-muted'
                                } ${isTransitioning ? 'cursor-not-allowed opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default VideoSection

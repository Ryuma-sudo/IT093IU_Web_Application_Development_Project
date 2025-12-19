import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useVideoStore } from '../stores/useVideoStore';

import VideoThumbnail from '../components/VideoThumbnail';
import OptimizedImage from '../components/OptimizedImage';
import { MagnifyingGlassIcon, FilmIcon } from '@heroicons/react/24/outline';

const SearchPage = () => {
    const { searchResults } = useVideoStore();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    return (
        <div className="nf-page relative min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 nf-hero-bg">
                <OptimizedImage
                    src="/assets/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-lg bg-nf-accent/10">
                            <MagnifyingGlassIcon className="w-6 h-6 text-nf-accent" />
                        </div>
                        <h1 className="text-3xl font-bold text-nf-text">
                            Search Results
                        </h1>
                    </div>
                    {query && (
                        <p className="text-nf-text-secondary">
                            Showing results for "<span className="text-nf-accent font-medium">{query}</span>"
                        </p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-2xl font-bold text-nf-text">{searchResults.length}</span>
                        <span className="text-nf-text-muted">videos found</span>
                    </div>
                </div>

                {/* Results Grid */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((video, index) => (
                            <div 
                                key={video.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
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
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="p-6 rounded-2xl bg-nf-surface mb-6">
                            <FilmIcon className="w-16 h-16 text-nf-text-muted" />
                        </div>
                        <h2 className="text-xl font-semibold text-nf-text mb-2">
                            No results found
                        </h2>
                        <p className="text-nf-text-secondary max-w-md">
                            We couldn't find any videos matching your search. Try different keywords or browse our catalog.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;

import React, { useEffect } from 'react';

import { useCategoryStore } from '../stores/useCategoryStore';

import VideoCarousel from '../components/VideoCarousel';
import VideoSection from '../components/VideoSection';

const HomePageAuth = () => {
    const { categories, fetchAllCategories } = useCategoryStore();

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);
    
    // Ensure categories is always an array
    const safeCategories = Array.isArray(categories) ? categories : [];
    
    return (
        <div className="nf-page">
            {/* Hero Video Carousel */}
            <VideoCarousel />

            {/* Video Sections by Category */}
            <div className="relative z-10">
                {safeCategories.map(category => (
                    <VideoSection 
                        key={category.id} 
                        cid={category.id} 
                        name={category.name} 
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePageAuth

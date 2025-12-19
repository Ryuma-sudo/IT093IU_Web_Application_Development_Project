import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import { useVideoStore } from "../stores/useVideoStore";

import CreateVideoForm from "../components/CreateVideoForm";
import VideoList from "../components/VideoList";
import OptimizedImage from '../components/OptimizedImage';
import { PlusCircleIcon, FilmIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const tabs = [
    { id: "create", label: "Create Video", icon: PlusCircleIcon },
    { id: "videos", label: "Manage Videos", icon: FilmIcon },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const { fetchAllVideos } = useVideoStore();

    useEffect(() => {
        fetchAllVideos();
    }, [fetchAllVideos]);

    return (
        <div className="nf-page min-h-screen relative">
            {/* Background */}
            <div className="fixed inset-0 nf-hero-bg">
                <OptimizedImage
                    src="/assets/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-nf-accent/10 mb-4">
                        <Cog6ToothIcon className="w-8 h-8 text-nf-accent" />
                    </div>
                    <h1 className="text-4xl font-bold text-nf-text mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-nf-text-secondary">
                        Manage your video content and settings
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="inline-flex p-1.5 rounded-xl bg-nf-surface border border-nf-border">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                                    activeTab === tab.id
                                        ? "bg-nf-accent text-nf-bg"
                                        : "text-nf-text-secondary hover:text-nf-text hover:bg-nf-surface-hover"
                                }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "create" && <CreateVideoForm />}
                    {activeTab === "videos" && <VideoList />}
                </motion.div>
            </div>
        </div>
    )
}

export default AdminPage

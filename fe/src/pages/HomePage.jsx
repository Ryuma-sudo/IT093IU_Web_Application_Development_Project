import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRightIcon, PlayIcon, SparklesIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';
import OptimizedImage from '../components/OptimizedImage';

const features = [
    {
        icon: SparklesIcon,
        name: 'Unlimited Entertainment',
        description: 'Access thousands of movies, series, and exclusive content anytime you want.'
    },
    {
        icon: ShieldCheckIcon,
        name: 'Safe for Everyone',
        description: 'Family-friendly profiles with parental controls to keep kids safe.'
    },
    {
        icon: DevicePhoneMobileIcon,
        name: 'Watch Anywhere',
        description: 'Stream on your phone, tablet, laptop, or TV. Your content follows you.'
    }
];

const HomePage = () => {
    const [email, setEmail] = useState('');

    return (
        <div className="nf-page">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center">
                {/* Background */}
                <div className="fixed inset-0">
                    <OptimizedImage
                        src="/assets/background.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-nf-bg via-nf-bg/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-nf-bg via-transparent to-nf-bg/60" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nf-accent/10 border border-nf-accent/20 mb-8">
                            <SparklesIcon className="w-4 h-4 text-nf-accent" />
                            <span className="text-sm font-medium text-nf-accent">Start streaming today</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-nf-text mb-6 leading-[1.1]">
                            Movies, series, and more.{' '}
                            <span className="nf-text-gradient">Unlimited.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-nf-text-secondary mb-10 max-w-lg">
                            Watch anywhere. Cancel anytime. Join millions of viewers discovering their next favorite story.
                        </p>

                        {/* CTA Section */}
                        <div className="space-y-4">
                            <p className="text-nf-text-secondary">
                                Ready to start? Enter your email to create an account.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="nf-input flex-1"
                                />
                                <Link 
                                    to={`/signup?email=${encodeURIComponent(email)}`}
                                    className="nf-btn nf-btn-primary whitespace-nowrap"
                                >
                                    Get Started
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 pt-8 border-t border-nf-border">
                            <div>
                                <div className="text-3xl font-bold text-nf-text">10K+</div>
                                <div className="text-sm text-nf-text-muted">Movies & Shows</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-nf-text">4K</div>
                                <div className="text-sm text-nf-text-muted">Ultra HD Quality</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-nf-text">∞</div>
                                <div className="text-sm text-nf-text-muted">No Ads</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-gentle">
                    <div className="w-6 h-10 rounded-full border-2 border-nf-text-muted flex items-start justify-center p-2">
                        <div className="w-1 h-2 rounded-full bg-nf-text-muted animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="relative z-10 bg-nf-bg py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-nf-text mb-4">
                            Why choose NexFlixx?
                        </h2>
                        <p className="text-lg text-nf-text-secondary max-w-2xl mx-auto">
                            Everything you need for the ultimate streaming experience
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="nf-card-static p-8 text-center group hover:border-nf-accent/30 transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-nf-accent/10 mb-6 group-hover:bg-nf-accent/20 transition-colors">
                                    <feature.icon className="w-7 h-7 text-nf-accent" />
                                </div>
                                <h3 className="text-xl font-semibold text-nf-text mb-3">
                                    {feature.name}
                                </h3>
                                <p className="text-nf-text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 bg-nf-surface py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nf-accent/10 mb-6">
                        <PlayIcon className="w-8 h-8 text-nf-accent" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-nf-text mb-4">
                        Ready to start watching?
                    </h2>
                    <p className="text-lg text-nf-text-secondary mb-8 max-w-lg mx-auto">
                        Create your account in seconds and start exploring our library
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="nf-btn nf-btn-primary text-lg px-8 py-3">
                            Create Free Account
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="nf-btn nf-btn-ghost text-lg px-8 py-3">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage

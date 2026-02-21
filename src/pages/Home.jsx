import React from 'react';
import Hero from '../components/Hero';
import AITravelPlanner from '../components/AITravelPlanner';
import Features from '../components/Features';
import FeaturedTours from '../components/FeaturedTours';

export default function Home() {
    return (
        <>
            <div id="beranda">
                <Hero />
            </div>
            <div id="ai-planner">
                <AITravelPlanner />
            </div>
            <div id="features">
                <Features />
            </div>
            <div id="paket-wisata">
                <FeaturedTours />
            </div>
        </>
    );
}

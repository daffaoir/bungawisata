import React from 'react';
import Hero from '../components/Hero';
import AITravelPlanner from '../components/AITravelPlanner';
import Features from '../components/Features';
import FeaturedTours from '../components/FeaturedTours';

export default function Home() {
    return (
        <>
            <Hero />
            <AITravelPlanner />
            <Features />
            <FeaturedTours />
        </>
    );
}

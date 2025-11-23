'use client';
import React, { useEffect, useState } from 'react';

const WelcomeOverlay = () => {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Check if user has seen the welcome animation
        const hasSeen = localStorage.getItem('hasSeenWelcome_v1');
        if (!hasSeen) {
            setShow(true);
            // Sequence of animations
            setTimeout(() => setStep(1), 500); // Show Logo
            setTimeout(() => setStep(2), 2000); // Show Text
            setTimeout(() => {
                setStep(3); // Fade out
                setTimeout(() => {
                    setShow(false);
                    localStorage.setItem('hasSeenWelcome_v1', 'true');
                }, 1000);
            }, 4000);
        }
    }, []);

    if (!show) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${step === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-75" />

            {/* Logo Animation */}
            <div className={`transform transition-all duration-1000 ${step >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}`}>
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-8 shadow-2xl shadow-primary/30">
                    <span className="text-6xl font-bold text-white">V</span>
                </div>
            </div>

            {/* Text Animation */}
            <div className={`text-center transform transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Vitrin<span className="text-primary">.app</span>
                </h1>
                <p className="text-xl text-gray-400">
                    E-ticaretin en kolay hali.
                </p>
            </div>
        </div>
    );
};

export default WelcomeOverlay;

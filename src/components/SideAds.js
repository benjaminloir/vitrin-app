'use client';
import React from 'react';

const SideAds = () => {
    return (
        <>
            {/* Left Ad */}
            <div className="fixed left-0 top-1/2 -translate-y-1/2 w-[160px] h-[600px] hidden xl:flex flex-col items-center justify-center bg-[#111] border-r border-white/10 z-40">
                <span className="text-xs text-gray-500 mb-2">REKLAM</span>
                <div className="w-[120px] h-[500px] bg-white/5 flex items-center justify-center text-center text-gray-600 text-xs p-2">
                    Google AdSense<br />Dikey Banner<br />(120x600)
                </div>
            </div>

            {/* Right Ad */}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 w-[160px] h-[600px] hidden xl:flex flex-col items-center justify-center bg-[#111] border-l border-white/10 z-40">
                <span className="text-xs text-gray-500 mb-2">REKLAM</span>
                <div className="w-[120px] h-[500px] bg-white/5 flex items-center justify-center text-center text-gray-600 text-xs p-2">
                    Google AdSense<br />Dikey Banner<br />(120x600)
                </div>
            </div>
        </>
    );
};

export default SideAds;

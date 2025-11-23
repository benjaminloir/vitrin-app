import React from 'react';

const AdBanner = () => {
    return (
        <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-[#222] border border-white/10 rounded-lg text-center overflow-hidden">
            <p className="text-xs text-gray-500 mb-2">REKLAM</p>
            {/* Google AdSense Placeholder */}
            <div className="w-full h-24 bg-white/5 flex items-center justify-center text-gray-600 text-sm">
                Google AdSense Alanı (728x90)
            </div>
            <div className="mt-2 text-xs">
                <a href="/pricing/upgrade" className="text-primary hover:underline">Reklamları Kaldır (20₺)</a>
            </div>
        </div>
    );
};

export default AdBanner;

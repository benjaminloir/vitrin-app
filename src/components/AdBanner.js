import React from 'react';
import GoogleAd from './GoogleAd';

const AdBanner = () => {
    return (
        <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-[#222] border border-white/10 rounded-lg text-center overflow-hidden">
            <p className="text-xs text-gray-500 mb-2">REKLAM</p>
            {/* Google AdSense Placeholder */}
            <div className="w-full min-h-[90px] bg-white/5 flex items-center justify-center overflow-hidden">
                {/* Slot ID'yi AdSense panelinden alıp buraya yazacaksın */}
                <GoogleAd slot="1234567890" style={{ display: 'block', width: '100%', height: '90px' }} />
            </div>
            <div className="mt-2 text-xs">
                <a href="/pricing/upgrade" className="text-primary hover:underline">Reklamları Kaldır (20₺)</a>
            </div>
        </div>
    );
};

export default AdBanner;

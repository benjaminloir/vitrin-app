'use client';
import React, { useEffect } from 'react';

const GoogleAd = ({ slot, style, format = 'auto', responsive = 'true' }) => {
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    if (!isMounted) return null;

    return (
        <ins
            className="adsbygoogle"
            style={style || { display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // BURAYI KENDİ ID'NİZLE DEĞİŞTİRİN
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}
        ></ins>
    );
};

export default GoogleAd;

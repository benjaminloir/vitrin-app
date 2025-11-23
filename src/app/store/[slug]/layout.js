import React from 'react';
import Link from 'next/link';

export default async function StoreLayout({ children, params }) {
    const { slug } = await params;
    // In a real app, we would fetch the store name based on slug
    const storeName = "Harun'un Butiği";

    return (
        <div className="min-h-screen bg-black">
            {/* Store Header */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href={`/store/${slug}`} className="text-xl font-bold text-white">
                        {storeName}
                    </Link>
                    <div className="text-sm text-gray-400">
                        WhatsApp ile Sipariş
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}

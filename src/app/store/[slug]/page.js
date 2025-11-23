import React from 'react';
import StoreClient from './StoreClient';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function StorePage({ params }) {
    const { slug } = await params;

    // Mock Data for Examples
    const demoStores = {
        'moda-butik': {
            id: 'demo-1',
            name: 'Moda Butiği',
            slug: 'moda-butik',
            whatsapp_number: '905555555555',
            views: 1205
        },
        'teknoloji': {
            id: 'demo-2',
            name: 'Teknoloji Dünyası',
            slug: 'teknoloji',
            whatsapp_number: '905555555555',
            views: 892
        },
        'ev-yasam': {
            id: 'demo-3',
            name: 'Ev & Yaşam',
            slug: 'ev-yasam',
            whatsapp_number: '905555555555',
            views: 450
        }
    };

    const demoProducts = {
        'demo-1': [
            { id: 'p1', name: 'Yazlık Elbise', price: 450, image: '👗', condition: 'new' },
            { id: 'p2', name: 'Kot Ceket', price: 850, image: '🧥', condition: 'used' },
            { id: 'p3', name: 'Güneş Gözlüğü', price: 250, image: '🕶️', condition: 'new' },
        ],
        'demo-2': [
            { id: 'p4', name: 'Kablosuz Kulaklık', price: 1200, image: '🎧', condition: 'new' },
            { id: 'p5', name: 'Akıllı Saat', price: 2500, image: '⌚', condition: 'new' },
        ],
        'demo-3': [
            { id: 'p6', name: 'Vazo', price: 150, image: '🏺', condition: 'new' },
            { id: 'p7', name: 'Bitki', price: 90, image: '🪴', condition: 'new' },
        ]
    };

    let store = null;
    let products = [];

    if (demoStores[slug]) {
        store = demoStores[slug];
        products = demoProducts[store.id];
    } else {
        // Fetch Real Store
        const { data: storeData } = await supabase
            .from('stores')
            .select('*')
            .eq('slug', slug)
            .single();

        store = storeData;

        if (store) {
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .eq('store_id', store.id)
                .order('created_at', { ascending: false });
            products = productsData || [];
        }
    }

    if (!store) {
        notFound();
    }

    return <StoreClient store={store} products={products} />;
}

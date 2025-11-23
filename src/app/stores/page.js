'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function StoresPage() {
    const { t } = useLanguage();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            // Fetch all stores (in a real app, you might want to filter by 'public' or similar)
            const { data, error } = await supabase
                .from('stores')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) {
                setStores(data || []);
            }
            setLoading(false);
        };

        fetchStores();
    }, []);

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Tüm Mağazalar</h1>
                <p className="text-gray-400">Vitrin ile oluşturulmuş gerçek mağazaları keşfedin.</p>
            </div>

            {loading ? (
                <div className="text-center text-gray-400">{t('common.loading')}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stores.map((store) => (
                        <Card key={store.id} className="hover:border-primary/50 transition-colors group">
                            <div className="text-4xl mb-4 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                🏪
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 justify-center">
                                {store.name}
                                {store.verified && (
                                    <span className="text-blue-400 text-base" title="Onaylı Mağaza">✓</span>
                                )}
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                {store.views} Görüntülenme
                            </p>
                            <Link href={`/store/${store.slug}`}>
                                <Button variant="secondary" className="w-full">Mağazayı İncele</Button>
                            </Link>
                        </Card>
                    ))}

                    {stores.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            Henüz hiç mağaza açılmamış. İlk mağazayı sen aç!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

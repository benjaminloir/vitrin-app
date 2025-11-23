'use client';
import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ExamplesPage() {
    const examples = [
        {
            name: "Moda Butiği",
            slug: "moda-butik",
            image: "👗",
            desc: "Kadın giyim ve aksesuar mağazası örneği."
        },
        {
            name: "Teknoloji Dünyası",
            slug: "teknoloji",
            image: "🎧",
            desc: "Elektronik ve gadget ürünleri."
        },
        {
            name: "Ev & Yaşam",
            slug: "ev-yasam",
            image: "🪴",
            desc: "Dekorasyon ve ev gereçleri."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Örnek Mağazalar</h1>
                <p className="text-gray-400">Vitrin ile oluşturulmuş mağazaları keşfedin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {examples.map((ex, i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors">
                        <div className="text-4xl mb-4 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
                            {ex.image}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{ex.name}</h3>
                        <p className="text-gray-400 mb-6">{ex.desc}</p>
                        {/* Note: In a real app, these would link to real stores. For now, we link to a demo or 404 if not exists, but at least the page works. */}
                        <Link href={`/store/${ex.slug}`}>
                            <Button variant="secondary" className="w-full">Mağazayı İncele</Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}

'use client';
import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Hakkımızda</h1>

            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Biz Kimiz?</h2>
                    <p>
                        Vitrin, 2025 yılında kurulan, küçük işletmelerin ve bireysel satıcıların dijital dünyada kolayca yer almasını sağlayan yeni nesil bir e-ticaret platformudur.
                        Karmaşık altyapılar, yüksek komisyonlar ve teknik bilgi gerektiren süreçleri ortadan kaldırarak, herkesin dakikalar içinde satışa başlamasını hedefliyoruz.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Misyonumuz</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>E-ticareti herkes için erişilebilir kılmak.</li>
                        <li>WhatsApp tabanlı hızlı ve samimi bir alışveriş deneyimi sunmak.</li>
                        <li>Küçük işletmelerin büyümesine teknolojik destek sağlamak.</li>
                        <li>Güvenilir ve şeffaf bir ticaret ortamı oluşturmak.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h2>
                    <p>
                        Türkiye'nin ve dünyanın en çok tercih edilen, en kullanıcı dostu sosyal ticaret altyapısı olmak.
                        Sadece bir yazılım değil, girişimcilerin yol arkadaşı olmayı amaçlıyoruz.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Değerlerimiz</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-bold text-primary mb-2">Basitlik</h3>
                            <p className="text-sm">Karmaşadan uzak, anlaşılır çözümler.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-bold text-primary mb-2">Hız</h3>
                            <p className="text-sm">Zamanın değerini biliyoruz.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-bold text-primary mb-2">Güven</h3>
                            <p className="text-sm">Şeffaf ve dürüst iletişim.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="font-bold text-primary mb-2">İnovasyon</h3>
                            <p className="text-sm">Sürekli gelişim ve yenilik.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function FeaturesPage() {
    const features = [
        {
            icon: '⚡',
            title: 'Işık Hızında Kurulum',
            desc: 'Teknik bilgi gerekmez. Sadece ürün fotoğraflarını yükle, fiyatını yaz ve satışa başla.'
        },
        {
            icon: '💬',
            title: 'WhatsApp Entegrasyonu',
            desc: 'Müşteriler siparişi tamamladığında size hazır bir WhatsApp mesajı gelir. Karışıklık olmaz.'
        },
        {
            icon: '🎨',
            title: 'Premium Tasarım',
            desc: 'Müşterilerinize güven veren, modern ve şık bir mağaza görünümü. Özelleştirilebilir renkler.'
        },
        {
            icon: '📱',
            title: '%100 Mobil Uyumlu',
            desc: 'Mağazanız telefon, tablet ve bilgisayarlarda kusursuz görünür.'
        },
        {
            icon: '📊',
            title: 'Detaylı İstatistikler',
            desc: 'Hangi ürün kaç kere görüntülendi, kaç sipariş aldınız hepsini panelden takip edin.'
        },
        {
            icon: '🔗',
            title: 'Kendi Alan Adınız',
            desc: 'Pro planda kendi domaininizi (ornek.com) bağlayabilirsiniz.'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Tüm Özellikler
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    İşinizi büyütmek için ihtiyacınız olan her şey Vitrin'de.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {features.map((feature, idx) => (
                    <Card key={idx} hover className="h-full">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </Card>
                ))}
            </div>

            {/* CTA Section */}
            <div className="glass-card p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl -z-10" />
                <h2 className="text-3xl font-bold mb-6">Hemen Başlamaya Hazır mısın?</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                    Kredi kartı gerekmez. 5 ürüne kadar tamamen ücretsiz.
                </p>
                <Button size="lg">Ücretsiz Mağaza Aç</Button>
            </div>
        </div>
    );
}

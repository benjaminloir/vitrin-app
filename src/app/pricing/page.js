import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PricingPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Basit ve Şeffaf Fiyatlandırma
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    İster yeni başlıyor olun, ister işinizi büyütüyor olun. Size uygun bir planımız var.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                {/* Free Plan */}
                <Card className="relative overflow-hidden flex flex-col">
                    <div className="p-8 flex-1">
                        <h3 className="text-2xl font-bold mb-2">Başlangıç</h3>
                        <div className="text-4xl font-bold mb-6">Ücretsiz</div>
                        <p className="text-gray-400 mb-8">Yeni başlayan butikler ve hobi satıcıları için ideal.</p>

                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> 5 Ürün Limiti
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> Temel İstatistikler
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400">✓</span> WhatsApp Sipariş Modülü
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-gray-500">✕</span> Vitrin Logosu Görünür
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 pt-0 mt-auto">
                        <Button variant="secondary" className="w-full">Hemen Başla</Button>
                    </div>
                </Card>

                {/* Pro Plan */}
                <Card className="relative overflow-hidden border-primary/50 flex flex-col">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        POPÜLER
                    </div>
                    <div className="p-8 flex-1">
                        <h3 className="text-2xl font-bold mb-2">Pro Mağaza</h3>
                        <div className="text-4xl font-bold mb-6">
                            99₺ <span className="text-lg text-gray-500 font-normal">/ay</span>
                        </div>
                        <p className="text-gray-400 mb-8">Ciddi satış yapan ve markalaşmak isteyenler için.</p>

                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> <strong>Sınırsız</strong> Ürün
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Detaylı Ziyaretçi Analizi
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Kendi Domainini Bağla
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Vitrin Logosunu Kaldır
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Öncelikli Destek
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 pt-0 mt-auto">
                        <Button className="w-full">Pro'ya Geç</Button>
                    </div>
                </Card>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Sıkça Sorulan Sorular</h2>
                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold text-lg mb-2">Komisyon alıyor musunuz?</h3>
                        <p className="text-gray-400">Hayır, satışlarınızdan hiçbir komisyon almıyoruz. Ödemeyi müşterinizden doğrudan (IBAN, Kapıda Ödeme vb.) siz alırsınız.</p>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-lg mb-2">İstediğim zaman iptal edebilir miyim?</h3>
                        <p className="text-gray-400">Evet, Pro üyeliğinizi dilediğiniz zaman iptal edebilirsiniz. Taahhüt yoktur.</p>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-lg mb-2">Domain bağlama nasıl oluyor?</h3>
                        <p className="text-gray-400">Kendi alan adınız (örn: butikadim.com) varsa, DNS ayarlarını yaparak mağazanıza yönlendirebilirsiniz. Yardımcı oluyoruz.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

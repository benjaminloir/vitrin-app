'use client';
import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('pro'); // 'pro' or 'ads'

    const plans = {
        ads: {
            id: 'ads',
            name: 'Reklamları Kaldır',
            price: 20,
            desc: 'Sadece reklamları kaldırır, diğer özellikler standart kalır.'
        },
        pro: {
            id: 'pro',
            name: 'Pro Mağaza',
            price: 99,
            desc: 'Tüm özellikler + Reklam kaldırma + Sınırsız ürün.'
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder for PayTR integration
        setTimeout(() => {
            alert(`Ödeme sistemi şu anda bakımda. (${plans[selectedPlan].price}₺) Lütfen daha sonra tekrar deneyiniz.`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
            <Card className="max-w-2xl w-full p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Paket Seçimi</h1>
                    <p className="text-gray-400">İhtiyacınıza uygun paketi seçin.</p>
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div
                        onClick={() => setSelectedPlan('ads')}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedPlan === 'ads' ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Reklamları Kaldır</h3>
                            <span className="text-xl font-bold">20₺</span>
                        </div>
                        <p className="text-xs text-gray-400">Sadece reklamları kaldırır.</p>
                    </div>

                    <div
                        onClick={() => setSelectedPlan('pro')}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedPlan === 'pro' ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Pro Mağaza</h3>
                            <span className="text-xl font-bold">99₺</span>
                        </div>
                        <p className="text-xs text-gray-400">Her şey dahil tam paket.</p>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl mb-8 flex items-center justify-between border border-white/10">
                    <div>
                        <h3 className="font-bold text-white">Seçilen Paket: {plans[selectedPlan].name}</h3>
                        <p className="text-sm text-gray-400">{plans[selectedPlan].desc}</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">{plans[selectedPlan].price}₺</div>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Kart Sahibi</label>
                        <Input placeholder="Ad Soyad" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Kart Numarası</label>
                        <Input placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <label className="text-sm text-gray-400">Son Kullanma</label>
                            <Input placeholder="AA/YY" required />
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="text-sm text-gray-400">CVC</label>
                            <Input placeholder="123" required />
                        </div>
                    </div>

                    <Button className="w-full mt-4" disabled={loading}>
                        {loading ? 'İşleniyor...' : `Ödemeyi Tamamla (${plans[selectedPlan].price}₺)`}
                    </Button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-6">
                    Ödeme altyapısı güvenli bir şekilde PayTR tarafından sağlanmaktadır.
                </p>
            </Card>
        </div>
    );
}

'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        whatsapp: ''
    });

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push('/login');
            setUser(user);
        };
        getUser();
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSlugChange = (e) => {
        // Auto-format slug: lowercase, no spaces, only alphanumeric and hyphens
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        setFormData({ ...formData, slug: val });
    };

    const handleWhatsappChange = (e) => {
        // Allow only numbers
        const val = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, whatsapp: val });
    };

    const createStore = async () => {
        setLoading(true);
        try {
            // Format: Ensure it starts with 90, remove leading 0 if present
            let finalNumber = formData.whatsapp;
            if (finalNumber.startsWith('0')) finalNumber = finalNumber.substring(1);
            if (!finalNumber.startsWith('90')) finalNumber = '90' + finalNumber;

            const { error } = await supabase
                .from('stores')
                .insert({
                    id: user.id, // Link store to user
                    name: formData.name,
                    slug: formData.slug,
                    whatsapp_number: finalNumber
                });

            if (error) throw error;

            setStep(3); // Success step
        } catch (error) {
            alert('Hata: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-white/10'}`} />
                </div>

                <Card className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-float">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-2">Mağazana İsim Ver</h1>
                                <p className="text-gray-400">Müşterilerin seni bu isimle tanıyacak.</p>
                            </div>

                            <Input
                                label="Mağaza Adı"
                                name="name"
                                placeholder="Örn: Harun'un Butiği"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <Input
                                label="Mağaza Linki"
                                name="slug"
                                placeholder="vitrin.app/magaza-adi"
                                prefix="vitrin.app/"
                                value={formData.slug}
                                onChange={handleSlugChange}
                            />

                            <Button className="w-full" onClick={() => setStep(2)} disabled={!formData.name || !formData.slug}>
                                Devam Et
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-float">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-2">WhatsApp Numarası</h1>
                                <p className="text-gray-400">Siparişlerin geleceği numarayı gir.</p>
                            </div>

                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium border-r border-white/10 pr-3">
                                    +90
                                </span>
                                <Input
                                    label="Telefon Numarası"
                                    name="whatsapp"
                                    placeholder="555 123 45 67"
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={handleWhatsappChange}
                                    className="pl-20" // Make space for prefix
                                    helperText="Başında 0 olmadan giriniz."
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                                    Geri
                                </Button>
                                <Button className="flex-1" onClick={createStore} disabled={loading || !formData.whatsapp}>
                                    {loading ? 'Oluşturuluyor...' : 'Tamamla'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6 animate-float">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto">
                                ✓
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold mb-2">Mağazan Hazır! 🎉</h1>
                                <p className="text-gray-400">Artık ürün eklemeye başlayabilirsin.</p>
                            </div>

                            <Link href="/dashboard">
                                <Button className="w-full" size="lg">
                                    Panele Git
                                </Button>
                            </Link>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

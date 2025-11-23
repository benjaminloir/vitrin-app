'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                },
            });

            if (error) throw error;

            // Success! Show verification message
            setError('success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Mağazanızı Oluşturun</h1>
                    <p className="text-gray-400">30 saniyede satışa başlayın.</p>
                </div>

                <Card className="p-8">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <h2 className="text-xl font-bold mb-2">Hesap Oluşturuluyor...</h2>
                            <p className="text-gray-400">Lütfen bekleyin.</p>
                        </div>
                    ) : error === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                                ✉️
                            </div>
                            <h2 className="text-2xl font-bold mb-4">E-posta Adresinizi Doğrulayın</h2>
                            <p className="text-gray-300 mb-6">
                                <strong>{formData.email}</strong> adresine bir doğrulama bağlantısı gönderdik.
                                Lütfen gelen kutunuzu kontrol edin ve hesabınızı onaylayın.
                            </p>
                            <Link href="/login">
                                <Button className="w-full">Giriş Yap</Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <Input
                                label="Ad Soyad"
                                name="fullName"
                                type="text"
                                placeholder="Adınız Soyadınız"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="E-posta Adresi"
                                name="email"
                                type="email"
                                placeholder="ornek@mail.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Şifre"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />

                            <div className="text-xs text-gray-500">
                                Kayıt olarak <Link href="/terms" className="text-gray-400 underline">Kullanım Koşulları</Link>'nı kabul etmiş olursunuz.
                            </div>

                            <Button className="w-full" size="lg" disabled={loading}>
                                Hesap Oluştur
                            </Button>
                        </form>
                    )}

                    {!loading && error !== 'success' && (
                        <div className="mt-6 text-center text-sm text-gray-400">
                            Zaten hesabınız var mı?{' '}
                            <Link href="/login" className="text-white font-medium hover:text-primary transition-colors">
                                Giriş yapın
                            </Link>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

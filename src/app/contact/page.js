'use client';
import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">İletişim</h1>
            <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">
                Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçmekten çekinmeyin.
                Ekibimiz en kısa sürede size dönüş yapacaktır.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                        <h3 className="font-bold text-xl mb-2 text-primary">E-posta</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Genel sorular ve destek talepleri için:
                        </p>
                        <a href="mailto:destek@vitrin.app" className="text-white font-medium hover:underline text-lg">
                            destek@vitrin.app
                        </a>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                        <h3 className="font-bold text-xl mb-2 text-primary">Sosyal Medya</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Bizi sosyal medyadan takip edin ve güncellemelerden haberdar olun.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a href="https://instagram.com/harun.cl27" target="_blank" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                                <span className="text-2xl">📸</span> Instagram
                            </a>
                            <a href="https://x.com/ank4ldr" target="_blank" className="flex items-center gap-3 text-white hover:text-primary transition-colors">
                                <span className="text-2xl">🐦</span> X (Twitter)
                            </a>
                        </div>
                    </div>


                </div>

                {/* Contact Form */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-6">Bize Yazın</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Adınız</label>
                                <Input placeholder="Ad" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Soyadınız</label>
                                <Input placeholder="Soyad" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">E-posta Adresiniz</label>
                            <Input type="email" placeholder="ornek@mail.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Konu</label>
                            <select className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none">
                                <option>Genel Soru</option>
                                <option>Teknik Destek</option>
                                <option>Ödeme Sorunu</option>
                                <option>İş Birliği</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Mesajınız</label>
                            <textarea
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none min-h-[120px]"
                                placeholder="Mesajınızı buraya yazın..."
                            ></textarea>
                        </div>

                        <Button className="w-full py-3">Gönder</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

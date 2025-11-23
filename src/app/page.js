'use client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Direct supabase check for now if Context isn't ready
import { useEffect, useState } from 'react';

import WelcomeOverlay from '@/components/WelcomeOverlay';

export default function Home() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <WelcomeOverlay />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] -z-10" />

        <div className="container mx-auto px-4 text-center z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass border border-white/10 text-sm text-primary-300 font-medium">
            {t('hero.tagline')}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')} <br />
            <span className="text-gradient">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full md:w-auto">
                  {t('dashboard.viewStore')} (Dashboard)
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="w-full md:w-auto">
                  {t('hero.ctaPrimary')}
                </Button>
              </Link>
            )}
            <Link href="/examples">
              <Button variant="secondary" size="lg" className="w-full md:w-auto">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Hero Image / Mockup Placeholder */}
          <div className="mt-16 relative mx-auto max-w-4xl">
            <div className="glass-card p-4 rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border border-white/5">
                <p className="text-gray-500">{t('hero.mockupText')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-gray-400">{t('features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hover className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.fast.title')}</h3>
            <p className="text-gray-400">
              {t('features.fast.desc')}
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
              💬
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.whatsapp.title')}</h3>
            <p className="text-gray-400">
              {t('features.whatsapp.desc')}
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
              🎨
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('features.design.title')}</h3>
            <p className="text-gray-400">
              {t('features.design.desc')}
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-gray-400">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="relative overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{t('pricing.free.title')}</h3>
              <div className="text-4xl font-bold mb-6">{t('pricing.free.price')}</div>
              <ul className="space-y-4 mb-8 text-gray-300">
                {t('pricing.free.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">✓ {feature}</li>
                ))}
              </ul>
              {user ? (
                <Link href="/dashboard">
                  <Button variant="secondary" className="w-full" disabled>Mevcut Paket</Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button variant="secondary" className="w-full">{t('pricing.free.cta')}</Button>
                </Link>
              )}
            </div>
          </Card>

          {/* Ad-Free Plan (New) */}
          <Card className="relative overflow-hidden border-blue-500/30">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPÜLER
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Reklamları Kaldır</h3>
              <div className="text-4xl font-bold mb-6">
                20₺ <span className="text-lg text-gray-500 font-normal">/ay</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center gap-2">✓ 5 Ürün Limiti</li>
                <li className="flex items-center gap-2">✓ Temel İstatistikler</li>
                <li className="flex items-center gap-2 text-blue-400 font-bold">✓ Reklamsız Deneyim</li>
                <li className="flex items-center gap-2">✓ Vitrin Logosu</li>
              </ul>
              <Link href="/pricing/upgrade">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Satın Al</Button>
              </Link>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="relative overflow-hidden border-primary/50">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              {t('pricing.pro.tag')}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{t('pricing.pro.title')}</h3>
              <div className="text-4xl font-bold mb-6">
                {t('pricing.pro.price')} <span className="text-lg text-gray-500 font-normal">{t('pricing.pro.period')}</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                {t('pricing.pro.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">✓ {feature}</li>
                ))}
              </ul>
              <Link href="/pricing/upgrade">
                <Button className="w-full">{t('pricing.pro.cta')}</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

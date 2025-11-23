'use client';
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-black/20 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Vitrin</h3>
                        <p className="text-gray-400 text-sm">
                            {t('footer.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.product')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/features" className="hover:text-primary">{t('navbar.features')}</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary">{t('navbar.pricing')}</Link></li>
                            <li><Link href="/examples" className="hover:text-primary">{t('navbar.examples')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.company')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-primary">{t('footer.about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">{t('footer.contact')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">{t('footer.privacy')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">{t('footer.social')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="https://instagram.com/harun.cl27" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a></li>
                            <li><a href="https://x.com/ank4ldr" target="_blank" rel="noopener noreferrer" className="hover:text-primary">X (Twitter)</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Vitrin. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

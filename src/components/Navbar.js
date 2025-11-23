'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
    const router = useRouter();
    const { t, language, changeLanguage } = useLanguage();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef(null);
    const langRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsDropdownOpen(false);
        router.push('/');
        router.refresh();
    };

    const languages = [
        { code: 'tr', label: '🇹🇷 TR' },
        { code: 'en', label: '🇬🇧 EN' },
        { code: 'es', label: '🇪🇸 ES' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        V
                    </div>
                    Vitrin
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        {t('navbar.features')}
                    </Link>
                    <Link href="/stores" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Mağazalar
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        {t('navbar.pricing')}
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Selector */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <span>{languages.find(l => l.code === language)?.label}</span>
                        </button>

                        {isLangOpen && (
                            <div className="absolute right-0 top-full mt-2 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            changeLanguage(lang.code);
                                            setIsLangOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${language === lang.code ? 'text-primary font-medium' : 'text-gray-300'}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
                    ) : user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="sm">
                                    {t('navbar.myStore')}
                                </Button>
                            </Link>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
                                >
                                    <span className="text-lg">👤</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-4 py-3 border-b border-white/5">
                                            <p className="text-xs text-gray-400">{t('navbar.loggedIn')}</p>
                                            <p className="text-sm text-white font-medium truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard?tab=settings"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {t('navbar.settings')}
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                        >
                                            {t('navbar.logout')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white hidden md:block">
                                {t('navbar.login')}
                            </Link>
                            <Link href="/register">
                                <Button size="sm">
                                    {t('navbar.createStore')}
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

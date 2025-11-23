'use client';
import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function DashboardPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    // New Product State
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '📦', condition: 'new' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Fetch Store
            const { data: storeData, error: storeError } = await supabase
                .from('stores')
                .select('*')
                .eq('id', user.id)
                .single();

            if (storeError || !storeData) {
                // No store found, redirect to onboarding
                router.push('/onboarding');
                return;
            }

            setStore(storeData);

            // Fetch Products
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .eq('store_id', storeData.id)
                .order('created_at', { ascending: false });

            setProducts(productsData || []);
            setLoading(false);
        };

        fetchData();
    }, [router]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsAdding(true);

        try {
            const { data, error } = await supabase
                .from('products')
                .insert({
                    store_id: store.id,
                    name: newProduct.name,
                    price: parseFloat(newProduct.price),
                    image: newProduct.image,
                    condition: newProduct.condition
                })
                .select()
                .single();

            if (error) throw error;

            setProducts([data, ...products]);
            setNewProduct({ name: '', price: '', image: '📦', condition: 'new' });
            alert(t('dashboard.products.alertAdded'));
        } catch (error) {
            alert(t('common.error') + ': ' + error.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm(t('dashboard.products.confirmDelete'))) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            alert(t('common.error') + ': ' + error.message);
        }
    };

    // Calculate total clicks (orders)
    const totalOrders = products.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

    if (loading) return <div className="text-center py-20">{t('common.loading')}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">{t('dashboard.welcome')}, {store?.name} 👋</h1>
                    <p className="text-gray-400">{t('dashboard.manageStore')}</p>
                </div>
                <div className="flex gap-3">
                    <Link href={`/store/${store?.slug}`} target="_blank">
                        <Button variant="secondary">{t('dashboard.viewStore')} ↗</Button>
                    </Link>
                    <Button onClick={() => setActiveTab('products')}>{t('dashboard.addProduct')}</Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
                {['overview', 'products', 'settings'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-2 capitalize transition-colors ${activeTab === tab
                            ? 'text-primary border-b-2 border-primary font-medium'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {t(`dashboard.tabs.${tab}`)}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <h3 className="text-gray-400 mb-2">{t('dashboard.stats.totalProducts')}</h3>
                        <p className="text-3xl font-bold">{products.length}</p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-400 mb-2">{t('dashboard.stats.views')}</h3>
                        <p className="text-3xl font-bold">{store?.views || 0}</p>
                    </Card>
                    <Card>
                        <h3 className="text-gray-400 mb-2">{t('dashboard.stats.orders')}</h3>
                        <p className="text-3xl font-bold">{totalOrders}</p>
                    </Card>
                </div>
            )}

            {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Product Form */}
                    <Card className="h-fit">
                        <h3 className="font-bold text-lg mb-4">{t('dashboard.products.title')}</h3>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <Input
                                label={t('dashboard.products.nameLabel')}
                                placeholder={t('dashboard.products.namePlaceholder')}
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                            <Input
                                label={t('dashboard.products.priceLabel')}
                                type="number"
                                placeholder="0.00"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                required
                            />

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('dashboard.products.conditionLabel')}</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    value={newProduct.condition}
                                    onChange={e => setNewProduct({ ...newProduct, condition: e.target.value })}
                                >
                                    <option value="new">{t('common.new')}</option>
                                    <option value="used">{t('common.used')}</option>
                                </select>
                            </div>

                            <Input
                                label={t('dashboard.products.imageLabel')}
                                placeholder={t('dashboard.products.imagePlaceholder')}
                                value={newProduct.image}
                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                helperText={t('dashboard.products.imageHelper')}
                            />

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('dashboard.products.emojiLabel')}</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['👕', '👖', '👗', '👟', '🧢', '👜', '👓', '💍', '📦', '🔥'].map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setNewProduct({ ...newProduct, image: emoji })}
                                            className={`p-2 rounded bg-white/5 hover:bg-white/10 ${newProduct.image === emoji ? 'ring-2 ring-primary' : ''}`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full" disabled={isAdding}>
                                {isAdding ? t('dashboard.products.adding') : t('dashboard.products.addButton')}
                            </Button>
                        </form>
                    </Card>

                    {/* Product List */}
                    <div className="lg:col-span-2 space-y-4">
                        {products.map(product => (
                            <div key={product.id} className="glass-card p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-2xl overflow-hidden relative">
                                        {product.image.startsWith('http') ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            product.image
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{product.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <p className="text-primary font-medium">{product.price}₺</p>
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">
                                                {product.condition === 'new' ? t('common.new') : t('common.used')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteProduct(product.id)}>
                                        {t('common.delete')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                {t('dashboard.products.empty')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'settings' && (
                <Card className="max-w-xl">
                    <h3 className="font-bold text-lg mb-6">{t('dashboard.settings.title')}</h3>
                    <div className="space-y-4">
                        <Input label={t('dashboard.settings.storeName')} value={store?.name} readOnly />
                        <Input label={t('dashboard.settings.whatsapp')} value={store?.whatsapp_number} readOnly />

                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mt-6">
                            <h4 className="font-bold text-blue-400 mb-2">{t('dashboard.settings.supportTitle')}</h4>
                            <p className="text-sm text-gray-300 mb-2">
                                {t('dashboard.settings.supportText')}
                            </p>
                            <a href="mailto:destek@vitrin.app" className="text-white font-medium hover:underline">
                                destek@vitrin.app
                            </a>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

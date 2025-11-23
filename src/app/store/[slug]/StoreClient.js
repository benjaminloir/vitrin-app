'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AdBanner from '@/components/AdBanner';

export default function StoreClient({ store, products }) {
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Confirmation Modal State
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [lastAddedProduct, setLastAddedProduct] = useState(null);

    useEffect(() => {
        // Increment Store Views (Only for real stores)
        if (!store.id.startsWith('demo')) {
            const incrementView = async () => {
                await supabase.rpc('increment_store_views', { store_id: store.id });
            };
            incrementView();
        }
    }, [store.id]);

    const addToCart = async (product, openConfirm = true) => {
        setCart(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));

        // Track product click (Only for real stores)
        if (!store.id.startsWith('demo')) {
            await supabase.rpc('increment_product_clicks', { product_id: product.id });
        }

        if (openConfirm) {
            setLastAddedProduct(product);
            setShowConfirmModal(true);
        }
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId]--;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
        const product = products.find(p => p.id === id);
        return total + (product?.price || 0) * qty;
    }, 0);

    // Clean up cart (remove deleted products)
    useEffect(() => {
        setCart(prev => {
            const newCart = { ...prev };
            let changed = false;
            Object.keys(newCart).forEach(id => {
                if (!products.find(p => p.id === id)) {
                    delete newCart[id];
                    changed = true;
                }
            });

            // If changed, update localStorage immediately to fix persistence issue
            if (changed) {
                localStorage.setItem(`cart_${store.id}`, JSON.stringify(newCart));
                return newCart;
            }
            return prev;
        });
    }, [products, store.id]);

    const handleCheckout = () => {
        const validItems = Object.entries(cart).filter(([id]) => products.find(p => p.id === id));

        if (validItems.length === 0) {
            alert('Sepetinizdeki ürünler mağaza sahibi tarafından silinmiş veya güncellenmiş olabilir.');
            return;
        }

        const message = `Merhaba, ${store.name} mağazanızdan sipariş vermek istiyorum:%0A%0A` +
            validItems.map(([id, qty]) => {
                const product = products.find(p => p.id === id);
                return `- ${product.name} (${qty} Adet) - ${product.price * qty}₺`;
            }).join('%0A') +
            `%0A%0AToplam Tutar: *${totalPrice}₺*`;

        window.open(`https://wa.me/${store.whatsapp_number}?text=${message}`, '_blank');
    };

    // Load cart from localStorage on mount AND filter invalid items immediately
    useEffect(() => {
        const savedCart = localStorage.getItem(`cart_${store.id}`);
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Filter out items that don't exist in the current products list
            const validCart = {};
            Object.keys(parsedCart).forEach(id => {
                if (products.find(p => p.id === id)) {
                    validCart[id] = parsedCart[id];
                }
            });

            // If items were removed, update localStorage immediately
            if (Object.keys(validCart).length !== Object.keys(parsedCart).length) {
                localStorage.setItem(`cart_${store.id}`, JSON.stringify(validCart));
            }

            setCart(validCart);
        }
    }, [store.id, products]);

    // Save cart to localStorage on change
    useEffect(() => {
        if (Object.keys(cart).length > 0) {
            localStorage.setItem(`cart_${store.id}`, JSON.stringify(cart));
        } else {
            // If cart is empty, remove from local storage to be clean
            localStorage.removeItem(`cart_${store.id}`);
        }
    }, [cart, store.id]);

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-20 relative">
            {/* Top Right Cart Button (Always Visible) */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed top-4 right-4 z-40 bg-black border border-white/20 p-3 rounded-full hover:bg-white/10 transition-colors shadow-lg shadow-black/50"
            >
                <div className="relative">
                    <span className="text-2xl">🛒</span>
                    {totalItems > 0 && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#050505]">
                            {totalItems}
                        </div>
                    )}
                </div>
            </button>

            {/* Store Header */}
            <header className="bg-gradient-to-b from-primary/20 to-transparent border-b border-white/10 pt-12 pb-8 px-4 text-center">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl mb-4 border border-white/20">
                    🏪
                </div>
                <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                    {store.name}
                    {store.verified && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                            ✓ Onaylı
                        </span>
                    )}
                </h1>
                <p className="text-gray-400 text-sm">WhatsApp üzerinden güvenle sipariş verin.</p>
            </header>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map(product => (
                        <Card key={product.id} className="overflow-hidden group">
                            <div className="aspect-square bg-white/5 flex items-center justify-center text-6xl relative group-hover:scale-105 transition-transform duration-300">
                                {product.image.startsWith('http') ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    product.image
                                )}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                                    {product.condition === 'new' ? 'Yeni' : '2. El'}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold truncate mb-1">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-primary font-bold">{product.price}₺</p>
                                    <Button size="sm" onClick={() => addToCart(product)} className="rounded-full w-8 h-8 p-0 flex items-center justify-center">
                                        +
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Floating Cart Button (Bottom) */}
            {totalItems > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-between animate-in slide-in-from-bottom-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                {totalItems}
                            </div>
                            <span className="font-medium">Sepeti Gör</span>
                        </div>
                        <span className="font-bold text-lg">{totalPrice}₺</span>
                    </button>
                </div>
            )}

            {/* Add to Cart Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#111] w-full max-w-sm rounded-2xl border border-white/10 p-6 text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            ✓
                        </div>
                        <h3 className="text-xl font-bold mb-2">Ürün Sepete Eklendi</h3>
                        <p className="text-gray-400 mb-6">
                            <span className="text-white font-medium">{lastAddedProduct?.name}</span> sepetinize eklendi. Ne yapmak istersiniz?
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button onClick={() => { setShowConfirmModal(false); setIsCartOpen(true); }}>
                                Sepete Git ve Tamamla
                            </Button>
                            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                                Alışverişe Devam Et
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] w-full max-w-md rounded-2xl border border-white/10 overflow-hidden animate-in slide-in-from-bottom-10">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h3 className="font-bold text-lg">Sepetim ({totalItems})</h3>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                                ✕
                            </button>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
                            {Object.entries(cart).map(([id, qty]) => {
                                const product = products.find(p => p.id === id);
                                if (!product) return null; // Skip if product is deleted
                                return (
                                    <div key={id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                                                {product.image.startsWith('http') ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                                ) : (
                                                    product.image
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{product.name}</h4>
                                                <p className="text-sm text-gray-400">{product.price}₺ x {qty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                                            <button onClick={() => removeFromCart(id)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded">-</button>
                                            <span className="text-sm font-medium">{qty}</span>
                                            <button onClick={() => addToCart(product, false)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded">+</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex justify-between mb-4 text-lg font-bold">
                                <span>Toplam</span>
                                <span>{totalPrice}₺</span>
                            </div>
                            <Button className="w-full py-4 text-lg" onClick={handleCheckout}>
                                WhatsApp ile Sipariş Ver
                            </Button>
                            <p className="text-xs text-gray-500 text-center mt-3">
                                Dikkat: Mağazadan ayrıldığınızda sepetinizdeki ürünler silinebilir.
                            </p>
                        </div>
                    </div>
                </div>
            )}




            {/* Ad Banner (Only visible if not Pro/Ad-Free - Logic to be added later, for now show to all) */}
            <AdBanner />

        </div>
    );
}

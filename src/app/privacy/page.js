'use client';
import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>
            <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                <p className="text-gray-500">Son Güncelleme: 23 Kasım 2025</p>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Giriş</h2>
                    <p>
                        Vitrin ("Biz", "Şirket") olarak, kullanıcılarımızın ("Siz") gizliliğine büyük önem veriyoruz.
                        Bu Gizlilik Politikası, hizmetlerimizi kullanırken kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Toplanan Veriler</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
                        <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası.</li>
                        <li><strong>Mağaza Bilgileri:</strong> Mağaza adı, ürün bilgileri, fiyatlar.</li>
                        <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">3. Verilerin Kullanım Amacı</h2>
                    <p>Toplanan veriler şu amaçlarla kullanılır:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Hizmetlerimizin sağlanması ve iyileştirilmesi.</li>
                        <li>Kullanıcı hesaplarının oluşturulması ve yönetilmesi.</li>
                        <li>Müşteri desteği sağlanması.</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
                        <li>Güvenlik ihlallerinin önlenmesi.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">4. Çerezler (Cookies)</h2>
                    <p>
                        Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz.
                        Çerezler, tarayıcınız tarafından cihazınızda saklanan küçük metin dosyalarıdır.
                        Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">5. Veri Güvenliği</h2>
                    <p>
                        Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri (SSL şifreleme, güvenli sunucular) uyguluyoruz.
                        Ancak, internet üzerinden veri iletiminin %100 güvenli olduğunu garanti edemeyiz.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">6. Üçüncü Taraflarla Paylaşım</h2>
                    <p>
                        Verileriniz, yasal zorunluluklar dışında veya hizmetin sağlanması için gerekli olmadıkça (örn. ödeme altyapısı sağlayıcıları) üçüncü taraflarla paylaşılmaz.
                        Verileriniz asla pazarlama amacıyla satılmaz.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">7. Haklarınız</h2>
                    <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Verilerinizin işlenip işlenmediğini öğrenme.</li>
                        <li>İşlenen veriler hakkında bilgi talep etme.</li>
                        <li>Yanlış verilerin düzeltilmesini isteme.</li>
                        <li>Verilerinizin silinmesini talep etme.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mt-6 mb-2">8. İletişim</h2>
                    <p>
                        Gizlilik politikamızla ilgili sorularınız için <strong>destek@vitrin.app</strong> adresinden bize ulaşabilirsiniz.
                    </p>
                </section>
            </div>
        </div>
    );
}

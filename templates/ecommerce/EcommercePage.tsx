'use client';

import React, { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
} from '../../renderers/react/Navbar';
import { BackToTop } from '../../renderers/react/BackToTop';
import { SearchToolbar } from '../../renderers/react/patterns/SearchToolbar';
import { FilterBar } from '../../renderers/react/patterns/FilterBar';
import { Pagination } from '../../renderers/react/patterns/Pagination';
import { LuxuryProductCard } from '../../renderers/react/patterns/LuxuryProductCard';
import { StoreLocator } from '../../renderers/react/patterns/StoreLocator';
import { VipMembership } from '../../renderers/react/patterns/VipMembership';
import { Icon } from '../../renderers/react/Icon';

export function EcommercePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('qhr-theme', nextTheme);
  };

  const products = [
    {
      id: 'prod-1',
      title: 'خاتم الأفق الذهبي عيار 18',
      collection: 'مجموعة القاهرة الحصرية',
      price: '1,850 ر.س',
      originalPrice: '2,200 ر.س',
      badgeText: 'ستيل 316L مقاوم للصدأ',
      material: 'Steel 316L · مطلي ذهب PVD',
      category: 'rings',
    },
    {
      id: 'prod-2',
      title: 'سوار النيل الملكي المنقوش',
      collection: 'إصدار محدود',
      price: '1,450 ر.س',
      badgeText: 'مقاوم للماء والعطور',
      material: 'Steel 316L · لمسة غير لامعة',
      category: 'bracelets',
    },
    {
      id: 'prod-3',
      title: 'قلادة المشربية الفاطمية',
      collection: 'مجموعة التراث المعاصر',
      price: '2,100 ر.س',
      originalPrice: '2,500 ر.س',
      badgeText: 'صناعة يدوية',
      material: 'Steel 316L · طلاء ذهب عيار 18',
      category: 'necklaces',
    },
    {
      id: 'prod-4',
      title: 'سوار الهيبة الأوبسيدياني',
      collection: 'المجموعة الملكية للرجال',
      price: '1,250 ر.س',
      badgeText: 'حجر أوبسيديان بركاني',
      material: 'Obsidian Steel · لمسة معتمة',
      category: 'bracelets',
    },
    {
      id: 'prod-5',
      title: 'خاتم حورس التاجي المنحوت',
      collection: 'مجموعة الملوك والرموز',
      price: '1,680 ر.س',
      originalPrice: '1,950 ر.س',
      badgeText: 'إصدار ملكي',
      material: 'Steel 316L · مطلي ذهب عيار 18',
      category: 'rings',
    },
    {
      id: 'prod-6',
      title: 'قرط زهرة اللوتس الفاطمية',
      collection: 'مجموعة الزهور المقدسة',
      price: '980 ر.س',
      badgeText: 'طبي لا يتحسس',
      material: 'Steel 316L · وزن فائق الخفة',
      category: 'earrings',
    },
  ];

  const stores = [
    {
      id: 'cairo-flagship',
      city: 'القاهرة',
      name: 'صالة العرض الرئيسية — الزمالك',
      address: 'شارع حسن صبري، الزمالك، القاهرة',
      hours: 'يومياً: 10:00 ص - 10:00 م',
      phone: '+20 2 2736 0000',
      isOpenNow: true,
    },
    {
      id: 'cairo-new-cairo',
      city: 'القاهرة الجديدة',
      name: 'بوتيك التجمع الخامس — 5A',
      address: 'مجمع 5A الفاخر، الطريق الدائري، القاهرة الجديدة',
      hours: 'يومياً: 11:00 ص - 11:00 م',
      phone: '+20 2 2811 5500',
      isOpenNow: true,
    },
    {
      id: 'alex-boutique',
      city: 'الإسكندرية',
      name: 'بوتيك الإسكندرية — كفر عبده',
      address: 'شارع خليل خياط، كفر عبده، الإسكندرية',
      hours: 'يومياً: 12:00 م - 10:00 م',
      phone: '+20 3 545 0000',
      isOpenNow: false,
    },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div 
      className="qhr-ecommerce-page" 
      data-theme={theme}
      style={{
        backgroundColor: 'var(--eco-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--eco-text-primary, var(--qhr-text-primary, #FBF8F3))',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: 'var(--eco-font-body, var(--qhr-font-body, "Cairo", sans-serif))',
        transition: 'background-color var(--qhr-motion-duration-slow, 350ms), color var(--qhr-motion-duration-slow, 350ms)',
      }}
    >
      {/* 1. Navbar */}
      <Navbar>
        <NavbarBrand href="#catalog">
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '36px', 
            height: '36px', 
            borderRadius: 'var(--qhr-radius-md, 10px)', 
            backgroundColor: 'var(--eco-accent, var(--qhr-color-primary, #D4AF37))', 
            color: 'var(--eco-accent-fg, #0A0806)', 
            fontWeight: 800,
            fontFamily: 'var(--eco-font-display, "El Messiri", serif)',
            fontSize: '18px',
          }}>
            ق
          </span>
          <span style={{ 
            marginInlineStart: 'var(--qhr-space-3, 12px)', 
            fontFamily: 'var(--eco-font-display, var(--qhr-font-heading, "El Messiri", serif))', 
            fontSize: '18px', 
            fontWeight: 700 
          }}>
            قاهرة للمقتنيات الفاخرة
          </span>
        </NavbarBrand>

        <NavbarLinks>
          <NavbarLink href="#catalog" active>كافة المقتنيات</NavbarLink>
          <NavbarLink href="#stores">صالات العرض</NavbarLink>
          <NavbarLink href="#vip">نادي الصفوة VIP</NavbarLink>
        </NavbarLinks>

        <NavbarActions>
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'التحويل إلى النمط النهاري' : 'التحويل إلى النمط الداكن'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--qhr-radius-md, 10px)',
              backgroundColor: 'var(--eco-surface-subtle, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--eco-border, rgba(212, 175, 55, 0.2))',
              color: 'var(--eco-text-primary, currentColor)',
              cursor: 'pointer',
              marginInlineEnd: 'var(--qhr-space-2, 8px)',
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>

          {/* Cart Badge */}
          <span style={{ 
            position: 'relative', 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: 'var(--eco-accent, #D4AF37)', 
            padding: 'var(--qhr-space-1-5, 6px) var(--qhr-space-3-5, 14px)',
            backgroundColor: 'var(--eco-accent-subtle, rgba(212, 175, 55, 0.1))',
            border: '1px solid var(--eco-accent-border, rgba(212, 175, 55, 0.25))',
            borderRadius: '9999px',
            fontSize: 'var(--qhr-text-xs, 13px)',
            fontWeight: 600,
          }}>
            <Icon name="search" size={15} />
            <span style={{ marginInlineStart: 'var(--qhr-space-2, 8px)' }}>{cartCount} مقتنيات</span>
          </span>
        </NavbarActions>
      </Navbar>

      {/* 2. Catalog Main */}
      <main id="catalog" style={{ maxWidth: '1280px', marginInline: 'auto', padding: 'var(--qhr-space-10, 40px) var(--qhr-space-6, 24px)' }}>
        <div style={{ marginBottom: 'var(--qhr-space-8, 32px)' }}>
          <h1 style={{ 
            fontFamily: 'var(--eco-font-display, var(--qhr-font-heading, "El Messiri", serif))', 
            fontSize: 'clamp(28px, 4vw, 40px)', 
            fontWeight: 800, 
            color: 'var(--eco-text-primary, inherit)',
            marginBottom: 'var(--qhr-space-2, 8px)',
          }}>
            كتالوج المقتنيات والمجوهرات الملكية
          </h1>
          <p style={{ color: 'var(--eco-text-secondary, #B9A896)', fontSize: '16px', lineHeight: 1.8 }}>
            تشكيلة مصاغة من فولاذ 316L ومطلية بالذهب عيار 18 المقاوم للصدأ والتلاشي مدى الحياة.
          </p>
        </div>

        {/* Search Toolbar */}
        <div style={{ marginBottom: 'var(--qhr-space-5, 20px)' }}>
          <SearchToolbar
            placeholder="ابحث بالاسم، الخامة، أو رقم الإصدار..."
            categories={[
              { value: 'all', label: 'كافة التصنيفات' },
              { value: 'rings', label: 'الخواتم الملكية' },
              { value: 'bracelets', label: 'الأساور' },
              { value: 'necklaces', label: 'القلائد' },
              { value: 'earrings', label: 'الأقراط' },
            ]}
          />
        </div>

        {/* Filter Bar */}
        <div style={{ marginBottom: 'var(--qhr-space-8, 32px)' }}>
          <FilterBar
            filters={[
              { key: 'all', label: `الكل (${products.length})`, active: selectedCategory === 'all' },
              { key: 'rings', label: 'الخواتم الملكية', active: selectedCategory === 'rings' },
              { key: 'bracelets', label: 'الأساور المصمتة', active: selectedCategory === 'bracelets' },
              { key: 'necklaces', label: 'القلائد التراثية', active: selectedCategory === 'necklaces' },
            ]}
            onFilterChange={(key) => setSelectedCategory(key)}
          />
        </div>

        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 'var(--qhr-space-6, 24px)',
          marginBottom: 'var(--qhr-space-12, 48px)',
        }}>
          {filteredProducts.map((prod) => (
            <LuxuryProductCard
              key={prod.id}
              title={prod.title}
              collection={prod.collection}
              price={prod.price}
              originalPrice={prod.originalPrice}
              badgeText={prod.badgeText}
              material={prod.material}
              onAddToCart={() => setCartCount((c) => c + 1)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--qhr-space-16, 64px)' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>

        {/* 3. Physical Showrooms Locator */}
        <div id="stores" style={{ marginBottom: 'var(--qhr-space-16, 64px)' }}>
          <StoreLocator stores={stores} />
        </div>

        {/* 4. VIP Membership */}
        <div id="vip">
          <VipMembership
            perks={[
              'أولوية حجز الإصدارات المحدودة (Limited Drops)',
              'تغليف ملكي فاخر بشمع الختم وقفل أمان من خشب الجوز',
              'دعوات خاصة للمعارض ولقاء الحرفيين في القاهرة',
              'شحن مؤمّن ومجاني لجميع المحافظات',
            ]}
          />
        </div>
      </main>

      {/* 5. Back to Top */}
      <BackToTop variant="luxury" />
    </div>
  );
}

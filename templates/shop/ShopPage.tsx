'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
} from '../../renderers/react/Navbar';
import { BackToTop } from '../../renderers/react/BackToTop';
import { Pagination } from '../../renderers/react/patterns/Pagination';
import { LuxuryProductCard } from '../../renderers/react/patterns/LuxuryProductCard';
import { Icon } from '../../renderers/react/Icon';

export function ShopPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('qhr-theme', next);
  };

  const categories = [
    { id: 'rings', name: 'الخواتم الملكية' },
    { id: 'bracelets', name: 'الأساور والمصوغات' },
    { id: 'necklaces', name: 'السلاسل والقلائد' },
    { id: 'earrings', name: 'الأقراط والبروشات' },
    { id: 'watches', name: 'الساعات والتحف' },
  ];

  const colorOptions = [
    { id: 'gold', name: 'ذهب إمبراطوري', hex: '#D4AF37' },
    { id: 'silver', name: 'ستيل فضي 316L', hex: '#CBD5E1' },
    { id: 'obsidian', name: 'أوبسيديان أسود', hex: '#1C1917' },
    { id: 'rosegold', name: 'ذهب وردي', hex: '#E0A899' },
    { id: 'bronze', name: 'برونز عتيق', hex: '#A87C4F' },
  ];

  const sizeOptions = ['6', '7', '8', '9', '10', 'S', 'M', 'L', 'XL', '45cm', '50cm'];

  const brandOptions = [
    { id: 'alqahera', name: 'دار قاهرة الفاخرة' },
    { id: 'alhoulie', name: 'الحولي للأحجار الكريمة' },
    { id: 'elsagha', name: 'ورشة الصاغة التراثية' },
    { id: 'nile', name: 'النيل للأوبسيديان' },
  ];

  const products = [
    {
      id: 'prod-1',
      title: 'خاتم الأفق الذهبي عيار 18',
      category: 'rings',
      brandId: 'alqahera',
      price: '1,850 ر.س',
      numericPrice: 1850,
      badgeText: 'ستيل 316L',
      colorId: 'gold',
      sizes: ['7', '8', '9'],
      material: 'Steel 316L · مطلي ذهب PVD',
      collection: 'دار قاهرة الفاخرة',
    },
    {
      id: 'prod-2',
      title: 'سوار النيل الملكي المنقوش',
      category: 'bracelets',
      brandId: 'alhoulie',
      price: '1,450 ر.س',
      numericPrice: 1450,
      badgeText: 'مقاوم للماء',
      colorId: 'silver',
      sizes: ['S', 'M', 'L'],
      material: 'Steel 316L · صقل مصمت',
      collection: 'الحولي للأحجار الكريمة',
    },
    {
      id: 'prod-3',
      title: 'قلادة المشربية الفاطمية',
      category: 'necklaces',
      brandId: 'elsagha',
      price: '2,100 ر.س',
      numericPrice: 2100,
      badgeText: 'صناعة يدوية',
      colorId: 'gold',
      sizes: ['45cm', '50cm'],
      material: 'Steel 316L · طلاء ذهب عيار 18',
      collection: 'ورشة الصاغة التراثية',
    },
    {
      id: 'prod-4',
      title: 'سوار الهيبة الأوبسيدياني',
      category: 'bracelets',
      brandId: 'nile',
      price: '1,250 ر.س',
      numericPrice: 1250,
      badgeText: 'أوبسيديان بركاني',
      colorId: 'obsidian',
      sizes: ['M', 'L'],
      material: 'Obsidian Stone & Steel 316L',
      collection: 'النيل للأوبسيديان',
    },
  ];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (p.numericPrice > maxPrice) return false;
      if (selectedColors.length > 0 && !selectedColors.includes(p.colorId)) return false;
      if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brandId)) return false;
      if (searchQuery.trim() !== '' && !p.title.includes(searchQuery)) return false;
      return true;
    });
  }, [products, selectedCategory, maxPrice, selectedColors, selectedSizes, selectedBrands, searchQuery]);

  return (
    <div
      className="qhr-shop-page"
      data-theme={theme}
      style={{
        backgroundColor: 'var(--shop-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--shop-text-primary, var(--qhr-text-primary, #FBF8F3))',
        minHeight: '100vh',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      {/* 1. Header */}
      <Navbar>
        <NavbarBrand href="#">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--qhr-radius-md, 10px)',
            backgroundColor: 'var(--shop-accent, #D4AF37)',
            color: '#0A0806',
            fontWeight: 800,
            fontFamily: '"El Messiri", serif',
            fontSize: '18px',
          }}>
            ق
          </span>
          <span style={{ marginInlineStart: '12px', fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700 }}>
            قاهرة للمقتنيات الفاخرة
          </span>
        </NavbarBrand>

        <NavbarLinks>
          <NavbarLink href="#" active>المتجر الشامل</NavbarLink>
          <NavbarLink href="#">الخواتم الملكية</NavbarLink>
          <NavbarLink href="#">الأساور</NavbarLink>
          <NavbarLink href="#">صالات العرض</NavbarLink>
        </NavbarLinks>

        <NavbarActions>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              border: '1px solid var(--shop-border, rgba(212, 175, 55, 0.2))',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginInlineEnd: '8px',
            }}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--shop-accent, #D4AF37)',
            padding: '6px 14px',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
          }}>
            <Icon name="search" size={15} />
            <span style={{ marginInlineStart: '6px' }}>{cartCount} قطع</span>
          </span>
        </NavbarActions>
      </Navbar>

      {/* 2. Main Layout */}
      <div style={{
        maxWidth: '1440px',
        marginInline: 'auto',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: '290px 1fr',
        gap: '32px',
      }}>
        {/* Sidebar Filters */}
        <aside style={{
          background: 'var(--shop-surface, #17120F)',
          border: '1px solid var(--shop-border, rgba(212, 175, 55, 0.2))',
          borderRadius: '20px',
          padding: '24px',
          height: 'fit-content',
        }}>
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0' }}>
            تصفية المقتنيات
          </h2>

          {/* Categories */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>التصنيف</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <li
                style={{ cursor: 'pointer', color: selectedCategory === 'all' ? 'var(--shop-accent, #D4AF37)' : 'inherit', fontWeight: selectedCategory === 'all' ? 700 : 500 }}
                onClick={() => setSelectedCategory('all')}
              >
                كافة المقتنيات
              </li>
              {categories.map((c) => (
                <li
                  key={c.id}
                  style={{ cursor: 'pointer', color: selectedCategory === c.id ? 'var(--shop-accent, #D4AF37)' : 'inherit', fontWeight: selectedCategory === c.id ? 700 : 500 }}
                  onClick={() => setSelectedCategory(c.id)}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
              <span>السعر الأقصى</span>
              <span style={{ color: 'var(--shop-accent, #D4AF37)' }}>{maxPrice} ر.س</span>
            </div>
            <input
              type="range"
              min={300}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--shop-accent, #D4AF37)' }}
            />
          </div>

          {/* Colors */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>اللون والمعدن</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedColors((prev) =>
                      prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id]
                    );
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--shop-border, rgba(212, 175, 55, 0.2))',
                    background: selectedColors.includes(c.id) ? 'var(--shop-accent, #D4AF37)' : 'transparent',
                    color: selectedColors.includes(c.id) ? '#0A0806' : 'inherit',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>دور الصياغة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {brandOptions.map((b) => (
                <label key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b.id)}
                    onChange={() => {
                      setSelectedBrands((prev) =>
                        prev.includes(b.id) ? prev.filter((x) => x !== b.id) : [...prev, b.id]
                      );
                    }}
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Main */}
        <main>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0' }}>
                متجر المقتنيات الملكية
              </h1>
              <span style={{ fontSize: '13px', color: 'var(--shop-text-muted, #9E9081)' }}>
                عرض {filtered.length} منتجات مطابقة
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {filtered.map((prod) => (
              <LuxuryProductCard
                key={prod.id}
                title={prod.title}
                collection={prod.collection}
                price={prod.price}
                badgeText={prod.badgeText}
                material={prod.material}
                onAddToCart={() => setCartCount((c) => c + 1)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination currentPage={currentPage} totalPages={2} onPageChange={setCurrentPage} />
          </div>
        </main>
      </div>

      <BackToTop variant="luxury" />
    </div>
  );
}

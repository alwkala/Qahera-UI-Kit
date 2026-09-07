<?php
/**
 * Qahera UI Kit — Layout Architecture Suite (League/Plates Template)
 * 
 * Demonstrates Boxed Layout, Fixed Layout, and Collapsed Sidebar Rail.
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl" x-data="layoutEngine()" x-init="init()" :data-theme="theme">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>أنماط التخطيط والهيكلة — Qahera Layout Architecture Suite</title>

  <!-- Tokens & Components CSS -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- Google Fonts: Cairo & El Messiri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=El+Messiri:wght@600;700&display=swap" rel="stylesheet">

  <!-- Alpine Core -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--ly-bg-outer, #070503); color: var(--ly-text-primary, #FBF8F3); margin: 0; font-family: var(--qhr-font-family-body, 'Cairo', sans-serif); min-height: 100vh;">

  <!-- Layout Controls Bar -->
  <div style="background: var(--qhr-surface-card, #15110C); padding: 12px 24px; border-bottom: 1px solid rgba(212,175,55,0.2); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
    <div style="font-weight: 700; color: #D4AF37; display: flex; align-items: center; gap: 8px;">
      <span>منظومة التخطيط والهيكلة (Qahera Layouts)</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="setLayoutMode(layoutMode === 'boxed' ? 'fluid' : 'boxed')">
        <span x-text="layoutMode === 'boxed' ? 'تفعيل التخطيط الحر (Fluid)' : 'تفعيل التخطيط المؤطر (Boxed)'"></span>
      </button>
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="setScrollMode(scrollMode === 'fixed' ? 'static' : 'fixed')">
        <span x-text="scrollMode === 'fixed' ? 'تفعيل التمرير الطبيعي (Static)' : 'تثبيت الهيدر والقائمة (Fixed)'"></span>
      </button>
      <button type="button" class="qhr-btn qhr-btn--secondary qhr-btn--sm" @click="toggleSidebar()">
        <span x-text="sidebarState === 'expanded' ? 'طي الشريط الجانبي (Collapsed)' : 'توسيع الشريط الجانبي (Expanded)'"></span>
      </button>
      <button type="button" class="qhr-btn qhr-btn--outline qhr-btn--sm" @click="toggleTheme()">
        <span x-text="theme === 'dark' ? 'النمط الفاتح' : 'النمط الداكن'"></span>
      </button>
    </div>
  </div>

  <!-- Main Shell Container -->
  <div
    :style="layoutMode === 'boxed' ? 'max-width: 1380px; margin: 0 auto; box-shadow: 0 20px 60px rgba(0,0,0,0.7); border-inline: 1px solid rgba(212,175,55,0.2); background: var(--qhr-surface-page, #0E0B08); min-height: 100vh;' : 'max-width: 100%; margin: 0; background: var(--qhr-surface-page, #0E0B08); min-height: 100vh;'"
  >
    <!-- Header -->
    <header style="height: 70px; background: var(--qhr-surface-card, #15110C); border-bottom: 1px solid rgba(212,175,55,0.2); display: flex; align-items: center; justify-content: space-between; padding: 0 24px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button type="button" class="qhr-btn qhr-btn--ghost qhr-btn--sm" @click="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span style="font-family: 'El Messiri', serif; font-size: 20px; font-weight: 700; color: #D4AF37;">قاهرة للهيكلة المعمارية</span>
      </div>
      <div>
        <span class="qhr-badge qhr-badge--primary qhr-badge--sm" x-text="layoutMode.toUpperCase() + ' · ' + scrollMode.toUpperCase() + ' · ' + sidebarState.toUpperCase()"></span>
      </div>
    </header>

    <!-- Layout Grid -->
    <div style="display: flex; min-height: calc(100vh - 70px);">
      <!-- Sidebar -->
      <aside
        :style="'background: var(--qhr-surface-card, #110D09); border-inline-end: 1px solid rgba(212,175,55,0.2); transition: width 250ms ease; width: ' + (sidebarState === 'expanded' ? '260px' : '74px') + '; padding: 16px 10px;'"
      >
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;">
          <li style="padding: 10px; border-radius: 8px; background: rgba(212,175,55,0.1); color: #D4AF37; font-weight: 700; display: flex; align-items: center; gap: 12px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span x-show="sidebarState === 'expanded'">الرئيسية</span>
          </li>
          <li style="padding: 10px; border-radius: 8px; color: var(--qhr-text-secondary, #D5C9BC); display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="setLayoutMode('boxed')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="2"/></svg>
            <span x-show="sidebarState === 'expanded'">نمط Boxed</span>
          </li>
          <li style="padding: 10px; border-radius: 8px; color: var(--qhr-text-secondary, #D5C9BC); display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="setScrollMode('fixed')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4"/><path d="M12 18v4"/><circle cx="12" cy="12" r="3"/></svg>
            <span x-show="sidebarState === 'expanded'">نمط Fixed</span>
          </li>
          <li style="padding: 10px; border-radius: 8px; color: var(--qhr-text-secondary, #D5C9BC); display: flex; align-items: center; gap: 12px; cursor: pointer;" @click="toggleSidebar()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="3" x2="7" y2="21"/></svg>
            <span x-show="sidebarState === 'expanded'">طي القائمة</span>
          </li>
        </ul>
      </aside>

      <!-- Content Area -->
      <main style="flex: 1; padding: 32px 24px;">
        <div style="background: var(--qhr-surface-card, #15110C); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-family: 'El Messiri', serif; font-size: 24px; color: #D4AF37; margin: 0 0 8px;">تكامل هيكلة التخطيط المتقدمة</h2>
          <p style="color: var(--qhr-text-secondary, #D5C9BC); margin: 0;">يدعم القالب الانتقال السلس بين الحاوية المؤطرة المحددة بـ 1380px، وتثبيت الرأس والقائمة الجانبية (Fixed Layout)، ونمط الشريط المصغر (Collapsed Rail).</p>
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          <div style="background: var(--qhr-surface-card, #15110C); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 20px;">
            <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">نمط الحاوية الحالي</span>
            <div style="font-size: 26px; font-weight: 800; color: #D4AF37; margin: 6px 0;" x-text="layoutMode"></div>
          </div>
          <div style="background: var(--qhr-surface-card, #15110C); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 20px;">
            <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">نمط التمرير والتثبيت</span>
            <div style="font-size: 26px; font-weight: 800; color: #D4AF37; margin: 6px 0;" x-text="scrollMode"></div>
          </div>
          <div style="background: var(--qhr-surface-card, #15110C); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 20px;">
            <span style="font-size: 13px; color: var(--qhr-text-muted, #9E9081);">عرض الشريط الجانبي</span>
            <div style="font-size: 26px; font-weight: 800; color: #D4AF37; margin: 6px 0;" x-text="sidebarState === 'expanded' ? '260px' : '74px'"></div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <script>
    function layoutEngine() {
      return {
        theme: localStorage.getItem('qhr-theme') || 'dark',
        layoutMode: 'boxed',
        scrollMode: 'fixed',
        sidebarState: 'expanded',
        init() {
          document.documentElement.setAttribute('data-theme', this.theme);
        },
        toggleTheme() {
          this.theme = this.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', this.theme);
          localStorage.setItem('qhr-theme', this.theme);
        },
        setLayoutMode(mode) { this.layoutMode = mode; },
        setScrollMode(mode) { this.scrollMode = mode; },
        toggleSidebar() { this.sidebarState = this.sidebarState === 'expanded' ? 'collapsed' : 'expanded'; }
      };
    }
  </script>
</body>
</html>

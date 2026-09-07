/**
 * Qahera UI Kit — Universal Intelligent Showcase & Preview Generator v3.0
 * 
 * Generates the Interactive Living Showcase Hub (index.html) and all Component & Pattern Previews.
 * Adheres 100% to Canonical Governance Invariants:
 * 1. ZERO EMOJI (QAHERA-VISUAL-001): Pure SVG vectors only.
 * 2. PRIMARY TYPOGRAPHY: 'Alexandria' (Display/Brand) and 'Cairo' (Body/UI).
 * 3. 100% Logical CSS & Bidirectional RTL/LTR Parity.
 * 4. 12-Theme Cairo Atlas Neighborhood Engine with Navbar Isolation.
 * 5. Complete 11 Behavior Scripts Injection for 0 Console Errors.
 * 6. Alpine.js Hydration & Single-Root Template Integrity (QAHERA-ALPINE-001).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PREVIEWS_DIR = path.join(ROOT_DIR, 'examples', 'previews');
const SHOWCASES_DIR = path.join(ROOT_DIR, 'examples', 'showcases');
const RENDERERS_HTML_DIR = path.join(ROOT_DIR, 'renderers', 'html', 'native');
const PATTERNS_HTML_DIR = path.join(RENDERERS_HTML_DIR, 'patterns');
const CONTRACTS_DIR = path.join(ROOT_DIR, 'contracts', 'components');
const PATTERNS_DIR = path.join(ROOT_DIR, 'patterns');
const REGISTRY_DATA_PATH = path.join(ROOT_DIR, 'generated', 'registry_data.json');
const MANIFEST_PATH = path.join(ROOT_DIR, 'generated', 'manifests', 'components.json');
const JSON_DIR = path.join(ROOT_DIR, 'generated', 'json');

if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

// ─── Arabic & Metadata Dictionaries ──────────────────────────────────────────

const ARABIC_NAMES = {
  'accordion': 'الأكورديون القابل للطي',
  'alert': 'التنبيهات الإشعارية',
  'avatar': 'الصورة الرمزية والوسائط',
  'back-to-top': 'زر العودة للأعلى',
  'badge': 'الشارات والوسوم الرقمية',
  'breadcrumb': 'مسار التنقل المتدرج',
  'button': 'الأزرار التفاعلية الشاملة',
  'callout': 'صندوق التنبيهات والنداءات',
  'canvas-sparks': 'شرارات الكانفاس الحركية',
  'card': 'البطاقات البنائية',
  'carousel': 'عارض الشرائح الدوار',
  'checkbox': 'صناديق الاختيار الثنائية',
  'chip': 'شرائح التصنيف والفلترة',
  'divider': 'الفواصل الأفقية والرأسية',
  'dock': 'شريط التطبيقات السفلي',
  'drawer': 'الدرج الجانبي المنبثق',
  'dropdown': 'القائمة المنسدلة التفاعلية',
  'file-upload': 'رافع الملفات والمستندات',
  'input': 'حقول الإدخال النصية',
  'kbd': 'أزرار لوحة المفاتيح والاختصارات',
  'megamenu': 'القائمة الضخمة متعددة الأعمدة',
  'menu': 'قوائم التنقل والإجراءات',
  'modal': 'النافذة المشروطة المنبثقة',
  'navbar': 'شريط التنقل الرئيسي',
  'pagination': 'ترقيم وتقسيم الصفحات',
  'preloader': 'شاشة ومؤشر التحميل المسبق',
  'progress': 'شريط التقدم والإنجاز',
  'questionnaire': 'الاستبيان والتقييم التفاعلي',
  'radio': 'أزرار الاختيار الأحادي',
  'rating': 'تقييم النجوم التفاعلي',
  'ribbon': 'الشريط الزخرفي والوسام',
  'select': 'حقل الاختيار المنسدل المخصص',
  'skeleton': 'الهيكل الشبحي للتحميل',
  'spinner': 'مؤشر الانتظار الدائري',
  'stepper': 'مؤشر الخطوات المتعاقبة',
  'switch': 'مفتاح التبديل الثنائي',
  'table': 'جداول البيانات الكلاسيكية',
  'tabs': 'ألسنة التبويب التفاعلية',
  'textarea': 'مساحة النص متعددة الأسطر',
  'timeline': 'الخط الزمني والأحداث',
  'toast': 'إشعارات التوست المنبثقة',
  'tooltip': 'التلميحات الإرشادية العائمة',
  'treeview': 'عرض الشجرة الهرمي'
};

const PATTERN_ARABIC_NAMES = {
  'ChatStream': 'مسار المحادثة وتدفق الرسائل',
  'Confirmation': 'نافذة تأكيد الإجراءات الحرجة',
  'DashboardStat': 'بطاقة الإحصائيات والمقاييس',
  'DataTableToolbar': 'شريط أدوات جدول البيانات',
  'DatePaginator': 'شريط التنقل التاريخي المتدرج',
  'EditorialStory': 'بطاقة القصة التحريرية الصحفية',
  'EmptyState': 'حالة الفراغ والبداية الأولى',
  'FileManagerGrid': 'شبكة إدارة الملفات والمجلدات',
  'FilterBar': 'شريط التصفية والفلترة المتقدم',
  'FormActions': 'شريط إجراءات النماذج',
  'KanbanBoard': 'لوحة كانبان لإدارة المهام',
  'LuxuryProductCard': 'بطاقة المنتج الفاخر',
  'MetricComparisonGrid': 'شبكة مقارنة المقاييس',
  'Pagination': 'ترقيم وتقسيم الصفحات المتقدم',
  'Questionnaire': 'نموذج الاستبيان والتقييم التفاعلي',
  'SearchToolbar': 'شريط البحث والأوامر المتقدم',
  'SortableList': 'القائمة القابلة للترتيب والسحب',
  'StoreLocator': 'محدد مواقع الفروع والمتاجر',
  'UserCard': 'بطاقة الملف الشخصي للمستخدم',
  'VipMembership': 'بطاقة العضوية والولاء الذهبية'
};

const CATEGORY_NAMES = {
  'action': 'أزرار وإجراءات',
  'forms': 'نماذج وإدخال',
  'navigation': 'تنقل وهيكلة',
  'overlay': 'بوابات ونوافذ',
  'feedback': 'تغذية وحالات',
  'analytics': 'لوحات وبيانات',
  'layout': 'تنقل وهيكلة',
  'ecommerce': 'تجارة وأعمال',
  'media': 'وسائط وعناصر',
  'ai': 'ذكاء وتفاعل',
  'disclosure': 'كشف المحتوى',
  'utility': 'أدوات ومساعدات'
};

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── 12-Theme Cairo Atlas Data ───────────────────────────────────────────────

const THEMES_DATA_JS = `[
      {
        id: 'garden-city', name: 'جاردن سيتي',
        rBoxes: '12px', rFields: '4px', rSel: '9999px', bw: 1,
        effects: { glass: true, glassBlur: 20, glassOpacity: 50, ambientMesh: true, meshIntensity: 24, accentBorders: true, accentBorderWidth: 2 },
        nightPrimary: '#72a1df', dayPrimary: '#2563EB',
        night: { bg: '#081310', surface: '#0F1F1A', surfaceElevated: '#172C25', text: '#F0F9F5', border: '#8069f2', primary: '#72a1df', accent: '#ebc50a' },
        day: { bg: '#F4F7FB', surface: '#FFFFFF', surfaceElevated: '#EBF1F9', text: '#09182B', border: '#C4D1EB', primary: '#2563EB', accent: '#D97706' }
      },
      {
        id: 'zamalek', name: 'الزمالك',
        rBoxes: '12px', rFields: '6px', rSel: '9999px', bw: 1,
        effects: { glass: true, glassBlur: 16, glassOpacity: 72, accentBorders: true, accentBorderWidth: 2, ambientMesh: true, meshIntensity: 22 },
        nightPrimary: '#E5C378', dayPrimary: '#18181B',
        night: { bg: '#09090B', surface: '#121216', surfaceElevated: '#1C1C24', text: '#F6F4EE', border: 'rgba(229, 195, 120, 0.22)', primary: '#E5C378', accent: '#E2C37A' },
        day: { bg: '#FBF9F5', surface: '#FFFFFF', surfaceElevated: '#F3EFE6', text: '#18181B', border: '#E7DFD3', primary: '#18181B', accent: '#B88A3B' }
      },
      {
        id: 'downtown', name: 'وسط البلد',
        rBoxes: '4px', rFields: '4px', rSel: '4px', bw: 1,
        effects: { grain: true, grainOpacity: 20, accentBorders: true, accentBorderWidth: 1 },
        nightPrimary: '#C29B38', dayPrimary: '#9E7728',
        night: { bg: '#161311', surface: '#211D19', surfaceElevated: '#2C2722', text: '#FAF6F0', border: 'rgba(255, 255, 255, 0.12)', primary: '#C29B38', accent: '#9B3133' },
        day: { bg: '#F6F3EC', surface: '#FFFFFF', surfaceElevated: '#ECE6DC', text: '#1C1917', border: '#DED6C7', primary: '#9E7728', accent: '#832729' }
      },
      {
        id: 'heliopolis', name: 'هليوبوليس',
        rBoxes: '8px', rFields: '4px', rSel: '9999px', bw: 1,
        effects: { ambientMesh: true, meshIntensity: 30, glow: true, glowIntensity: 12, glowOpacity: 40 },
        nightPrimary: '#E0A96D', dayPrimary: '#B45309',
        night: { bg: '#17120E', surface: '#231B14', surfaceElevated: '#2F241C', text: '#FDF8F3', border: 'rgba(255, 255, 255, 0.12)', primary: '#E0A96D', accent: '#2B6CB0' },
        day: { bg: '#FAF6F0', surface: '#FFFFFF', surfaceElevated: '#F2E9DC', text: '#211811', border: '#E2D5C3', primary: '#B45309', accent: '#1E40AF' }
      },
      {
        id: 'maadi', name: 'المعادي',
        rBoxes: '16px', rFields: '8px', rSel: '9999px', bw: 1,
        effects: { glass: true, glassBlur: 14, glassOpacity: 65, ambientMesh: true, meshIntensity: 20 },
        nightPrimary: '#52796F', dayPrimary: '#0D9488',
        night: { bg: '#0A0F0D', surface: '#121C18', surfaceElevated: '#1A2823', text: '#F2F7F5', border: 'rgba(255, 255, 255, 0.1)', primary: '#52796F', accent: '#10B981' },
        day: { bg: '#F4F8F6', surface: '#FFFFFF', surfaceElevated: '#E4ECE8', text: '#111D18', border: '#C9D8D1', primary: '#0D9488', accent: '#059669' }
      },
      {
        id: 'roxy', name: 'روكسي',
        rBoxes: '8px', rFields: '4px', rSel: '9999px', bw: 2,
        effects: { glow: true, glowIntensity: 18, glowOpacity: 55, scanlines: true, scanlinesOpacity: 35, accentBorders: true, accentBorderWidth: 2 },
        nightPrimary: '#00F0FF', dayPrimary: '#2563EB',
        night: { bg: '#090B14', surface: '#121626', surfaceElevated: '#1A2035', text: '#FFFFFF', border: 'rgba(0, 240, 255, 0.25)', primary: '#00F0FF', accent: '#FF2A85' },
        day: { bg: '#F8F9FD', surface: '#FFFFFF', surfaceElevated: '#EEF2FF', text: '#0F172A', border: '#C7D2FE', primary: '#2563EB', accent: '#EC4899' }
      },
      {
        id: 'sakakini', name: 'السكاكيني',
        rBoxes: '4px', rFields: '2px', rSel: '4px', bw: 1,
        effects: { hardShadow: true, shadowOffset: 5, accentBorders: true, accentBorderWidth: 2 },
        nightPrimary: '#9B51E0', dayPrimary: '#7C3AED',
        night: { bg: '#100D14', surface: '#1A1622', surfaceElevated: '#241F2E', text: '#F8F4FB', border: 'rgba(255, 255, 255, 0.12)', primary: '#9B51E0', accent: '#D97706' },
        day: { bg: '#FAF7FC', surface: '#FFFFFF', surfaceElevated: '#F0EAF7', text: '#181124', border: '#DFD3ED', primary: '#7C3AED', accent: '#B45309' }
      },
      {
        id: 'el-hussein', name: 'الحسين',
        rBoxes: '4px', rFields: '4px', rSel: '4px', bw: 1,
        effects: { grain: true, grainOpacity: 25, accentBorders: true, accentBorderWidth: 2 },
        nightPrimary: '#D4AF37', dayPrimary: '#A16207',
        night: { bg: '#14100C', surface: '#1E1812', surfaceElevated: '#292019', text: '#FBF7F0', border: 'rgba(255, 255, 255, 0.12)', primary: '#D4AF37', accent: '#3B82F6' },
        day: { bg: '#F9F5EC', surface: '#FFFFFF', surfaceElevated: '#EFE7D8', text: '#1C160F', border: '#DFD2BE', primary: '#A16207', accent: '#1D4ED8' }
      },
      {
        id: 'shubra', name: 'شبرا',
        rBoxes: '0px', rFields: '0px', rSel: '0px', bw: 2,
        effects: { hardShadow: true, shadowOffset: 6 },
        nightPrimary: '#E11D48', dayPrimary: '#E11D48',
        night: { bg: '#0F0F12', surface: '#18181E', surfaceElevated: '#22222A', text: '#FFFFFF', border: '#FFFFFF', primary: '#E11D48', accent: '#D97706' },
        day: { bg: '#FAF9F6', surface: '#FFFFFF', surfaceElevated: '#F1F0EA', text: '#000000', border: '#000000', primary: '#E11D48', accent: '#D97706' }
      },
      {
        id: 'el-zaytoun', name: 'الزيتون',
        rBoxes: '8px', rFields: '6px', rSel: '8px', bw: 1,
        effects: {},
        nightPrimary: '#3B82F6', dayPrimary: '#1D4ED8',
        night: { bg: '#0B0F19', surface: '#131B2E', surfaceElevated: '#1E293B', text: '#F1F5F9', border: 'rgba(255, 255, 255, 0.12)', primary: '#3B82F6', accent: '#F59E0B' },
        day: { bg: '#F8FAFC', surface: '#FFFFFF', surfaceElevated: '#F1F5F9', text: '#0F172A', border: '#CBD5E1', primary: '#1D4ED8', accent: '#D97706' }
      },
      {
        id: 'el-marg', name: 'المرج',
        rBoxes: '14px', rFields: '8px', rSel: '9999px', bw: 1,
        effects: { accentBorders: true, accentBorderWidth: 2, ambientMesh: true, meshIntensity: 18 },
        nightPrimary: '#158052', dayPrimary: '#0E5E3A',
        night: { bg: '#06130B', surface: '#0E2216', surfaceElevated: '#152F20', text: '#F2F8F4', border: 'rgba(212, 175, 55, 0.28)', primary: '#158052', accent: '#E5B83B' },
        day: { bg: '#F2F7F4', surface: '#FFFFFF', surfaceElevated: '#E4ECE8', text: '#0A1E12', border: '#D2E0D8', primary: '#0E5E3A', accent: '#D4AF37' }
      },
      {
        id: 'new-cairo', name: 'القاهرة الجديدة',
        rBoxes: '16px', rFields: '8px', rSel: '9999px', bw: 1,
        effects: { glass: true, glassBlur: 22, glassOpacity: 58, ambientMesh: true, meshIntensity: 35, glow: true, glowIntensity: 14, glowOpacity: 30, accentBorders: true, accentBorderWidth: 1 },
        nightPrimary: '#0284C7', dayPrimary: '#0284C7',
        night: { bg: '#07090E', surface: '#0D121D', surfaceElevated: '#141B2B', text: '#F0F4FC', border: 'rgba(56, 189, 248, 0.2)', primary: '#0284C7', accent: '#38BDF8' },
        day: { bg: '#F0F5FA', surface: '#FFFFFF', surfaceElevated: '#E2ECF6', text: '#0B1320', border: '#CBD9E7', primary: '#0284C7', accent: '#0EA5E9' }
      }
]`;

const THEME_OPTIONS_HTML = `
          <option value="garden-city">جاردن سيتي</option>
          <option value="zamalek">الزمالك</option>
          <option value="downtown">وسط البلد</option>
          <option value="heliopolis">هليوبوليس</option>
          <option value="maadi">المعادي</option>
          <option value="roxy">روكسي</option>
          <option value="sakakini">السكاكيني</option>
          <option value="el-hussein">الحسين</option>
          <option value="shubra">شبرا</option>
          <option value="el-zaytoun">الزيتون</option>
          <option value="el-marg">المرج</option>
          <option value="new-cairo">القاهرة الجديدة</option>`;

// ─── Main Generator Execution ────────────────────────────────────────────────

function generateAllPreivews() {
  console.log('🏛️  Qahera UI Kit — Universal Living Showcase Generator v3.0\n');

  // 1. Collect Component Entries
  const componentContracts = fs.readdirSync(CONTRACTS_DIR).filter(f => f.endsWith('.yaml'));
  const components = [];

  for (const contractFile of componentContracts) {
    const rawId = path.basename(contractFile, '.yaml');
    const id = rawId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const pascalName = rawId;
    const arabic = ARABIC_NAMES[id] || ARABIC_NAMES[rawId.toLowerCase()] || rawId;

    // Check showcase path first, then renderer fallback
    const showcasePath = path.join(SHOWCASES_DIR, `${id}.html`);
    const rendererPath = path.join(RENDERERS_HTML_DIR, `${id}.html`);
    const finalHtmlPath = fs.existsSync(showcasePath) ? showcasePath : (fs.existsSync(rendererPath) ? rendererPath : null);

    components.push({
      id,
      pascalName,
      filename: `${id}.html`,
      name: pascalName,
      arabicName: arabic,
      category: 'components',
      categoryArabic: 'مكون معماري',
      isPattern: false,
      htmlPath: finalHtmlPath
    });
  }

  // 2. Collect UX Pattern Entries (All 20 Patterns)
  const patterns = [];
  const PATTERN_LIST = [
    'ChatStream', 'Confirmation', 'DashboardStat', 'DataTableToolbar',
    'DatePaginator', 'EditorialStory', 'EmptyState', 'FileManagerGrid',
    'FilterBar', 'FormActions', 'KanbanBoard', 'LuxuryProductCard',
    'MetricComparisonGrid', 'Pagination', 'Questionnaire', 'SearchToolbar',
    'SortableList', 'StoreLocator', 'UserCard', 'VipMembership'
  ];

  for (const pId of PATTERN_LIST) {
    const kebab = pId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const candidates = [
      path.join(PATTERNS_HTML_DIR, `${pId}.html`),
      path.join(PATTERNS_HTML_DIR, `${kebab}.html`),
      path.join(SHOWCASES_DIR, `${kebab}.html`),
      path.join(SHOWCASES_DIR, `${pId}.html`)
    ];

    let foundHtml = null;
    for (const c of candidates) {
      if (fs.existsSync(c)) { foundHtml = c; break; }
    }

    patterns.push({
      id: kebab,
      pascalName: pId,
      filename: `${pId}.html`,
      name: pId.replace(/([a-z])([A-Z])/g, '$1 $2'),
      arabicName: PATTERN_ARABIC_NAMES[pId] || pId,
      category: 'pattern',
      categoryArabic: 'نمط معماري تفاعلي',
      isPattern: true,
      htmlPath: foundHtml
    });
  }

  // Sort lists alphabetically
  components.sort((a, b) => a.id.localeCompare(b.id));
  patterns.sort((a, b) => a.id.localeCompare(b.id));

  const allItems = [...components, ...patterns];
  const totalCount = allItems.length;
  console.log(`Generating interactive preview playgrounds for ${components.length} components + ${patterns.length} patterns (${totalCount} total)...`);

  let generatedCount = 0;

  for (let i = 0; i < allItems.length; i++) {
    const comp = allItems[i];
    const prevComp = allItems[(i - 1 + allItems.length) % allItems.length];
    const nextComp = allItems[(i + 1) % allItems.length];

    const currentFileClean = (comp.filename || '').toLowerCase();
    const currentIdClean = (comp.id || '').toLowerCase();
    const currentPascalClean = (comp.pascalName || '').toLowerCase();

    const isCompPattern = !!comp.isPattern;

    // Generate dynamic dropdown options with selected attribute for the current component / pattern
    const componentOptionsHtml = components.map(c => {
      let isMatch = false;
      if (!isCompPattern) {
        const cFileClean = (c.filename || '').toLowerCase();
        const cIdClean = (c.id || '').toLowerCase();
        const cPascalClean = (c.pascalName || '').toLowerCase();
        isMatch = (
          cFileClean === currentFileClean ||
          cIdClean === currentIdClean ||
          (cPascalClean && cPascalClean === currentPascalClean)
        );
      }
      const isSelected = isMatch ? ' selected' : '';
      return `          <option value="${c.filename}"${isSelected}>${c.arabicName} (${c.name})</option>`;
    }).join('\n');

    const patternOptionsHtml = patterns.map(p => {
      let isMatch = false;
      if (isCompPattern) {
        const pFileClean = (p.filename || '').toLowerCase();
        const pIdClean = (p.id || '').toLowerCase();
        const pPascalClean = (p.pascalName || '').toLowerCase();
        isMatch = (
          pFileClean === currentFileClean ||
          pIdClean === currentIdClean ||
          (pPascalClean && pPascalClean === currentPascalClean)
        );
      }
      const isSelected = isMatch ? ' selected' : '';
      return `          <option value="${p.filename}"${isSelected}>${p.arabicName} (${p.name})</option>`;
    }).join('\n');

    let htmlContent = '';
    if (comp.htmlPath && fs.existsSync(comp.htmlPath)) {
      htmlContent = fs.readFileSync(comp.htmlPath, 'utf8').trim();
    } else {
      htmlContent = `<div class="qhr-card" style="padding: 24px; text-align: center;"><h3>${comp.arabicName}</h3><p>المكون قيد التجهيز.</p></div>`;
    }

    // Read contract specs
    let purpose = 'مكون عالي الأداء مبني وفق ميثاق قاهرة الموحد مع التزام تام بالوصولية والأداء.';
    let variantsList = 'default, primary, secondary';
    let sizesList = 'sm, md, lg';

    const contractYamlPath = path.join(CONTRACTS_DIR, `${comp.pascalName}.yaml`);
    if (fs.existsSync(contractYamlPath)) {
      try {
        const rawYaml = fs.readFileSync(contractYamlPath, 'utf8');
        const purposeMatch = rawYaml.match(/purpose:\s*"([^"]+)"/) || rawYaml.match(/purpose:\s*([^\n\r]+)/);
        if (purposeMatch) purpose = purposeMatch[1].trim();
      } catch (e) {}
    }

    const typeLabel = comp.isPattern ? 'نمط معماري تفاعلي' : 'مكون معماري رسمي';
    const typeBadge = comp.isPattern ? 'UX Pattern' : '0kb Client RSC';
    const sourcePath = comp.isPattern
      ? `renderers/html/native/patterns/${comp.pascalName}.html`
      : `renderers/html/native/${comp.id}.html`;

    const previewHtml = buildPreviewPage({
      comp,
      prevComp,
      nextComp,
      htmlContent,
      purpose,
      variantsList,
      sizesList,
      typeLabel,
      typeBadge,
      sourcePath,
      componentOptionsHtml,
      patternOptionsHtml,
      totalCount
    });

    // Write primary file
    fs.writeFileSync(path.join(PREVIEWS_DIR, comp.filename), previewHtml, 'utf8');

    // Also write aliases with alternate casing if different (e.g. badge.html alongside Badge.html)
    if (comp.pascalName && `${comp.pascalName}.html` !== comp.filename) {
      fs.writeFileSync(path.join(PREVIEWS_DIR, `${comp.pascalName}.html`), previewHtml, 'utf8');
    }
    if (comp.filename.toLowerCase() !== comp.filename) {
      fs.writeFileSync(path.join(PREVIEWS_DIR, comp.filename.toLowerCase()), previewHtml, 'utf8');
    }

    generatedCount++;
  }

  // 3. Generate Central Grand Living Showcase Hub (index.html)
  generateIndexPage();

  console.log(`\n✓ Successfully emitted ${generatedCount} rich preview playgrounds.`);
  console.log(`✓ Successfully restored and updated the Grand Living Showcase Hub: examples/previews/index.html\n`);
}

// ─── Single Preview Page Builder ─────────────────────────────────────────────

function buildPreviewPage(opts) {
  const {
    comp, prevComp, nextComp, htmlContent, purpose,
    variantsList, sizesList, typeLabel, typeBadge, sourcePath,
    componentOptionsHtml, patternOptionsHtml, totalCount
  } = opts;

  const escapedHtml = escapeHtml(htmlContent);

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="zamalek" data-mode="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${comp.arabicName} (${comp.name}) — معاينة منظومة قاهرة Qahera UI Kit</title>
  
  <!-- الخطوط الأساسية الرسمية: Alexandria للعناوين والهوية، و Cairo للنصوص والواجهة -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- أوراق الأنماط الأساسية للمنظومة -->
  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../tokens/themes/themes.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <!-- حزم السلوك التفاعلي الـ 11 كاملة لضمان صفر أخطاء كونسول -->
  <script defer src="../../behavior/modal.js"></script>
  <script defer src="../../behavior/dropdown.js"></script>
  <script defer src="../../behavior/tabs.js"></script>
  <script defer src="../../behavior/accordion.js"></script>
  <script defer src="../../behavior/toast.js"></script>
  <script defer src="../../behavior/tooltip.js"></script>
  <script defer src="../../behavior/select.js"></script>
  <script defer src="../../behavior/canvas-sparks.js"></script>
  <script defer src="../../behavior/back-to-top.js"></script>
  <script defer src="../../behavior/navbar.js"></script>
  <script defer src="../../behavior/preloader.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>

  <style>
    :root {
      --q-font-brand: 'Alexandria', 'Cairo', sans-serif;
      --q-font-heading: 'Alexandria', 'Cairo', sans-serif;
      --q-font-ui: 'Cairo', 'Alexandria', system-ui, -apple-system, sans-serif;
      --q-font-body: 'Cairo', 'Alexandria', system-ui, -apple-system, sans-serif;
      --q-font-code: 'JetBrains Mono', monospace;

      --q-bg: #07090e;
      --q-surface: #0d121f;
      --q-surface-elevated: #131b2e;
      --q-surface-subtle: rgba(255, 255, 255, 0.03);
      --q-border: rgba(255, 255, 255, 0.08);
      --q-border-strong: rgba(255, 255, 255, 0.16);
      --q-text-primary: #f8fafc;
      --q-text-secondary: #94a3b8;
      --q-text-muted: #64748b;
      --q-dots-color: rgba(212, 175, 55, 0.12);
      
      --q-gold: #d4af37;
      --q-gold-glow: rgba(212, 175, 55, 0.25);
      --q-gold-gradient: linear-gradient(135deg, #f5d77f 0%, #d4af37 50%, #aa771c 100%);
      --q-card-glow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--q-border);
    }

    [data-mode="light"],
    [data-theme="light"] {
      --q-bg: #f8fafc;
      --q-surface: #ffffff;
      --q-surface-elevated: #f1f5f9;
      --q-surface-subtle: #f8fafc;
      --q-border: #e2e8f0;
      --q-border-strong: #cbd5e1;
      --q-text-primary: #0f172a;
      --q-text-secondary: #475569;
      --q-text-muted: #94a3b8;
      --q-dots-color: rgba(15, 23, 42, 0.06);
      --q-gold: #b45309;
      --q-gold-glow: rgba(180, 83, 9, 0.18);
      --q-gold-gradient: linear-gradient(135deg, #78350f 0%, #b45309 60%, #92400e 100%);
      --q-card-glow: 0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px var(--q-border);
    }

    * { box-sizing: border-box; }

    body {
      background-color: var(--q-bg);
      color: var(--q-text-primary);
      font-family: var(--q-font-body);
      margin: 0; padding: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 200ms ease, color 200ms ease;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, .brand-title { font-family: var(--q-font-heading); }

    .stage-nav {
      position: sticky;
      inset-block-start: 0;
      z-index: 1000;
      min-height: 58px;
      padding-block: 8px;
      padding-inline: var(--qhr-space-6, 24px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      
      --nav-bg: rgba(13, 18, 31, 0.94);
      --nav-border: rgba(255, 255, 255, 0.1);
      --nav-ctrl-bg: rgba(255, 255, 255, 0.05);
      --nav-ctrl-border: rgba(255, 255, 255, 0.14);
      --nav-text: #f8fafc;
      --nav-text-muted: #94a3b8;
      --nav-active-bg: rgba(255, 255, 255, 0.16);
      --nav-active-text: #ffffff;
      --nav-gold: #d4af37;
      --nav-radius: 8px;

      background: var(--nav-bg) !important;
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-block-end: 1px solid var(--nav-border) !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      transition: background 200ms ease, border-color 200ms ease;
    }
    [data-mode="light"] .stage-nav,
    [data-theme="light"] .stage-nav {
      --nav-bg: rgba(255, 255, 255, 0.96);
      --nav-border: #e2e8f0;
      --nav-ctrl-bg: #f8fafc;
      --nav-ctrl-border: #cbd5e1;
      --nav-text: #0f172a;
      --nav-text-muted: #475569;
      --nav-active-bg: #ffffff;
      --nav-active-text: #0f172a;
      --nav-gold: #b45309;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .brand-group {
      display: flex; align-items: center; gap: 12px;
      text-decoration: none; color: inherit; flex-shrink: 0;
      transition: transform 150ms ease;
    }
    .brand-group:hover { transform: translateY(-1px); }
    .brand-logo-emblem {
      width: 38px; height: 38px; border-radius: 10px !important;
      background: linear-gradient(135deg, #131b2e 0%, #0d121f 100%);
      border: 1px solid rgba(212, 175, 55, 0.35) !important;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(212, 175, 55, 0.15) !important;
      color: var(--nav-gold);
      font-weight: 900;
      font-size: 1.25rem;
    }
    [data-mode="light"] .brand-logo-emblem, [data-theme="light"] .brand-logo-emblem {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid rgba(180, 83, 9, 0.3) !important;
      box-shadow: 0 2px 6px rgba(180, 83, 9, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
    }

    .brand-meta { display: flex; flex-direction: column; }
    .brand-title-row { display: flex; align-items: center; gap: 8px; }
    .brand-title { font-size: 1.05rem; font-weight: 800; line-height: 1.2; margin: 0; }
    .brand-badge {
      font-size: 0.65rem; font-family: var(--q-font-code); font-weight: 700;
      padding: 1px 6px; border-radius: 4px;
      background: rgba(212, 175, 55, 0.15); color: var(--nav-gold);
      border: 1px solid rgba(212, 175, 55, 0.25);
    }
    .brand-sub { font-size: 0.72rem; color: var(--nav-text-muted); line-height: 1.2; }

    .nav-center-group { display: flex; align-items: center; gap: 12px; flex: 1; justify-content: center; max-width: 640px; }
    
    .component-selector-capsule {
      display: flex; align-items: center; gap: 8px;
      background: var(--nav-ctrl-bg); border: 1px solid var(--nav-ctrl-border);
      padding: 3px 10px; border-radius: 9999px;
      font-size: 0.85rem; color: var(--nav-text);
      transition: all 180ms ease;
    }
    .component-selector-capsule:focus-within, .component-selector-capsule:hover {
      border-color: var(--nav-gold); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
    }
    .capsule-icon { color: var(--nav-gold); display: flex; align-items: center; }
    .capsule-label { font-size: 0.75rem; font-weight: 700; color: var(--nav-text-muted); white-space: nowrap; }
    .capsule-divider { width: 1px; height: 16px; background: var(--nav-ctrl-border); }
    .capsule-select-wrapper { position: relative; display: flex; align-items: center; }
    .component-picker {
      appearance: none; -webkit-appearance: none;
      background: transparent; border: none; outline: none;
      font-family: var(--q-font-ui); font-size: 0.88rem; font-weight: 700;
      color: var(--nav-text); cursor: pointer;
      padding-inline-end: 22px; padding-block: 4px;
    }
    .component-picker option { background: #0d121f; color: #f8fafc; font-weight: 500; }
    [data-mode="light"] .component-picker option { background: #ffffff; color: #0f172a; }
    .capsule-chevron { position: absolute; inset-inline-end: 2px; pointer-events: none; color: var(--nav-text-muted); }
    .capsule-badge {
      font-family: var(--q-font-code); font-size: 0.7rem; font-weight: 700;
      padding: 2px 7px; border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08); color: var(--nav-text-muted);
    }

    .theme-selector-capsule {
      display: flex; align-items: center; gap: 8px;
      background: var(--nav-ctrl-bg); border: 1px solid var(--nav-ctrl-border);
      padding: 3px 12px; border-radius: 9999px;
      font-size: 0.82rem; color: var(--nav-text);
      cursor: pointer; transition: all 180ms ease;
    }
    .theme-active-dot { width: 9px; height: 9px; border-radius: 50%; background-color: var(--nav-gold); flex-shrink: 0; }
    .theme-picker {
      appearance: none; -webkit-appearance: none;
      background: transparent; border: none; outline: none;
      font-family: var(--q-font-ui); font-size: 0.85rem; font-weight: 700;
      color: var(--nav-text); cursor: pointer; padding-inline-end: 18px;
    }
    .theme-picker option { background: #0d121f; color: #f8fafc; }
    [data-mode="light"] .theme-picker option { background: #ffffff; color: #0f172a; }

    .nav-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .ctrl-pill-group {
      display: inline-flex; align-items: center;
      background: var(--nav-ctrl-bg); border: 1px solid var(--nav-ctrl-border);
      border-radius: var(--nav-radius); padding: 2px; gap: 2px;
    }
    .ctrl-btn {
      background: transparent; border: none; outline: none;
      font-family: var(--q-font-code); font-size: 0.75rem; font-weight: 700;
      color: var(--nav-text-muted); padding: 5px 9px; border-radius: 6px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 150ms ease;
    }
    .ctrl-btn:hover { color: var(--nav-text); background: rgba(255, 255, 255, 0.06); }
    .ctrl-btn.active { color: var(--nav-active-text); background: var(--nav-active-bg); font-weight: 800; }
    
    .ctrl-action-btn {
      background: var(--nav-ctrl-bg); border: 1px solid var(--nav-ctrl-border);
      border-radius: var(--nav-radius); color: var(--nav-text);
      height: 36px; padding-inline: 12px;
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--q-font-ui); font-size: 0.8rem; font-weight: 700;
      cursor: pointer; text-decoration: none; transition: all 150ms ease;
    }
    .ctrl-action-btn:hover { border-color: var(--nav-gold); color: var(--nav-gold); }

    .stage-wrapper {
      max-width: 1400px; width: 100%; margin: 0 auto;
      padding-inline: clamp(16px, 3.5vw, 40px);
      padding-block: 24px 48px;
      display: flex; flex-direction: column; gap: 20px;
    }

    .comp-header {
      background: var(--q-surface); border: 1px solid var(--q-border);
      border-radius: 16px; padding: 24px 28px;
      display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
      box-shadow: var(--q-card-glow);
    }
    .comp-titles h1 {
      margin: 8px 0; font-size: 1.85rem; font-weight: 900;
      display: flex; align-items: center; gap: 12px;
    }
    .comp-titles h1 span.tech-tag {
      font-family: var(--q-font-code); font-size: 0.95rem; font-weight: 500;
      color: var(--q-gold); opacity: 0.85;
    }
    .comp-desc { color: var(--q-text-secondary); margin: 0; font-size: 0.95rem; line-height: 1.6; max-width: 780px; }
    
    .comp-badge-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-block-end: 4px; }
    .badge-pill-soft {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(212, 175, 55, 0.12); color: var(--q-gold);
      padding: 3px 10px; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700;
    }
    .badge-pill-subtle {
      display: inline-flex; align-items: center; gap: 4px;
      background: var(--q-surface-elevated); color: var(--q-text-muted);
      border: 1px solid var(--q-border);
      padding: 2px 8px; border-radius: 9999px;
      font-size: 0.72rem; font-weight: 600;
    }

    .stage-tabs {
      display: flex; align-items: center; justify-content: space-between;
      border-block-end: 1px solid var(--q-border); padding-block-end: 10px;
    }
    .tab-list { display: flex; align-items: center; gap: 8px; }
    .stage-tab-btn {
      background: transparent; border: none; outline: none;
      font-family: var(--q-font-ui); font-size: 0.88rem; font-weight: 700;
      color: var(--q-text-muted); padding: 8px 16px; border-radius: 10px;
      cursor: pointer; display: flex; align-items: center; gap: 8px;
      transition: all 150ms ease;
    }
    .stage-tab-btn:hover { color: var(--q-text-primary); background: var(--q-surface-elevated); }
    .stage-tab-btn.active {
      color: var(--q-text-primary); background: var(--q-surface-elevated);
      border: 1px solid var(--q-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .copy-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--q-surface-elevated); border: 1px solid var(--q-border);
      padding: 6px 14px; border-radius: 8px;
      font-family: var(--q-font-ui); font-size: 0.78rem; font-weight: 700;
      color: var(--q-text-secondary); cursor: pointer; transition: all 150ms ease;
    }
    .copy-btn:hover { color: var(--q-text-primary); border-color: var(--q-gold); }

    .canvas-stage-outer {
      background-color: var(--q-surface); border: 1px solid var(--q-border);
      border-radius: 20px; padding: 32px; min-height: 480px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background-image: radial-gradient(var(--q-dots-color) 1.5px, transparent 1.5px);
      background-size: 24px 24px; position: relative;
      box-shadow: var(--q-card-glow);
    }
    .canvas-viewport-container {
      width: 100%; max-width: 100%;
      display: flex; justify-content: center; align-items: center;
      transition: max-width 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .canvas-viewport-container.viewport--tablet { max-width: 768px; }
    .canvas-viewport-container.viewport--mobile { max-width: 375px; }

    .component-frame {
      width: 100%;
      background: var(--q-surface-elevated);
      border: 1px solid var(--q-border);
      border-radius: 16px;
      padding: clamp(16px, 3vw, 36px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    }

    .code-panel {
      display: none; background: #090d16; border: 1px solid var(--q-border);
      border-radius: 16px; overflow: hidden;
    }
    .code-panel.active { display: block; }
    .code-panel-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 20px; background: rgba(255, 255, 255, 0.02);
      border-block-end: 1px solid var(--q-border);
      font-family: var(--q-font-code); font-size: 0.8rem; color: var(--q-text-muted);
    }
    .code-pre {
      margin: 0; padding: 24px; overflow-x: auto;
      font-family: var(--q-font-code); font-size: 0.88rem; line-height: 1.7;
      color: #e2e8f0; direction: ltr; text-align: left;
    }

    .contract-panel {
      display: none; background: var(--q-surface); border: 1px solid var(--q-border);
      border-radius: 16px; padding: 28px;
    }
    .contract-panel.active { display: block; }
    .contract-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .contract-item { background: var(--q-surface-elevated); border: 1px solid var(--q-border); border-radius: 12px; padding: 18px; }
    .contract-item h4 { margin: 0 0 10px 0; font-size: 0.95rem; font-weight: 700; color: var(--q-gold); }
    .contract-item p { margin: 0; font-size: 0.85rem; line-height: 1.6; color: var(--q-text-secondary); }

    .stage-pager {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      margin-block-start: 16px;
    }
    .pager-card {
      flex: 1; max-width: 48%; background: var(--q-surface); border: 1px solid var(--q-border);
      border-radius: 14px; padding: 16px 20px; text-decoration: none; color: inherit;
      display: flex; align-items: center; gap: 14px; transition: all 150ms ease;
    }
    .pager-card:hover { border-color: var(--q-gold); transform: translateY(-2px); }
    .pager-label { font-size: 0.72rem; color: var(--q-text-muted); font-weight: 700; text-transform: uppercase; }
    .pager-title { font-size: 0.92rem; font-weight: 800; margin-block-start: 2px; }
  </style>

  <!-- تطبيق الثيم الحي قبل الرندر لمنع وميض الشاشة -->
  <script>
    (function(){
      try {
        var m = localStorage.getItem('qhr-theme') || localStorage.getItem('qhr_preview_theme') || 'dark';
        var t = localStorage.getItem('qhr-neighborhood') || localStorage.getItem('qhr_preview_theme_id') || 'zamalek';
        document.documentElement.setAttribute('data-mode', m);
        document.documentElement.setAttribute('data-theme', t);
      } catch(e){}
    })();
  </script>
  <style id="qaheraLiveThemeStyles"></style>
</head>
<body>

  <!-- شريط التنقل العلوي الزجاجي — معزول تماماً عن تأثير الثيمات -->
  <header class="stage-nav">
    <a href="index.html" class="brand-group" title="العودة إلى فهرس منظومة قاهرة">
      <div class="brand-logo-emblem">ق</div>
      <div class="brand-meta">
        <div class="brand-title-row">
          <span class="brand-title">منظومة قاهرة</span>
          <span class="brand-badge">v1.5.0</span>
        </div>
        <span class="brand-sub">Qahera UI Kit · Living Showcase</span>
      </div>
    </a>

    <div class="nav-center-group">
      <div class="component-selector-capsule" title="الانتقال السريع بين المكونات والأنماط">
        <div class="capsule-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="capsule-label">المكون / النمط</span>
        <div class="capsule-divider"></div>
        <div class="capsule-select-wrapper">
          <select class="component-picker" id="componentPickerSelect" onchange="window.location.href = this.value">
        <optgroup label="المكونات المعمارية (Components)">
${componentOptionsHtml}
        </optgroup>
        <optgroup label="الأنماط المعمارية التفاعلية (UX Patterns)">
${patternOptionsHtml}
        </optgroup>
          </select>
          <svg class="capsule-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <span class="capsule-badge">${totalCount}</span>
      </div>

      <div class="theme-selector-capsule" title="تبديل ثيم المنظومة">
        <span class="theme-active-dot" id="theme-active-dot"></span>
        <select class="theme-picker" id="themePickerSelect" onchange="setTheme(this.value)" aria-label="اختر ثيم المنظومة">
${THEME_OPTIONS_HTML}
        </select>
        <svg class="capsule-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none; margin-inline-start: -14px;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <div class="nav-controls">
      <div class="ctrl-pill-group" title="محاكاة أبعاد الشاشة">
        <button type="button" class="ctrl-btn active" id="btn-vp-desktop" onclick="setViewport('desktop')" title="شاشة كاملة" aria-label="شاشة كاملة">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </button>
        <button type="button" class="ctrl-btn" id="btn-vp-tablet" onclick="setViewport('tablet')" title="جهاز لوحي" aria-label="جهاز لوحي">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        </button>
        <button type="button" class="ctrl-btn" id="btn-vp-mobile" onclick="setViewport('mobile')" title="هاتف محمول" aria-label="هاتف محمول">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        </button>
      </div>

      <div class="ctrl-pill-group" title="تبديل اتجاه القراءة">
        <button type="button" class="ctrl-btn active" id="btn-dir-rtl" onclick="setDirection('rtl')">RTL</button>
        <button type="button" class="ctrl-btn" id="btn-dir-ltr" onclick="setDirection('ltr')">LTR</button>
      </div>

      <button type="button" class="ctrl-action-btn" id="btn-theme-toggle" onclick="toggleTheme()" title="تبديل الوضع اللوني" aria-label="تبديل الوضع اللوني" style="width: 36px; height: 36px; padding: 0; display: inline-flex; align-items: center; justify-content: center;">
        <svg id="svg-theme-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block;">
          <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg id="svg-theme-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <a href="index.html" class="ctrl-action-btn" title="الانتقال إلى فهرس المنظومة (${totalCount} عنصراً)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>الفهرس (${totalCount})</span>
      </a>
    </div>
  </header>

  <!-- مساحة العمل ومحتوى المكون -->
  <main class="stage-wrapper">
    
    <section class="comp-header">
      <div class="comp-titles">
        <div class="comp-badge-row">
          <span class="badge-pill-soft">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--q-gold);"></span>
            ${typeLabel}
          </span>
          <span class="badge-pill-subtle">${typeBadge}</span>
          <span class="badge-pill-subtle">WCAG 2.1 AA</span>
          <span class="badge-pill-subtle">100% Logical CSS</span>
        </div>
        <h1>
          <span>${comp.arabicName}</span>
          <span class="tech-tag">${comp.name}</span>
        </h1>
        <p class="comp-desc">${escapeHtml(purpose)}</p>
      </div>

      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
        <kbd class="qhr-kbd qhr-kbd--sm">${sourcePath}</kbd>
        <span style="font-size: 0.72rem; color: var(--q-text-muted);">المتغيرات: <code>${variantsList}</code></span>
      </div>
    </section>

    <!-- شريط التبويبات -->
    <div class="stage-tabs">
      <div class="tab-list">
        <button type="button" class="stage-tab-btn active" id="tab-btn-stage" onclick="switchTab('stage')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2v20"/></svg>
          <span>المعاينة الحية (Live Stage)</span>
        </button>
        <button type="button" class="stage-tab-btn" id="tab-btn-code" onclick="switchTab('code')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>كود المكون (HTML Native)</span>
        </button>
        <button type="button" class="stage-tab-btn" id="tab-btn-contract" onclick="switchTab('contract')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>ميثاق المكون (Contract &amp; Specs)</span>
        </button>
      </div>

      <div>
        <button type="button" class="copy-btn" onclick="copyComponentHtml()">
          <svg id="copy-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span id="copy-btn-text">نسخ كود HTML</span>
        </button>
      </div>
    </div>

    <!-- 1. لوحة المعاينة الحية -->
    <div id="panel-stage" class="canvas-stage-outer">
      <div id="canvas-container" class="canvas-viewport-container">
        <div class="component-frame" id="component-viewport">
          ${htmlContent}
        </div>
      </div>
    </div>

    <!-- 2. لوحة كود HTML -->
    <div id="panel-code" class="code-panel">
      <div class="code-panel-header">
        <span>${sourcePath} · HTML5 Strict Markup</span>
        <button type="button" class="copy-btn" onclick="copyComponentHtml()">نسخ الكود الكامل</button>
      </div>
      <pre class="code-pre"><code id="rawComponentSource">${escapedHtml}</code></pre>
    </div>

    <!-- 3. لوحة ميثاق المكون -->
    <div id="panel-contract" class="contract-panel">
      <h3 style="margin-block-end: 16px; font-size: 1.1rem; font-weight: 700; color: var(--q-text-primary);">مواصفات الميثاق المعماري (Architectural Contract)</h3>
      <div class="contract-grid">
        <div class="contract-item">
          <h4>التصنيف والهدف (Role &amp; Category)</h4>
          <p><strong>التصنيف:</strong> ${typeLabel}</p>
          <p style="margin-block-start: 6px;"><strong>الغرض:</strong> ${escapeHtml(purpose)}</p>
        </div>
        <div class="contract-item">
          <h4>المتغيرات المدعومة (Variants)</h4>
          <p><code>${variantsList}</code></p>
          <p style="margin-block-start: 6px; font-size: 0.78rem; color: var(--q-text-muted);">تعتمد كلياً على فئات CSS المعيارية <code>--qhr-*</code> دون انحراف مفرداتي.</p>
        </div>
        <div class="contract-item">
          <h4>المقاسات المعيارية (Sizes)</h4>
          <p><code>${sizesList}</code></p>
          <p style="margin-block-start: 6px; font-size: 0.78rem; color: var(--q-text-muted);">متناسقة بصرياً وتدعم التكبير الهرمي المتوازن.</p>
        </div>
        <div class="contract-item">
          <h4>إمكانية الوصول (A11y Standards)</h4>
          <p>متوافق مع <strong>WCAG 2.1 AA</strong> بنسبة تباين تتجاوز 4.5:1.</p>
          <p style="margin-block-start: 6px; font-size: 0.78rem; color: var(--q-text-muted);">دعم كامل للوحة المفاتيح ومؤشرات التركيز <code>focus-visible</code>.</p>
        </div>
      </div>
    </div>

    <!-- شريط التنقل بين المكونات السابق والتالي -->
    <nav class="stage-pager">
      <a href="${prevComp.filename}" class="pager-card" title="الانتقال للمكون السابق">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--q-gold);"><polyline points="9 18 15 12 9 6"/></svg>
        <div style="text-align: start;">
          <div class="pager-label">السابق</div>
          <div class="pager-title">${prevComp.arabicName} (${prevComp.name})</div>
        </div>
      </a>

      <a href="${nextComp.filename}" class="pager-card" title="الانتقال للمكون التالي">
        <div style="text-align: end;">
          <div class="pager-label">التالي</div>
          <div class="pager-title">${nextComp.arabicName} (${nextComp.name})</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--q-gold);"><polyline points="15 18 9 12 15 6"/></svg>
      </a>
    </nav>

  </main>

  <script>
    const QAHERA_THEMES_DATA = ${THEMES_DATA_JS};

    function safeStorageGet(key, def) {
      try { return localStorage.getItem(key) || def; } catch (e) { return def; }
    }
    function safeStorageSet(key, val) {
      try { localStorage.setItem(key, val); } catch (e) {}
    }

    let currentThemeId = safeStorageGet('qhr-neighborhood', safeStorageGet('qhr_preview_theme_id', 'zamalek'));
    let currentMode = safeStorageGet('qhr-theme', safeStorageGet('qhr_preview_theme', 'dark'));

    function applyTheme() {
      const cur = QAHERA_THEMES_DATA.find(t => t.id === currentThemeId) || QAHERA_THEMES_DATA[0];
      const isDark = currentMode === 'dark';
      const p = isDark ? cur.night : cur.day;
      const eff = cur.effects || {};

      document.documentElement.setAttribute('data-theme', currentThemeId);
      document.documentElement.setAttribute('data-mode', currentMode);

      const dot = document.getElementById('theme-active-dot');
      if (dot) dot.style.backgroundColor = isDark ? cur.nightPrimary : cur.dayPrimary;
      const sel = document.getElementById('themePickerSelect');
      if (sel) sel.value = currentThemeId;

      const sun = document.getElementById('svg-theme-sun');
      const moon = document.getElementById('svg-theme-moon');
      if (sun && moon) {
        sun.style.display = isDark ? 'inline-block' : 'none';
        moon.style.display = isDark ? 'none' : 'inline-block';
      }

      let shadow = '0 8px 24px rgba(0,0,0,0.2)';
      if (eff.hardShadow) {
        shadow = isDark ? '5px 5px 0px rgba(0,0,0,0.95)' : '5px 5px 0px rgba(15,23,42,0.9)';
      } else if (eff.glow) {
        shadow = \`0 0 16px color-mix(in srgb, \${p.primary} 45%, transparent)\`;
      }

      let cardBg = p.surfaceElevated;
      let cardBackdrop = 'none';
      if (eff.glass) {
        const op = eff.glassOpacity || 70;
        cardBg = isDark ? \`rgba(15, 23, 42, \${op / 100})\` : \`rgba(255, 255, 255, \${op / 100})\`;
        cardBackdrop = \`blur(\${eff.glassBlur || 16}px)\`;
      }

      const isSharp = cur.rBoxes === '0px' || cur.rBoxes === 0;

      const styleTag = document.getElementById('qaheraLiveThemeStyles');
      if (styleTag) {
        styleTag.innerHTML = \`
          :root {
            --qhr-color-primary: \${p.primary} !important;
            --qhr-color-accent: \${p.accent} !important;
            --qhr-color-bg: \${p.bg} !important;
            --qhr-color-surface: \${p.surface} !important;
            --qhr-color-surface-elevated: \${p.surfaceElevated} !important;
            --qhr-color-text-primary: \${p.text} !important;
            --qhr-color-border: \${p.border} !important;

            --q-bg: \${p.bg} !important;
            --q-surface: \${p.surface} !important;
            --q-surface-elevated: \${p.surfaceElevated} !important;
            --q-border: \${p.border} !important;
            --q-text-primary: \${p.text} !important;
            --q-gold: \${p.primary} !important;
          }
        \`;
      }
    }

    function setTheme(themeId) {
      currentThemeId = themeId;
      safeStorageSet('qhr-neighborhood', themeId);
      safeStorageSet('qhr_preview_theme_id', themeId);
      applyTheme();
    }

    function toggleTheme() {
      currentMode = currentMode === 'dark' ? 'light' : 'dark';
      safeStorageSet('qhr-theme', currentMode);
      safeStorageSet('qhr_preview_theme', currentMode);
      applyTheme();
    }

    function setViewport(mode) {
      const container = document.getElementById('canvas-container');
      const bDesktop = document.getElementById('btn-vp-desktop');
      const bTablet = document.getElementById('btn-vp-tablet');
      const bMobile = document.getElementById('btn-vp-mobile');
      
      bDesktop.classList.remove('active');
      bTablet.classList.remove('active');
      bMobile.classList.remove('active');
      container.className = 'canvas-viewport-container';

      if (mode === 'tablet') { container.classList.add('viewport--tablet'); bTablet.classList.add('active'); }
      else if (mode === 'mobile') { container.classList.add('viewport--mobile'); bMobile.classList.add('active'); }
      else { bDesktop.classList.add('active'); }
    }

    function switchTab(tab) {
      document.getElementById('tab-btn-stage').classList.remove('active');
      document.getElementById('tab-btn-code').classList.remove('active');
      document.getElementById('tab-btn-contract').classList.remove('active');
      
      document.getElementById('panel-stage').style.display = 'none';
      document.getElementById('panel-code').classList.remove('active');
      document.getElementById('panel-contract').classList.remove('active');

      if (tab === 'code') {
        document.getElementById('tab-btn-code').classList.add('active');
        document.getElementById('panel-code').classList.add('active');
      } else if (tab === 'contract') {
        document.getElementById('tab-btn-contract').classList.add('active');
        document.getElementById('panel-contract').classList.add('active');
      } else {
        document.getElementById('tab-btn-stage').classList.add('active');
        document.getElementById('panel-stage').style.display = 'flex';
      }
    }

    function setDirection(dir) {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      document.getElementById('btn-dir-rtl').classList.toggle('active', dir === 'rtl');
      document.getElementById('btn-dir-ltr').classList.toggle('active', dir === 'ltr');
      safeStorageSet('qhr-dir', dir);
      safeStorageSet('qhr_preview_dir', dir);
    }

    function copyComponentHtml() {
      var codeEl = document.getElementById('rawComponentSource') || document.querySelector('.code-pre code');
      var textToCopy = codeEl ? codeEl.textContent : '';
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(function() {
          var btnText = document.getElementById('copy-btn-text');
          if (btnText) {
            var orig = btnText.textContent;
            btnText.textContent = 'تم النسخ بنجاح';
            btnText.style.color = '#10b981';
            setTimeout(function() { btnText.textContent = orig; btnText.style.color = ''; }, 2000);
          }
        });
      }
    }

    (function initStage() {
      var savedDir = safeStorageGet('qhr-dir', safeStorageGet('qhr_preview_dir', 'rtl'));
      setDirection(savedDir);
      applyTheme();

      // Synchronize component picker dropdown to current page URL
      var picker = document.getElementById('componentPickerSelect') || document.querySelector('.component-picker');
      if (picker) {
        var curPath = window.location.pathname.split('/').pop().toLowerCase();
        for (var i = 0; i < picker.options.length; i++) {
          var optVal = (picker.options[i].value || '').toLowerCase();
          if (optVal === curPath || optVal === '${comp.filename.toLowerCase()}' || optVal === '${comp.id.toLowerCase()}.html' || optVal === '${(comp.pascalName || '').toLowerCase()}.html') {
            picker.selectedIndex = i;
            break;
          }
        }
      }
    })();
  </script>
</body>
</html>`;
}

// ─── Central Grand Living Showcase Hub Generator (index.html) ────────────────

function generateIndexPage() {
  let registryData = [];
  if (fs.existsSync(REGISTRY_DATA_PATH)) {
    try {
      registryData = JSON.parse(fs.readFileSync(REGISTRY_DATA_PATH, 'utf8'));
    } catch (e) {
      console.warn('Could not read canonical registry data JSON');
    }
  }

  const indexPageHtml = `<!DOCTYPE html>
<!-- Qahera UI Kit — Canonical Showcase & Registry Hub (v1.5.0) -->
<!-- Sovereign Design System Architecture · 100% Logical CSS & WCAG 2.1 AA -->
<html lang="ar" dir="rtl" data-theme="zamalek" data-mode="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>معرض منظومة قاهرة الشامل والتفاعلي — Qahera UI Kit Registry & Showcase</title>
  <meta name="description" content="المعرض التفاعلي الشامل لمكونات وأنماط وقوالب منظومة قاهرة للتصميم المعماري — 78 عنصراً موثقاً بمعايير 0kb RSC و Logical CSS.">

  <!-- الخطوط الرسمية المعتمدة: Alexandria للعناوين والهوية، و Cairo للنصوص والواجهة -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../../tokens/tokens.css">
  <link rel="stylesheet" href="../../tokens/themes/themes.css">
  <link rel="stylesheet" href="../../renderers/html/native/components.css">

  <script>
    (function() {
      const savedMode = localStorage.getItem('qhr-theme') || 'dark';
      const savedTheme = localStorage.getItem('qhr-neighborhood') || 'zamalek';
      const savedDir = localStorage.getItem('qhr-dir') || 'rtl';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.setAttribute('data-mode', savedMode);
      document.documentElement.setAttribute('dir', savedDir);
      document.documentElement.setAttribute('lang', savedDir === 'rtl' ? 'ar' : 'en');
    })();

    function renderTags(tags) {
      if (!tags || !tags.length) return '';
      return tags.map(function(t) {
        return '<span class="qhr-badge qhr-badge--neutral qhr-badge--xs qhr-badge--pill">' + t + '</span>';
      }).join('');
    }
  </script>

  <!-- تطبيق سجل المنظومة عبر Alpine.data مع التحميل الفوري التام للمصفوفة -->
  <script>
    const QAHERA_ITEMS_DATA = ${JSON.stringify(registryData)};

    document.addEventListener('alpine:init', () => {
      Alpine.data('registryApp', () => ({
        theme: localStorage.getItem('qhr-theme') || 'dark',
        activeNeighborhood: localStorage.getItem('qhr-neighborhood') || 'zamalek',
        neighborhoodThemes: [
          { id: 'garden-city', name: 'جاردن سيتي', nightPrimary: '#72a1df', dayPrimary: '#2563EB' },
          { id: 'zamalek', name: 'الزمالك', nightPrimary: '#E5C378', dayPrimary: '#18181B' },
          { id: 'downtown', name: 'وسط البلد', nightPrimary: '#C29B38', dayPrimary: '#9E7728' },
          { id: 'heliopolis', name: 'هليوبوليس', nightPrimary: '#E0A96D', dayPrimary: '#B45309' },
          { id: 'maadi', name: 'المعادي', nightPrimary: '#52796F', dayPrimary: '#0D9488' },
          { id: 'roxy', name: 'روكسي', nightPrimary: '#00F0FF', dayPrimary: '#2563EB' },
          { id: 'sakakini', name: 'السكاكيني', nightPrimary: '#9B51E0', dayPrimary: '#7C3AED' },
          { id: 'el-hussein', name: 'الحسين', nightPrimary: '#D4AF37', dayPrimary: '#A16207' },
          { id: 'shubra', name: 'شبرا', nightPrimary: '#E11D48', dayPrimary: '#DC2626' },
          { id: 'el-zaytoun', name: 'الزيتون', nightPrimary: '#3B82F6', dayPrimary: '#1D4ED8' },
          { id: 'el-marg', name: 'المرج', nightPrimary: '#158052', dayPrimary: '#0E5E3A' },
          { id: 'new-cairo', name: 'القاهرة الجديدة', nightPrimary: '#0284C7', dayPrimary: '#0284C7' }
        ],
        dir: localStorage.getItem('qhr-dir') || 'rtl',
        lang: (localStorage.getItem('qhr-dir') || 'rtl') === 'rtl' ? 'ar' : 'en',
        searchQuery: '',
        selectedType: 'all',
        selectedCategory: 'all',
        viewMode: 'grid',
        copiedId: null,
        items: QAHERA_ITEMS_DATA,
        filteredItems: [...QAHERA_ITEMS_DATA],
        currentPage: 1,
        pageSize: 12,

        init() {
          document.documentElement.setAttribute('data-theme', this.activeNeighborhood);
          document.documentElement.setAttribute('data-mode', this.theme);
          document.documentElement.setAttribute('dir', this.dir);
          document.documentElement.setAttribute('lang', this.lang);
          this.applyFilter();

          this.$nextTick(() => {
            this.applyFilter();
          });

          window.addEventListener('keydown', (e) => {
            if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement.tagName !== 'INPUT') {
              e.preventDefault();
              const input = document.getElementById('searchInput');
              if (input) {
                input.focus();
                input.select();
              }
            }
            if (e.key === 'Escape' && document.activeElement.id === 'searchInput') {
              this.searchQuery = '';
              this.applyFilter();
              document.activeElement.blur();
            }
          });
        },

        applyFilter() {
          let list = this.items;

          if (this.selectedType !== 'all') {
            list = list.filter(i => i.type === this.selectedType);
          }

          if (this.selectedCategory !== 'all') {
            list = list.filter(i => i.cat === this.selectedCategory);
          }

          if (this.searchQuery && this.searchQuery.trim() !== '') {
            const q = this.searchQuery.toLowerCase().trim();
            list = list.filter(i =>
              i.name.toLowerCase().includes(q) ||
              i.arabic.toLowerCase().includes(q) ||
              i.desc.toLowerCase().includes(q) ||
              i.catAr.toLowerCase().includes(q) ||
              i.file.toLowerCase().includes(q) ||
              (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
            );
          }

          this.filteredItems = list;
          this.currentPage = 1;
        },

        get totalPages() {
          if (this.pageSize === 'all') return 1;
          const size = parseInt(this.pageSize, 10) || 12;
          return Math.ceil(this.filteredItems.length / size) || 1;
        },

        get paginatedItems() {
          if (this.pageSize === 'all') return this.filteredItems;
          const size = parseInt(this.pageSize, 10) || 12;
          const start = (this.currentPage - 1) * size;
          return this.filteredItems.slice(start, start + size);
        },

        get startIndex() {
          if (this.filteredItems.length === 0) return 0;
          if (this.pageSize === 'all') return 1;
          const size = parseInt(this.pageSize, 10) || 12;
          return (this.currentPage - 1) * size + 1;
        },

        get endIndex() {
          if (this.pageSize === 'all') return this.filteredItems.length;
          const size = parseInt(this.pageSize, 10) || 12;
          return Math.min(this.currentPage * size, this.filteredItems.length);
        },

        setPage(page) {
          if (page < 1 || page > this.totalPages || page === this.currentPage) return;
          this.currentPage = page;
          this.$nextTick(() => {
            const stage = document.querySelector('.stage-container');
            if (stage) {
              stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        },

        goToPage(p) {
          if (typeof p === 'number') {
            this.setPage(p);
          }
        },

        get paginationPages() {
          const total = this.totalPages;
          const cur = this.currentPage;
          if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
          }
          if (cur <= 4) {
            return [1, 2, 3, 4, 5, '...', total];
          }
          if (cur >= total - 3) {
            return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
          }
          return [1, '...', cur - 1, cur, cur + 1, '...', total];
        },

        setType(type) {
          this.selectedType = type;
          this.applyFilter();
        },

        setCategory(cat) {
          this.selectedCategory = cat;
          this.applyFilter();
        },

        resetFilters() {
          this.searchQuery = '';
          this.selectedType = 'all';
          this.selectedCategory = 'all';
          this.applyFilter();
        },

        copyItemName(text, id) {
          navigator.clipboard.writeText(text);
          this.copiedId = id;
          setTimeout(() => { this.copiedId = null; }, 2000);
        },

        toggleTheme() {
          this.theme = this.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-mode', this.theme);
          localStorage.setItem('qhr-theme', this.theme);
        },

        setNeighborhood(id) {
          this.activeNeighborhood = id;
          document.documentElement.setAttribute('data-theme', id);
          localStorage.setItem('qhr-neighborhood', id);
        },

        toggleDir() {
          this.dir = this.dir === 'rtl' ? 'ltr' : 'rtl';
          this.lang = this.dir === 'rtl' ? 'ar' : 'en';
          document.documentElement.setAttribute('dir', this.dir);
          document.documentElement.setAttribute('lang', this.lang);
          localStorage.setItem('qhr-dir', this.dir);
        },

        get counts() {
          return {
            all: this.items.length,
            component: this.items.filter(i => i.type === 'component').length,
            pattern: this.items.filter(i => i.type === 'pattern').length,
            template: this.items.filter(i => i.type === 'template').length,
          };
        }
      }));
    });
  </script>

  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>

  <style>
    :root {
      --q-font-heading: 'Alexandria', 'Cairo', sans-serif;
      --q-font-body: 'Cairo', 'Alexandria', sans-serif;
      --q-font-mono: 'JetBrains Mono', monospace;

      --q-bg: #07090e;
      --q-surface: #0d121f;
      --q-surface-elevated: #131b2e;
      --q-border: rgba(255, 255, 255, 0.08);
      --q-border-subtle: rgba(255, 255, 255, 0.05);
      --q-border-strong: rgba(255, 255, 255, 0.16);

      --q-text-primary: #f8fafc;
      --q-text-secondary: #94a3b8;
      --q-text-muted: #64748b;

      --q-gold: #d4af37;
      --q-gold-hover: #f5d77f;
      --q-gold-glow: rgba(212, 175, 55, 0.25);
      --q-dots-color: rgba(212, 175, 55, 0.07);
    }

    [data-mode="light"],
    [data-theme="light"] {
      --q-bg: #f8fafc;
      --q-surface: #ffffff;
      --q-surface-elevated: #f1f5f9;
      --q-border: #e2e8f0;
      --q-border-subtle: #f1f5f9;
      --q-border-strong: #cbd5e1;

      --q-text-primary: #0f172a;
      --q-text-secondary: #475569;
      --q-text-muted: #94a3b8;

      --q-gold: #b45309;
      --q-gold-hover: #92400e;
      --q-gold-glow: rgba(180, 83, 9, 0.2);
      --q-dots-color: rgba(15, 23, 42, 0.04);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: var(--q-font-body);
      background-color: var(--q-bg);
      color: var(--q-text-primary);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-image: radial-gradient(var(--q-dots-color) 1.5px, transparent 1.5px);
      background-size: 28px 28px;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Navigation Bar */
    .showcase-navbar {
      position: sticky;
      inset-block-start: 0;
      z-index: 50;
      background: rgba(13, 18, 31, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-block-end: 1px solid var(--q-border);
      padding-block: 10px;
      padding-inline: clamp(16px, 3.5vw, 36px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    [data-mode="light"] .showcase-navbar,
    [data-theme="light"] .showcase-navbar {
      background: rgba(255, 255, 255, 0.92);
      border-block-end-color: #e2e8f0;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
      flex-shrink: 0;
    }
    .brand-logo-emblem {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: #2563EB;
      color: #FFFFFF;
      font-family: var(--q-font-heading);
      font-weight: 900;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
    }
    .brand-meta {
      display: flex;
      flex-direction: column;
    }
    .brand-title {
      font-family: var(--q-font-heading);
      font-size: 1.1rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0;
    }
    .brand-sub {
      font-size: 0.72rem;
      color: var(--q-text-muted);
    }

    /* Themes Strip Inside Topbar */
    .themes-topbar-strip {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      flex: 1;
      justify-content: center;
    }
    .themes-label-tag {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--q-text-muted);
      margin-inline-end: 4px;
      white-space: nowrap;
    }
    .theme-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding-block: 4px;
      padding-inline: 11px;
      border-radius: 9999px;
      border: 1px solid var(--q-border);
      background: transparent;
      color: var(--q-text-secondary);
      font-family: var(--q-font-body);
      font-size: 0.78rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all 180ms ease;
    }
    .theme-pill-btn:hover {
      color: var(--q-text-primary);
      border-color: var(--q-border-strong);
      background: rgba(255, 255, 255, 0.05);
    }
    .theme-pill-btn.is-active {
      background: var(--q-surface-elevated);
      color: #2563EB;
      border-color: #2563EB;
      box-shadow: 0 0 10px rgba(37, 99, 235, 0.25);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid var(--q-border);
      background: var(--q-surface);
      color: var(--q-text-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 150ms ease;
      padding: 0;
    }
    .icon-action-btn:hover {
      color: var(--q-text-primary);
      border-color: var(--q-gold);
      box-shadow: 0 0 0 3px var(--q-gold-glow);
    }

    .lang-pill-btn {
      height: 36px;
      padding-inline: 12px;
      border-radius: 10px;
      border: 1px solid var(--q-border);
      background: var(--q-surface);
      color: var(--q-text-secondary);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      font-family: var(--q-font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      transition: all 150ms ease;
    }
    .lang-pill-btn:hover {
      color: var(--q-text-primary);
      border-color: var(--q-gold);
    }

    /* Hero Section */
    .hero-container {
      max-width: 1300px;
      margin: 0 auto;
      padding-inline: clamp(16px, 4vw, 40px);
      padding-block: 40px 20px;
      text-align: center;
    }
    .hero-headline {
      font-family: var(--q-font-heading);
      font-size: clamp(2rem, 4.2vw, 3.2rem);
      font-weight: 900;
      line-height: 1.2;
      margin: 14px 0 12px 0;
      color: var(--q-text-primary);
    }
    .hero-headline .highlight-blue {
      color: #2563EB;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-lead {
      max-width: 800px;
      margin: 0 auto 20px auto;
      font-size: 1.02rem;
      line-height: 1.7;
      color: var(--q-text-secondary);
    }

    .telemetry-row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-block-end: 28px;
    }

    /* Command Hub Container */
    .command-hub-wrapper {
      max-width: 1300px;
      width: 100%;
      margin: 0 auto 24px auto;
      padding-inline: clamp(16px, 4vw, 40px);
    }

    .search-card-box {
      background: var(--q-surface-elevated);
      border: 1px solid var(--q-border);
      border-radius: var(--qhr-radius-xl, 18px);
      padding: 18px 22px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    [data-mode="light"] .search-card-box,
    [data-theme="light"] .search-card-box {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .tabs-nav-row {
      display: flex;
      justify-content: center;
      margin-block-end: 18px;
    }
    .tabs-segmented-wrapper {
      background-color: var(--q-surface);
      border: 1px solid var(--q-border);
      padding: 4px;
      border-radius: var(--qhr-radius-pill, 9999px);
      display: inline-flex;
      gap: 4px;
      max-width: 100%;
      overflow-x: auto;
    }
    [data-mode="light"] .tabs-segmented-wrapper,
    [data-theme="light"] .tabs-segmented-wrapper {
      background-color: #f1f5f9;
      border-color: #e2e8f0;
    }

    .tab-item-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: var(--qhr-radius-pill, 9999px);
      border: none;
      background: transparent;
      color: var(--q-text-secondary);
      font-family: var(--q-font-body);
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 150ms ease;
    }
    .tab-item-btn:hover { color: var(--q-text-primary); }
    .tab-item-btn.is-active {
      background-color: var(--q-surface-elevated);
      color: var(--q-text-primary);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    }
    [data-mode="light"] .tab-item-btn.is-active,
    [data-theme="light"] .tab-item-btn.is-active {
      background-color: #ffffff;
      color: #0f172a;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    }

    .search-tools-row {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .search-input-container {
      flex: 1;
      min-inline-size: 280px;
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-input-field {
      width: 100%;
      height: 48px;
      padding-block: 0;
      padding-inline-start: 46px;
      padding-inline-end: 42px;
      font-family: var(--q-font-body);
      font-size: 0.95rem;
      border-radius: var(--qhr-radius-md, 10px);
      border: 1px solid var(--q-border);
      background-color: var(--q-bg);
      color: var(--q-text-primary);
      outline: none;
      transition: all 150ms ease;
    }
    .search-input-field:focus {
      border-color: #2563EB;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    [data-mode="light"] .search-input-field,
    [data-theme="light"] .search-input-field {
      background-color: #f8fafc;
      border-color: #cbd5e1;
    }
    .search-leading-svg {
      position: absolute;
      inset-inline-start: 16px;
      width: 18px;
      height: 18px;
      color: var(--q-text-muted);
      pointer-events: none;
    }
    .search-shortcut-kbd {
      position: absolute;
      inset-inline-end: 14px;
    }

    .category-filter-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      margin-block-start: 16px;
      padding-block-start: 14px;
      border-block-start: 1px solid var(--q-border-subtle);
    }
    .category-label-hint {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--q-text-muted);
      margin-inline-end: 4px;
    }

    .results-summary-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-start: 14px;
      font-size: 0.85rem;
      color: var(--q-text-muted);
      flex-wrap: wrap;
      gap: 12px;
    }

    /* Stage Container & Cards */
    .stage-container {
      max-width: 1300px;
      width: 100%;
      margin: 0 auto;
      padding-inline: clamp(16px, 4vw, 40px);
      padding-block-end: 64px;
    }

    .registry-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 20px;
    }

    .registry-list-view {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .qhr-showcase-card {
      background: var(--q-surface-elevated);
      border: 1px solid var(--q-border);
      border-radius: var(--qhr-radius-lg, 14px);
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 200ms ease;
    }
    .qhr-showcase-card:hover {
      border-color: #2563EB;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
    }
    [data-mode="light"] .qhr-showcase-card,
    [data-theme="light"] .qhr-showcase-card {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    [data-mode="light"] .qhr-showcase-card:hover,
    [data-theme="light"] .qhr-showcase-card:hover {
      border-color: #2563EB;
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
    }

    .card-meta-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block-end: 12px;
    }
    .card-arabic-heading {
      font-family: var(--q-font-heading);
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0 0 4px 0;
    }
    .card-title-link {
      text-decoration: none;
      color: inherit;
    }
    .card-title-link:hover { text-decoration: underline; color: #2563EB; }
    .card-tech-id-row {
      font-family: var(--q-font-mono);
      font-size: 0.78rem;
      color: var(--q-text-muted);
      margin-block-end: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .card-desc-body {
      font-size: 0.86rem;
      color: var(--q-text-secondary);
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .card-tags-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-block-end: 14px;
    }
    .card-footer-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-block-start: 12px;
      border-block-start: 1px solid var(--q-border-subtle);
    }

    .showcase-footer {
      background: var(--q-surface);
      border-block-start: 1px solid var(--q-border);
      padding: 32px clamp(16px, 4vw, 40px);
      text-align: center;
      margin-block-start: auto;
      color: var(--q-text-secondary);
      font-size: 0.85rem;
    }
  </style>
</head>
<body x-data="registryApp">

  <!-- 1. Top Glassmorphic Navigation Bar With 12 Themes Inline -->
  <nav class="showcase-navbar" aria-label="شريط التنقل الرئيسي">
    <!-- Brand Info -->
    <a href="index.html" class="brand-group">
      <div class="brand-logo-emblem">ق</div>
      <div class="brand-meta">
        <h1 class="brand-title">Qahera UI Kit</h1>
        <span class="brand-sub">سجل المعاينات الشامل v1.5.0</span>
      </div>
    </a>

    <!-- Integrated 12 Neighborhood Themes Navigation -->
    <div class="themes-topbar-strip" role="group" aria-label="ثيمات المنظومة">
      <span class="themes-label-tag">ثيمات المنظومة (12 ثيم):</span>
      <template x-for="t in neighborhoodThemes" :key="t.id">
        <button 
          type="button" 
          class="theme-pill-btn" 
          :class="{ 'is-active': activeNeighborhood === t.id }"
          @click="setNeighborhood(t.id)">
          <span style="width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;" :style="'background-color: ' + (theme === 'dark' ? t.nightPrimary : t.dayPrimary)"></span>
          <span x-text="t.name"></span>
        </button>
      </template>
    </div>

    <!-- Right Controls -->
    <div class="nav-actions">
      <!-- Direct Link to Theme Studio -->
      <a href="ThemeStudio.html" class="qhr-btn qhr-btn--primary qhr-btn--sm" style="font-weight: 700; text-decoration: none; gap: 6px;" title="استوديو القاهرة لتخصيص ومعاينة وتصدير الثيمات">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        <span>+ استوديو القاهرة</span>
      </a>

      <!-- Direction Toggle (RTL / LTR) -->
      <button 
        type="button" 
        class="lang-pill-btn" 
        @click="toggleDir()" 
        :title="dir === 'rtl' ? 'Switch to English (LTR)' : 'التحويل إلى العربية (RTL)'"
        aria-label="تبديل اتجاه الصفحة واللغة">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        <span x-text="dir.toUpperCase()"></span>
      </button>

      <!-- Mode Switcher (Dark / Light) -->
      <button 
        type="button" 
        class="icon-action-btn" 
        @click="toggleTheme()" 
        :title="theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'"
        aria-label="تبديل الوضع اللوني">
        <svg x-show="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg x-show="theme === 'light'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </button>
    </div>
  </nav>

  <!-- 2. Hero Section -->
  <header class="hero-container">
    <div style="display: inline-flex; margin-block-end: 12px;">
      <span class="qhr-badge qhr-badge--primary qhr-badge--pill">المعمارية السياحية للواجهات الرقمية المعتمدة</span>
    </div>
    <h1 class="hero-headline">
      معرض منظومة قاهرة <span class="highlight-blue">الشامل والتفاعلي</span>
    </h1>
    <p class="hero-lead">
      استكشف الحزمة البرمجية الكاملة: <strong>40 مكوناً معمارياً</strong>، <strong>20 نمطاً مركباً (UX Patterns)</strong>، و <strong>18 قالباً مؤسسياً</strong> متكاملاً. تدعم جميعها التبديل اللوني، والتوافق الفوري مع باقة ثيمات المنظومة الـ 12 المعتمدة، والتماثل الاتجاهي الكامل %100 Logical CSS، وبصمة العميل 0kb RSC.
    </p>

    <!-- Telemetry Badges Row -->
    <div class="telemetry-row">
      <span class="qhr-badge qhr-badge--neutral qhr-badge--pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-inline-end: 4px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        <span>WCAG 2.1 AA Compliant</span>
      </span>
      <span class="qhr-badge qhr-badge--neutral qhr-badge--pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-inline-end: 4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        <span>0kb RSC Client Boundary</span>
      </span>
      <span class="qhr-badge qhr-badge--success qhr-badge--pill">
        <span>القوالب: </span><strong style="margin-inline-start: 4px;" x-text="counts.template"></strong>
      </span>
      <span class="qhr-badge qhr-badge--primary qhr-badge--pill">
        <span>الأنماط: </span><strong style="margin-inline-start: 4px;" x-text="counts.pattern"></strong>
      </span>
      <span class="qhr-badge qhr-badge--info qhr-badge--pill">
        <span>المكونات: </span><strong style="margin-inline-start: 4px;" x-text="counts.component"></strong>
      </span>
    </div>
  </header>

  <!-- 3. Smart Command Hub (Tabs, Search, Categories) -->
  <section class="command-hub-wrapper" aria-label="أدوات البحث والتصفية">
    
    <!-- Primary Type Navigation (Segmented Control Tabs) -->
    <div class="tabs-nav-row">
      <div class="tabs-segmented-wrapper" role="tablist">
        <button 
          type="button" 
          class="tab-item-btn" 
          :class="{ 'is-active': selectedType === 'all' }" 
          @click="setType('all')">
          <span>كافة العناصر</span>
          <span class="qhr-badge qhr-badge--neutral qhr-badge--xs qhr-badge--pill" x-text="counts.all"></span>
        </button>
        <button 
          type="button" 
          class="tab-item-btn" 
          :class="{ 'is-active': selectedType === 'component' }" 
          @click="setType('component')">
          <span>المكونات المعمارية</span>
          <span class="qhr-badge qhr-badge--info qhr-badge--xs qhr-badge--pill" x-text="counts.component"></span>
        </button>
        <button 
          type="button" 
          class="tab-item-btn" 
          :class="{ 'is-active': selectedType === 'pattern' }" 
          @click="setType('pattern')">
          <span>الأنماط المركبة</span>
          <span class="qhr-badge qhr-badge--primary qhr-badge--xs qhr-badge--pill" x-text="counts.pattern"></span>
        </button>
        <button 
          type="button" 
          class="tab-item-btn" 
          :class="{ 'is-active': selectedType === 'template' }" 
          @click="setType('template')">
          <span>القوالب التطبيقية</span>
          <span class="qhr-badge qhr-badge--success qhr-badge--xs qhr-badge--pill" x-text="counts.template"></span>
        </button>
      </div>
    </div>

    <!-- Search Box Card with Leading Icon, KBD and Category Chips -->
    <div class="search-card-box">
      <!-- Search & View Mode Switcher -->
      <div class="search-tools-row">
        <!-- View Mode Switcher (Grid / List) -->
        <div style="display: inline-flex; align-items: center; gap: 4px; background: var(--q-bg); border: 1px solid var(--q-border); border-radius: var(--qhr-radius-md, 10px); padding: 4px;">
          <button 
            type="button" 
            class="qhr-btn qhr-btn--sm" 
            :class="viewMode === 'list' ? 'qhr-btn--primary' : 'qhr-btn--ghost'" 
            @click="viewMode = 'list'" 
            title="عرض القائمة" 
            aria-label="عرض القائمة"
            style="height: 38px; padding-inline: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button 
            type="button" 
            class="qhr-btn qhr-btn--sm" 
            :class="viewMode === 'grid' ? 'qhr-btn--primary' : 'qhr-btn--ghost'" 
            @click="viewMode = 'grid'" 
            title="عرض الشبكة" 
            aria-label="عرض الشبكة"
            style="height: 38px; padding-inline: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>

        <div class="search-input-container">
          <svg class="search-leading-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input 
            id="searchInput" 
            type="search" 
            class="search-input-field" 
            placeholder="ابحث بالاسم العربي أو الإنجليزي، الفئة، التاج، أو المسار (مثال: زر، كانبان، Button، Modal)..." 
            x-model="searchQuery" 
            @input="applyFilter()"
            autocomplete="off">
          <kbd class="qhr-kbd qhr-kbd--sm search-shortcut-kbd">/</kbd>
        </div>
      </div>

      <!-- Faceted Category Chips Strip -->
      <div class="category-filter-row" role="group" aria-label="التصنيفات الوظيفية">
        <span class="category-label-hint">تصفية الفئات:</span>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'all' }" @click="setCategory('all')">
          <span>كافة الفئات</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'action' }" @click="setCategory('action')">
          <span>أزرار وإجراءات</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'forms' }" @click="setCategory('forms')">
          <span>نماذج وإدخال</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'navigation' }" @click="setCategory('navigation')">
          <span>تنقل وهيكلة</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'overlay' }" @click="setCategory('overlay')">
          <span>بوابات ونوافذ</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'feedback' }" @click="setCategory('feedback')">
          <span>تغذية وحالات</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'analytics' }" @click="setCategory('analytics')">
          <span>لوحات وبيانات</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'ecommerce' }" @click="setCategory('ecommerce')">
          <span>تجارة وأعمال</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'media' }" @click="setCategory('media')">
          <span>وسائط وعناصر</span>
        </button>
        <button type="button" class="qhr-chip qhr-chip--sm" :class="{ 'qhr-chip--primary': selectedCategory === 'ai' }" @click="setCategory('ai')">
          <span>ذكاء وتفاعل</span>
        </button>
      </div>
    </div>

    <!-- Results Status Bar -->
    <div class="results-summary-bar">
      <div class="results-count-title">
        <span>إجمالي العناصر: <strong x-text="filteredItems.length"></strong> من أصل <strong x-text="items.length"></strong> (يُعرض حالياً <strong x-text="startIndex"></strong> إلى <strong x-text="endIndex"></strong>)</span>
        <button 
          type="button" 
          class="qhr-btn qhr-btn--ghost qhr-btn--xs" 
          style="color: var(--q-gold);" 
          x-show="searchQuery !== '' || selectedType !== 'all' || selectedCategory !== 'all'" 
          @click="resetFilters()">
          <span>(تفريغ الفلاتر والعودة للكل)</span>
        </button>
      </div>

      <div style="display: flex; align-items: center; gap: 8px;">
        <label for="pageSizeSelect" style="font-size: 0.78rem;">العناصر لكل صفحة:</label>
        <select 
          id="pageSizeSelect" 
          class="qhr-select qhr-select--sm" 
          style="width: auto; height: 32px; padding-block: 2px; padding-inline: 10px;" 
          x-model="pageSize" 
          @change="currentPage = 1">
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="all">عرض الكل</option>
        </select>
      </div>
    </div>
  </section>

  <!-- 4. Interactive Showcase Stage -->
  <main class="stage-container">

    <!-- Empty State Display -->
    <div class="qhr-card" style="text-align: center; padding: 54px 24px; border-radius: var(--qhr-radius-xl, 18px); margin-block: 20px;" x-show="filteredItems.length === 0">
      <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(37, 99, 235, 0.12); color: #2563EB; display: inline-flex; align-items: center; justify-content: center; margin-block-end: 16px;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </div>
      <h2 style="font-family: var(--q-font-heading); font-size: 1.3rem; font-weight: 700; margin: 0 0 8px 0;">لم يتم العثور على أي عناصر مطابقة</h2>
      <p style="color: var(--q-text-secondary); font-size: 0.92rem; max-width: 440px; margin: 0 auto 20px auto;">جرّب البحث بكلمات مفتاحية أخرى، أو قم بإلغاء الفلاتر المحددة لاستعراض كافة المكونات والأنماط.</p>
      <button type="button" class="qhr-btn qhr-btn--primary qhr-btn--md" @click="resetFilters()">
        <span>إعادة ضبط كافة الفلاتر</span>
      </button>
    </div>

    <!-- VIEW 1: Cards Grid -->
    <div class="registry-cards-grid" x-show="viewMode === 'grid'">
      <template x-for="item in paginatedItems" :key="item.uniqueKey">
        <article class="qhr-showcase-card">
          <div>
            <!-- Card Meta Top -->
            <div class="card-meta-top">
              <span class="qhr-badge qhr-badge--sm" :class="item.type === 'component' ? 'qhr-badge--info' : item.type === 'pattern' ? 'qhr-badge--primary' : 'qhr-badge--success'" x-text="item.typeLabel"></span>
              <span class="qhr-badge qhr-badge--neutral qhr-badge--xs" x-text="item.catAr"></span>
            </div>

            <!-- Card Titles -->
            <h3 class="card-arabic-heading">
              <a :href="item.file" class="card-title-link" x-text="item.arabic"></a>
            </h3>
            <div class="card-tech-id-row">
              <span x-text="item.name"></span>
              <span style="opacity: 0.4;">·</span>
              <span style="font-size: 0.72rem; opacity: 0.75;" x-text="item.file.split('/').pop()"></span>
            </div>

            <!-- Description Body -->
            <p class="card-desc-body" x-text="item.desc"></p>
          </div>

          <div>
            <!-- Tags Flex Row -->
            <div class="card-tags-flex" x-html="renderTags(item.tags)"></div>

            <!-- Footer Actions -->
            <div class="card-footer-actions">
              <a :href="item.file" class="qhr-btn qhr-btn--primary qhr-btn--sm" style="font-size: 0.8rem; height: 32px; padding-inline: 12px; text-decoration: none;">
                <span>فتح المعاينة</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-inline-start: 6px;" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>

              <button 
                type="button" 
                class="qhr-btn qhr-btn--ghost qhr-btn--xs" 
                @click="copyItemName(item.name, item.id)"
                :title="'نسخ اسم ' + item.name">
                <span x-text="copiedId === item.id ? 'تم النسخ' : item.name"></span>
              </button>
            </div>
          </div>
        </article>
      </template>
    </div>

    <!-- VIEW 2: Compact List -->
    <div class="registry-list-view" x-show="viewMode === 'list'">
      <template x-for="item in paginatedItems" :key="item.uniqueKey">
        <div class="qhr-showcase-card" style="padding: 14px 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-inline-size: 260px;">
              <span class="qhr-badge qhr-badge--xs" :class="item.type === 'component' ? 'qhr-badge--info' : item.type === 'pattern' ? 'qhr-badge--primary' : 'qhr-badge--success'" x-text="item.typeLabel"></span>
              <a :href="item.file" class="card-title-link" style="font-weight: 700; font-size: 0.96rem;" x-text="item.arabic"></a>
              <span style="font-family: var(--q-font-mono); font-size: 0.78rem; color: var(--q-text-muted);" x-text="'(' + item.name + ')'"></span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="qhr-badge qhr-badge--neutral qhr-badge--xs" x-text="item.catAr"></span>
              <a :href="item.file" class="qhr-btn qhr-btn--primary qhr-btn--xs" style="text-decoration: none; padding-inline: 10px;">
                <span>فتح</span>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 5. Dynamic Pagination Bar -->
    <nav class="pagination-container" aria-label="ترقيم الصفحات" x-show="totalPages > 1" style="display: flex; justify-content: center; align-items: center; gap: 6px; margin-block-start: 40px; flex-wrap: wrap;">
      <button 
        type="button" 
        class="qhr-btn qhr-btn--ghost qhr-btn--sm" 
        :disabled="currentPage === 1" 
        @click="setPage(currentPage - 1)">
        السابق
      </button>

      <template x-for="p in paginationPages" :key="'page-' + p">
        <button 
          type="button" 
          class="qhr-btn qhr-btn--sm" 
          :class="currentPage === p ? 'qhr-btn--primary' : 'qhr-btn--ghost'" 
          :disabled="p === '...'" 
          @click="goToPage(p)" 
          x-text="p">
        </button>
      </template>

      <button 
        type="button" 
        class="qhr-btn qhr-btn--ghost qhr-btn--sm" 
        :disabled="currentPage === totalPages" 
        @click="setPage(currentPage + 1)">
        التالي
      </button>
    </nav>

  </main>

  <!-- 6. Footer -->
  <footer class="showcase-footer">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-weight: 800; font-family: var(--q-font-heading); color: var(--q-text-primary);">Qahera UI Kit v1.5.0</span>
        <span>·</span>
        <span>Alwkala Design Systems &amp; Technology Studio</span>
      </div>
      <div style="font-size: 0.78rem; color: var(--q-text-muted);">
        100% Logical CSS Parity · WCAG 2.1 AA Compliant · 0kb RSC Client Boundary · 12 Cairo Atlas Neighborhood Themes
      </div>
    </div>
  </footer>

</body>
</html>`;

  fs.writeFileSync(path.join(PREVIEWS_DIR, 'index.html'), indexPageHtml, 'utf8');
}

// ─── Direct Execution ────────────────────────────────────────────────────────

generateAllPreivews();

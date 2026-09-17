<div align="center">

# 🏛️ قاهرة لتصميم الواجهات `v1.5.4` (Qahera UI Kit)
### نظام التصميم العربي البرمجـي والهندسة المعمارية متعددة المسارات لعصر الذكاء الاصطناعي
**المعجم البصري المعياري، وسجل المكونات الحي، والأساس متعدد البيئات من تطوير استوديو الوكالة**

امنح وكلاء الذكاء الاصطناعي البرمجيين (**Google Antigravity, Claude Code, Cursor, OpenAI Codex, Windsurf**) عقداً بصرياً حتمياً ومقروءاً آلياً لبناء تطبيقات ويب عربية وإنجليزية متماسكة، متوافقة مع معايير الوصولية، وفائقة الجمال عبر **React, PHP Plates, Native HTML, Web Components, HTMX** — مع ملكية برمجية كاملة للكود وصفر تبعيات تشغيلية مغلقة.

<br/>

<!-- أوسمة المجتمع -->
[![npm version](https://img.shields.io/npm/v/qahera-ui.svg?style=for-the-badge&logo=npm&color=0284C7)](https://www.npmjs.com/package/qahera-ui)
[![CDN: jsDelivr](https://img.shields.io/badge/CDN-jsDelivr%20%26%20unpkg-E11D48.svg?style=for-the-badge)](https://www.jsdelivr.com/package/npm/qahera-ui)
[![npm downloads](https://img.shields.io/npm/dm/qahera-ui.svg?style=for-the-badge&color=22C55E)](https://www.npmjs.com/package/qahera-ui)
[![GitHub Stars](https://img.shields.io/github/stars/alwkala/Qahera-UI-Kit?style=for-the-badge&logo=github&color=EAB308)](https://github.com/alwkala/Qahera-UI-Kit/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Studio: Alwkala](https://img.shields.io/badge/Studio-Alwkala-D4AF37.svg?style=for-the-badge)](https://github.com/alwkala)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-TidyFactor%20Compatible-7C3AED.svg?style=for-the-badge)](https://github.com/TidyFactor)
[![Maturity: Level 5 OSS](https://img.shields.io/badge/Maturity-Level%205%20OSS%20(95%2F100)-success.svg?style=for-the-badge)](#بطاقة-الجودة-وصحة-المنظومة)

<!-- الأوسمة التقنية والمعمارية -->
[![React 19 & Next.js](https://img.shields.io/badge/React-19%20%26%20Next.js%20(0kb%20RSC)-61DAFB.svg?style=for-the-badge&logo=react)](renderers/react/)
[![PHP 8.x Plates](https://img.shields.io/badge/PHP-8.x%20Plates%20(20%20Templates)-777BB4.svg?style=for-the-badge&logo=php)](renderers/php/plates/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20Zero--Error-3178C6.svg?style=for-the-badge&logo=typescript)](tsconfig.json)
[![WCAG 2.1 AA Certified](https://img.shields.io/badge/A11y-WCAG%202.1%20AA%20(100%25)-10B981.svg?style=for-the-badge)](#بطاقة-الجودة-وصحة-المنظومة)
[![RTL 100% Logical](https://img.shields.io/badge/RTL-100%25%20Logical%20CSS-059669.svg?style=for-the-badge)](#المحددات-المعمارية-الـ-17-غير-القابلة-للتفاوض)
[![حظر الإيموجي](https://img.shields.io/badge/Visual-Zero%20Emoji%20(QAHERA--VISUAL--001)-DC2626.svg?style=for-the-badge)](#المحددات-المعمارية-الـ-17-غير-القابلة-للتفاوض)
[![أطلس أحياء القاهرة](https://img.shields.io/badge/Themes-12%20Cairo%20Neighborhoods-F59E0B.svg?style=for-the-badge)](#أطلس-أحياء-القاهرة-المعماري-12-ثيما)

<br/>

**[ 🌐 مركز المعارض الحية ](examples/previews/index.html) • [ 🏛️ المكونات الـ 45 ](#المكونات-المعمارية-الـ-45) • [ 🧩 الأنماط الـ 21 ](#الأنماط-التركيبية-الـ-21) • [ 🏙️ أطلس القاهرة (12 ثيماً) ](#أطلس-أحياء-القاهرة-المعماري-12-ثيما) • [ 🚀 البدء السريع ](#دليل-البدء-السريع-وقنوات-التوزيع) • [ 🗺️ خارطة الطريق ](#خارطة-الطريق-roadmap) • [ 📄 English ](README.md)**

</div>

<p align="center">
  <img src=".github/assets/social-preview.jpg" alt="بطاقة المعاينة الاجتماعية الرسمية لمنظومة قاهرة" width="100%" style="border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.25); max-width: 960px;">
</p>

---

<a id="فهرس-المحتويات"></a>
## 📚 فهرس المحتويات

- [🎯 لماذا منظومة قاهرة؟](#لماذا-منظومة-قاهرة)
- [📊 بطاقة الجودة وصحة المنظومة](#بطاقة-الجودة-وصحة-المنظومة)
- [🖼️ النموذج المعماري ومسارات الإنتاج](#النموذج-المعماري-ومسارات-الإنتاج)
- [🏛️ المكونات المعمارية الـ 45](#المكونات-المعمارية-الـ-45)
- [🧩 الأنماط التركيبية الـ 21](#الأنماط-التركيبية-الـ-21)
- [🏙️ أطلس أحياء القاهرة المعماري (12 ثيماً)](#أطلس-أحياء-القاهرة-المعماري-12-ثيما)
- [🚀 دليل البدء السريع وقنوات التوزيع](#دليل-البدء-السريع-وقنوات-التوزيع)
  - [1. أداة سطر الأوامر عبر `npx` (بنمط shadcn المعاصر)](#1-أداة-سطر-الأوامر-عبر-npx-بنمط-shadcn-المعاصر)
  - [2. التضمين الفوري عبر شبكات التوزيع (CDN Quickstart)](#2-التضمين-الفوري-عبر-شبكات-التوزيع-cdn-quickstart-بدون-أي-أدوات-بناء)
  - [3. محرك قوالب PHP Plates (حزمة Packagist / Composer)](#3-محرك-قوالب-php-plates-حزمة-packagist--composer)
  - [4. بيئة React ومكونات الخادم 0kb RSC](#4-بيئة-react-ومكونات-الخادم-0kb-rsc)
  - [5. عناصر الويب المعيارية (Web Components)](#5-عناصر-الويب-المعيارية-web-components)
- [📖 وثائق المواصفات المعمارية التفصيلية](#وثائق-المواصفات-المعمارية-التفصيلية)
- [🛡️ المحددات المعمارية الـ 17 غير القابلة للتفاوض](#المحددات-المعمارية-الـ-17-غير-القابلة-للتفاوض)
- [🗺️ خارطة الطريق (Roadmap)](#خارطة-الطريق-roadmap)
- [🤝 المساهمة وصحة المجتمع](#المساهمة-وصحة-المجتمع)
- [📞 قنوات التواصل والروابط الرسمية](#قنوات-التواصل-والروابط-الرسمية)
- [📜 الترخيص](#الترخيص)

---

<a id="لماذا-منظومة-قاهرة"></a>
## 🎯 لماذا منظومة قاهرة؟

> [!IMPORTANT]
> **المعادلة المعمارية المحورية:**  
> $$\mathbf{\text{Qahera UI Kit v1.5.2}} = \mathbf{\text{Design System}} + \mathbf{\text{Registry}} + \mathbf{\text{AI Decision Layer}}$$
> 
> منظومة قاهرة ليست مجرد مكتبة مكونات مكررة؛ بل هي **نظام تصميم موجه للذكاء الاصطناعي (AI-Native)** يدمج لغة تصميمية دقيقة، وسجلاً معمارياً موثقاً، وطبقة اتخاذ قرار واضحة تخبر الوكلاء البرمجيين **ماذا** يستخدمون، **متى** يستخدمونه، و**لماذا يحظر** اختراع خصائص عشوائية خارج المنظومة.

| البعد التقني | مكتبات المكونات التقليدية | التوليد العشوائي بالذكاء الاصطناعي | منظومة قاهرة (Qahera UI Kit) |
|---|---|---|---|
| **مصدر الحقيقة** | فئات CSS صلبة ومغلقة | تخمينات إحصائية ونصوص عشوائية | **عقود YAML معيارية ومحددة حتمياً** |
| **ملكية الكود** | ارتهان لحزم `npm` المعقدة | نسخ ولصق هش لـ Tailwind | **ملكية برمجية كاملة** (بنمط shadcn عبر `qahera add`) |
| **دعم RTL واللغة العربية** | حلول ترقيعية ثانوية | أخطاء اتجاهية كارثية (`mr-*`, `ml-*`) | **بنية تحتية أصيلة:** خصائص منطقية 100% وخطوط معيارية |
| **كفاءة النماذج البرمجية** | قراءة آلاف فئات الـ CSS | تلوث بصري ورموز إيموجي مشتتة | **سياق ذكاء اصطناعي تصاعدي** (`ai/components.yaml`) |
| **التوافق متعدد البيئات** | محصورة في React أو CSS فقط | صعوبة النقل وإعادة الهيكلة | **تطابق دلالي تام عبر 6 مسارات** (React, PHP, HTML, HTMX, JS) |
| **الهوية البصرية والأيقونات** | خطوط أيقونات قديمة أو عشوائية | رموز إيموجي طفولية (🗑️, 🚀, ✕) | **حظر تام للإيموجي (`QAHERA-VISUAL-001`):** 46 أيقونة SVG معيارية |

---

<a id="بطاقة-الجودة-وصحة-المنظومة"></a>
## 📊 بطاقة الجودة وصحة المنظومة

```text
🏛️ فحص وضمان الجودة المعمارية الصارم (معتمد للإصدار v1.5.2)
══════════════════════════════════════════════════════════════════════════════════════
  ✓ التحقق من المخططات والمحددات    : 100% بنجاح (45 عقداً · 45 وصفة · 21 نمطاً · 46 أيقونة)
  ✓ فحص الأنواع الصارم TypeScript   : 100% بنجاح (0 أخطاء لكافة ملفات React والقوالب)
  ✓ تباين الألوان معايير WCAG AA    : 100% بنجاح (نسب التباين من 4.70:1 إلى 19.21:1)
  ✓ ميزانية الأداء لحزم الـ CSS     : 219.95 KB خام / 29.57 KB مضغوطة (الحد: <= 30 KB)
  ✓ بصمة سيرفرية 0kb RSC            : 32 مكون خادم نقي (0kb JS) + 15 مكون عميل معتمد
  ✓ التكافؤ الاتجاهي والقواعد المنطقية: 100% نظيف (0 خصائص فيزيائية محظورة)
  ✓ الانضباط الطباعي العربي         : 100% نظيف (حظر تام لخط Amiri، واعتماد Alexandria/Cairo)
  ✓ درجة الحوكمة والمجتمع السحابي   : 95 / 100 (المستوى الخامس: مشروع مفتوح المصدر ناضج)
══════════════════════════════════════════════════════════════════════════════════════
```

---

<a id="النموذج-المعماري-ومسارات-الإنتاج"></a>
## 🖼️ النموذج المعماري ومسارات الإنتاج

كل مكون في المنظومة يبدأ كعقد دلالي موثق وينساب برمجياً عبر محول قاهرة إلى جميع بيئات التشغيل دون أي تراجع أو اختلاف:

```text
                                  مصدر الحقيقة المعماري (YAML)
                      ┌─────────────────────────────────────────────────┐
                      │   contracts/components/*.yaml  (مفردات العقود)  │
                      │   tokens/*.yaml                (متغيرات التصميم)│
                      │   recipes/*.yaml               (الوصفات البصرية)│
                      │   icons/registry.yaml          (أيقونات SVG)     │
                      └────────────────────────┬────────────────────────┘
                                               │
                                 ⚡ محول قاهرة المعماري الموحد
                      ┌────────────────────────┴────────────────────────┐
                      │   المرحلة 1: اكتشاف الملفات وفحص الأنساب        │
                      │   المرحلة 2: التدقيق الصارم للمخططات والمحددات  │
                      │   المرحلة 3: دمج وحل مصفوفة المتغيرات التراكمية │
                      │   المرحلة 4: توليد سجلات الـ JSON والمانيفست    │
                      └────────────────────────┬────────────────────────┘
                                               │
       ┌───────────────────┬───────────────────┼───────────────────┬───────────────────┐
       ▼                   ▼                   ▼                   ▼                   ▼
 ⚛️ React 19 / RSC     🐘 PHP 8.x Plates   🌐 Native HTML/CSS   🧩 Alpine Behaviors  ⚙️ أداة الـ CLI
 32 مكون خادم نقي      20 قالباً ومساعداً   49 ملف CSS ذري      11 وحدة تفاعلية     `qahera add`
 0kb جافاسكريبت عميل   توافق PHP 8.2+      خصائص منطقية 100%    ربط الأحداث المباشر  ملكية الكود
```

---

<a id="المكونات-المعمارية-الـ-45"></a>
## 🏛️ المكونات المعمارية الـ 45

تلتزم المكونات الـ 45 بميثاق الجودة الصارم ومسارات العرض المتكاملة:

| # | المكون المعماري | التصنيف | ملف العقد المرجعي | الغرض المعماري الأساسي |
|---|---|---|---|---|
| 1 | **Accordion** | `disclosure` | [`Accordion.yaml`](contracts/components/Accordion.yaml) | تنظيم البيانات العميقة في ألواح رأسية قابلة للطي والفتح. |
| 2 | **Alert** | `feedback` | [`Alert.yaml`](contracts/components/Alert.yaml) | عرض رسائل وتنبيهات سياقية بارزة داخل تخطيط الصفحات. |
| 3 | **Avatar** | `media` | [`Avatar.yaml`](contracts/components/Avatar.yaml) | تمثيل بصري للمستخدم أو الفريق مع مؤشر الحالة اللحظي. |
| 4 | **BackToTop** | `navigation` | [`BackToTop.yaml`](contracts/components/BackToTop.yaml) | زر عائم يتتبع عمق التمرير للعودة السلسة لأعلى الصفحة. |
| 5 | **Badge** | `feedback` | [`Badge.yaml`](contracts/components/Badge.yaml) | وسوم مدمجة للمعلومات الوصفية والحالات العددية والتصنيفية. |
| 6 | **Breadcrumb** | `navigation` | [`Breadcrumb.yaml`](contracts/components/Breadcrumb.yaml) | مسار تصفح هرمي يوضح عمق الصفحة والانتقال للآباء. |
| 7 | **Button** | `actions` | [`Button.yaml`](contracts/components/Button.yaml) | أزرار الإجراءات مع 6 أنماط و 5 مقاسات وحالات التحميل. |
| 8 | **Callout** | `feedback` | [`Callout.yaml`](contracts/components/Callout.yaml) | كتل إرشادية وتأملية بارزة للملاحظات المعمارية والتحريرية. |
| 9 | **CanvasSparks** | `media` | [`CanvasSparks.yaml`](contracts/components/CanvasSparks.yaml) | مؤثرات بصرية حية لجسيمات مضيئة تتفاعل مع حركة الفأرة. |
| 10 | **Card** | `containers` | [`Card.yaml`](contracts/components/Card.yaml) | حاويات محتوى مع رأس وجسم وتذييل وحالات رفع بصري متعددة. |
| 11 | **Carousel** | `media` | [`Carousel.yaml`](contracts/components/Carousel.yaml) | شريط تمرير وسائط متجاوب يدعم اللمس ومؤشرات الترقيم. |
| 12 | **Checkbox** | `forms` | [`Checkbox.yaml`](contracts/components/Checkbox.yaml) | صندوق اختيار متعدد نفاذ يدعم الحالة غير المحددة. |
| 13 | **Chip** | `forms` | [`Chip.yaml`](contracts/components/Chip.yaml) | شرائح ترشيح واختيار مدمجة قابلة للإزالة والتفعيل. |
| 14 | **Divider** | `layout` | [`Divider.yaml`](contracts/components/Divider.yaml) | خط فاصل دلالي أفقي أو رأسي مع دعم إدراج عنوان مركزي. |
| 15 | **Dock** | `navigation` | [`Dock.yaml`](contracts/components/Dock.yaml) | شريط تنقل سفلي للهواتف المحمولة يسهل الوصول باللمس. |
| 16 | **Drawer** | `overlay` | [`Drawer.yaml`](contracts/components/Drawer.yaml) | درج جانبي ينزلق من حافة الشاشة للفلاتر والتصفح الإضافي. |
| 17 | **Dropdown** | `navigation` | [`Dropdown.yaml`](contracts/components/Dropdown.yaml) | قائمة عائمة تكشف إجراءات وروابط سياقية منبثقة. |
| 18 | **FileUpload** | `forms` | [`FileUpload.yaml`](contracts/components/FileUpload.yaml) | منطقة سحب وإفلات لرفع الملفات مع شريط تقدم وحالات تحقق. |
| 19 | **Input** | `forms` | [`Input.yaml`](contracts/components/Input.yaml) | حقل إدخال نصوص أحادي مع أيقونات بداية ونهاية وحالات الخطأ. |
| 20 | **Kbd** | `data-display`| [`Kbd.yaml`](contracts/components/Kbd.yaml) | وسوم دلالية لاختصارات لوحة المفاتيح وأزرار النظام. |
| 21 | **Megamenu** | `navigation` | [`Megamenu.yaml`](contracts/components/Megamenu.yaml) | لوحة تصفح عريضة متعددة الأعمدة للبوابات والمتاجر الكبرى. |
| 22 | **Menu** | `navigation` | [`Menu.yaml`](contracts/components/Menu.yaml) | قائمة روابط رأسية للأشرطة الجانبية والبطاقات والأدراج. |
| 23 | **Modal** | `overlay` | [`Modal.yaml`](contracts/components/Modal.yaml) | حوار تركيبي يحصر التركيز لتأكيد الإجراءات والعمليات الحرجة. |
| 24 | **Navbar** | `navigation` | [`Navbar.yaml`](contracts/components/Navbar.yaml) | شريط علوي للهوية وروابط التصفح الأساسية ودرج المحمول. |
| 25 | **Pagination** | `navigation` | [`Pagination.yaml`](contracts/components/Pagination.yaml) | تحكم في تقسيم صفحات الجداول والكتالوجات مع منتقي الحجم. |
| 26 | **Preloader** | `feedback` | [`Preloader.yaml`](contracts/components/Preloader.yaml) | شاشة تحميل تمهيدية غامرة مع شريط تقدم ونسبة مئوية رقمية. |
| 27 | **Progress** | `feedback` | [`Progress.yaml`](contracts/components/Progress.yaml) | شريط تقدم بصري يدعم الحالات المحددة وغير المحددة. |
| 28 | **Radio** | `forms` | [`Radio.yaml`](contracts/components/Radio.yaml) | أزرار خيارات أحادية حصرية مع ملصقات وصفية نفاذة. |
| 29 | **Rating** | `feedback` | [`Rating.yaml`](contracts/components/Rating.yaml) | تقييم تفاعلي بالنجوم يدعم وضع القراءة ووضع التعديل الحي. |
| 30 | **Ribbon** | `data-display`| [`Ribbon.yaml`](contracts/components/Ribbon.yaml) | شريط زاوية مائل يثبت على أطراف البطاقات لتمييز الحالة. |
| 31 | **Select** | `forms` | [`Select.yaml`](contracts/components/Select.yaml) | قائمة اختيار منسدلة أنيقة تدعم المجموعات والتعطيل. |
| 32 | **Skeleton** | `feedback` | [`Skeleton.yaml`](contracts/components/Skeleton.yaml) | هيكل تحميل رمادي يحاكي أبعاد المكون أثناء جلب البيانات. |
| 33 | **Spinner** | `feedback` | [`Spinner.yaml`](contracts/components/Spinner.yaml) | مؤشر دوران نقي بتقنية CSS يعبر عن المعالجة اللحظية. |
| 34 | **Stepper** | `navigation` | [`Stepper.yaml`](contracts/components/Stepper.yaml) | شريط خطوات متسلسل يوضح مراحل إتمام المعاملات والنماذج. |
| 35 | **Switch** | `forms` | [`Switch.yaml`](contracts/components/Switch.yaml) | مفتاح تبديل ثنائي سلس بانتقالات فيزيائية ووصولية تامة. |
| 36 | **Table** | `data-display`| [`Table.yaml`](contracts/components/Table.yaml) | جدول بيانات متقدم يدعم الصفوف المخططة والحدود والرؤوس الثابتة. |
| 37 | **Tabs** | `navigation` | [`Tabs.yaml`](contracts/components/Tabs.yaml) | تبويبات تنقل متوافقة مع اتجاه أسهم لوحة المفاتيح في LTR و RTL. |
| 38 | **Textarea** | `forms` | [`Textarea.yaml`](contracts/components/Textarea.yaml) | حقل إدخال نصوص متعدد الأسطر مع عداد أحرف وتكيف الارتفاع. |
| 39 | **Timeline** | `data-display`| [`Timeline.yaml`](contracts/components/Timeline.yaml) | شريط أحداث زمني يربط المحطات والأنشطة بروابط بصرية. |
| 40 | **Toast** | `feedback` | [`Toast.yaml`](contracts/components/Toast.yaml) | إشعارات حية عائمة تختفي تلقائياً مع دعم النغمات الدلالية. |
| 41 | **Tooltip** | `overlay` | [`Tooltip.yaml`](contracts/components/Tooltip.yaml) | بالون تلميح سياقي يظهر عند التحويم والتركيز بالاتجاهات الأربعة. |
| 42 | **Treeview** | `navigation` | [`Treeview.yaml`](contracts/components/Treeview.yaml) | مستعرض هرمي للمجلدات والتصنيفات العميقة مع إمكانية الطي والفتح. |
| 43 | **Cartouche** | `heritage` | [`cartouche.yaml`](contracts/components/cartouche.yaml) | خرطوشة ملكية مصرية لإبراز العناوين والنصوص الملكية والنقوش الهيروغليفية. |
| 44 | **Frieze** | `heritage` | [`frieze.yaml`](contracts/components/frieze.yaml) | شريط إفريز معماري تراثي بزخارف هندسية وزهور لوتس متكررة للفواصل والإطارات. |
| 45 | **Seal** | `heritage` | [`seal.yaml`](contracts/components/seal.yaml) | ختم رسمي وميدالية ملكية مصرية بنقش بارز ونصوص دائرية للاعتماد والتوثيق. |

---

<a id="الأنماط-التركيبية-الـ-21"></a>
## 🧩 الأنماط التركيبية الـ 21

أنماط واجهة مركبة مبنية حصراً من المكونات المعمارية الأساسية لضمان التناسق:

1. **ConfirmationDialog** (`patterns/confirmation.yaml`): حوار تأكيد مركب لحماية العمليات غير القابلة للتراجع.
2. **DataTableToolbar** (`patterns/data-table-toolbar.yaml`): شريط أدوات الجداول (بحث، إجراءات جماعية، ومبدل الكثافة).
3. **FilterBar** (`patterns/filter-bar.yaml`): شريط فلاتر متعدد الأبعاد مع شرائح قابلة للإزالة.
4. **SearchToolbar** (`patterns/search-toolbar.yaml`): شريط بحث ذكي لحظي مع إشارات اختصارات المفاتيح (`⌘K`).
5. **DashboardStat** (`patterns/dashboard-stat.yaml`): بطاقة إحصائية لمؤشرات الأداء مع نسب التغير ومخطط بياني مصغر.
6. **ChatStream** (`patterns/chat-stream.yaml`): موجز رسائل تفاعلي يدعم مؤشرات التدفق اللحظي للذكاء الاصطناعي.
7. **EmptyState** (`patterns/empty-state.yaml`): واجهة إرشادية جذابة للقوائم الفارغة مع زر دعوة للإجراء.
8. **FormActions** (`patterns/form-actions.yaml`): شريط إجراءات النماذج الثابت أو المضمن (حفظ، إلغاء، وإعادة تعيين).
9. **KanbanBoard** (`patterns/kanban-board.yaml`): لوحة كانبان متعددة الأعمدة لإدارة تقدم المهام بالسحب والإفلات.
10. **LuxuryProductCard** (`patterns/luxury-product-card.yaml`): بطاقة منتج فاخرة للمتاجر الإلكترونية الراقية.
11. **MetricComparisonGrid** (`patterns/metric-comparison-grid.yaml`): شبكة مقارنة المؤشرات للأنظمة السحابية والشركات.
12. **DatePaginator** (`patterns/date-paginator.yaml`): شريط تنقل زمني يومي لجدولة العمليات والمواعيد.
13. **EditorialStory** (`patterns/editorial-story.yaml`): تخطيط مجلات وصحافة رقمية مع نصوص استهلالية واقتباسات.
14. **FileManagerGrid** (`patterns/file-manager-grid.yaml`): شبكة مستعرض الملفات والمجلدات مع القوائم السياقية.
15. **Questionnaire** (`patterns/questionnaire.yaml`): تدفق استبيان وتأهيل متعدد الخطوات للمستخدمين.
16. **SortableList** (`patterns/sortable-list.yaml`): قائمة صفوف تفاعلية قابلة لإعادة الترتيب.
17. **StoreLocator** (`patterns/store-locator.yaml`): مستكشف فروع تفاعلي مع بطاقات المتاجر والتفاصيل.
18. **UserCard** (`patterns/user-card.yaml`): بطاقة مستخدم مدمجة تلخص المؤشرات الاجتماعية وإجراءات المتابعة.
19. **VipMembership** (`patterns/vip-membership.yaml`): بطاقة عضوية فاخرة تبرز المزايا والمستويات الحصرية.
20. **PaginationPattern** (`patterns/pagination.yaml`): شريط ترقيم صفحات متكامل للجداول مع التحكم في القفز بين الصفحات.
21. **HeroSkylinePanorama** (`patterns/hero-skyline-panorama.yaml`): بانوراما أفق القاهرة السينمائية مع تدرجات لونية، شارات مميزة، وأزرار إجراء مزدوجة.

---

<a id="أطلس-أحياء-القاهرة-المعماري-12-ثيما"></a>
## 🏙️ أطلس أحياء القاهرة المعماري (12 ثيماً)

تنفرد المنظومة بمعمارية **التضاريس الثيمية (`QAHERA-THEME-001`)** حيث يجسد كل ثيم حركة تصميم عالمية ممزوجة بسياق عمراني وثقافي مصري أصيل:

| ثيم الحي المعماري | الحركة التصميمية العالمية | الأساسي النهاري | الأساسي الليلي | نصف قطر الحواف | الطابع والسمة البصرية |
|---|---|---|---|---|---|
| **جاردن سيتي (Garden City)** | Belle Époque الكلاسيكية الأوروبية | `#1E3A8A` | `#3B82F6` | `12px` (هادئ) | هدوء استعماري عريق، وظلال ناعمة مرتفعة |
| **الزمالك (Zamalek)** | النيو-كلاسيكية وفخامة الجزيرة | `#D4AF37` | `#F59E0B` | `10px` (ملكي) | ذهب الشمبانيا، أسطح أوبسيديان سوداء، وعمق فاخر |
| **وسط البلد (Downtown)** | آرت ديكو وعمارة الخديوي إسماعيل | `#B45309` | `#C29B38` | `0px` (حواف حادة) | حواف معمارية حادة تماماً، نحاس أثري، وتباين صلب |
| **هليوبوليس (Heliopolis)** | طراز البارون إمبان ومصر الجديدة | `#C2410C` | `#EA580C` | `10px` (دافئ) | دفء التراكوتا والرمال الصحراوية، وأقواس متزنة |
| **المعادي (Maadi)** | ضاحية الحدائق والتناغم العضوي | `#15803D` | `#22C55E` | `18px` (انسيابي) | خضرة وارفة، زوايا انسيابية طبيعية، وألوان مهدئة |
| **روكسي (Roxy)** | حداثة منتصف القرن التجارية | `#7C3AED` | `#8B5CF6` | `10px` (حيوي) | حداثة تجارية مبهجة، وتباين جريء باللون البنفسجي |
| **السكاكيني (Sakakini)** | قصر السكاكيني وفخامة الروكوكو | `#BE185D` | `#F43F5E` | `14px` (روكوكو) | انعكاسات نيون مضيئة، وزجاج منكسر دافئ |
| **الحسين (El Hussein)** | القاهرة الفاطمية والتاريخ الإسلامي | `#991B1B` | `#DC2626` | `8px` (أرابيسك) | كستنائي دافئ، وذهب فاطمي عتيق، ووقار هندسي |
| **شبرا (Shubra)** | النيو-بروتاليزم المصري الشعبي | `#374151` | `#6B7280` | `0px` (كتلي) | إطارات داكنة صلبة، وظلال كتلية غير مموهة |
| **الزيتون (El Zaytoun)** | الهندسة الوظيفية المتوازنة | `#0284C7` | `#38BDF8` | `8px` (عملي) | أزرق كلاسيكي نقي، وحسابات هندسية واضحة |
| **المرج (El Marg)** | واحة النخيل والتراث الريفي | `#047857` | `#10B981` | `14px` (نخيل) | خضرة النخيل العتيق، وإطارات مذهبة ناعمة |
| **القاهرة الجديدة (New Cairo)** | الحداثة التقنية والواجهات الزجاجية | `#06B6D4` | `#22D3EE` | `22px` (زجاجي) | زجاج مضبب (Blur 22px)، وهالات سيان نيون مشعة |

*تفعيل أي ثيم فورياً عبر وسوم الـ HTML:*
```html
<html data-theme="zamalek"> <!-- يبدل كافة المتغيرات اللحظية -->
```

---

<a id="دليل-البدء-السريع-وقنوات-التوزيع"></a>
## 🚀 دليل البدء السريع وقنوات التوزيع

توفر منظومة القاهرة 3 قنوات توزيع متكاملة تمنحك الملكية الكاملة للكود المصدري دون أي ارتباط تشغيلي:

<a id="1-أداة-سطر-الأوامر-عبر-npx-بنمط-shadcn-المعاصر"></a>
### 1. أداة سطر الأوامر عبر `npx` (بنمط shadcn المعاصر)

تهيئة ملفات الـ Tokens والـ CSS وتضمين مهارة الذكاء الاصطناعي تلقائياً في مشروعك:

```bash
# 1. تهيئة المشروع (إنشاء qahera.json و tokens.css ودمج مهارة .agents/skills/qahera-ui)
npx qahera-ui init --target=react

# 2. إضافة المكونات مباشرة إلى شجرة كود مشروعك
npx qahera-ui add button modal card --target=react

# 3. إضافة المكونات إلى مشاريع PHP Plates / Monolith
npx qahera-ui add button alert navbar --target=php --dest=./views/qahera

# 4. إضافة الأنماط التركيبية أو القوالب الجاهزة
npx qahera-ui add pattern:dashboard-stat --target=react
npx qahera-ui add template:admin --target=react

# 5. استعراض قائمة الـ 45 مكوناً و 21 نمطاً و 20 قالباً
npx qahera-ui list

# 6. توليد خريطة الرموز الذكية لـ VS Code و Cursor و Antigravity
npx qahera-ui build:css-data
```

> [!TIP]
> **التضمين التلقائي لمهارة الذكاء الاصطناعي**: تشغيل أمر `npx qahera-ui init` يقوم تلقائياً بنسخ مجلد `.agents/skills/qahera-ui` داخل مشروعك، ليصبح وكيل الذكاء الاصطناعي في محررك (**Google Antigravity أو Cursor أو Claude Code**) خبيراً فورياً في كتابة وتركيب مكونات القاهرة عبر الأمر `/qahera-ui`.

#### أوامر وكيل الذكاء الاصطناعي البرمجي (`/qahera-ui`)

| الأمر / المدخل | مسار العمل في المهارة | الوصف والمخرجات |
|---|---|---|
| `/qahera-ui compose [screen]` | `compose-screen.md` | توليد شاشات إنتاجية متكاملة اعتماداً حصرياً على المكونات والأنماط المعيارية. |
| `/qahera-ui pattern [name]` | `patterns-catalog.md` | بناء وتركيب أي نمط من الأنماط الـ 20 التركيبية (مثل `DataTableToolbar`, `ChatStream`). |
| `/qahera-ui theme [neighborhood]` | `tokens/themes/*.yaml` | تفعيل ومعاينة أي ثيم من ثيمات أطلس القاهرة الـ 12 (مثل `zamalek`, `downtown`). |
| `/qahera-ui audit` | `audit-kit.md` | فحص الالتزام المعماري الصارم بالمحددات الـ 17 غير القابلة للتفاوض. |
| `/qahera-ui scaffold [name]` | `author-component.md` | إنشاء وتوليد مكون جديد عبر دورة العقود الصارمة لكافة المسارات الستة. |


<a id="2-التضمين-الفوري-عبر-شبكات-التوزيع-cdn-quickstart-بدون-أي-أدوات-بناء"></a>
<a id="2-كود-html-الأصيل-ومتغيرات-css"></a>
### 2. التضمين الفوري عبر شبكات التوزيع (CDN Quickstart - بدون أي أدوات بناء)

لصفحات الهبوط الثابتة، أو قوالب ووردبريس، أو مشاريع PHP التقليدية، أو التجارب السريعة دون الحاجة لتثبيت Node.js أو أدوات التحزيم، يمكنك تضمين قاهرة مباشرة عبر شبكات الـ CDN العالمية الفائقة السرعة.

#### الطبقات المعمارية الثلاث لملفات الـ CSS

يتم توزيع ملفات قاهرة عبر ثلاث طبقات معمارية دلالية مستقلة:

| حزمة التوزيع | رابط jsDelivr السريع | رابط unpkg المباشر | الوظيفة المعمارية |
|---|---|---|---|
| **رموز التصميم (Tokens)** | `https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera-tokens.min.css` | `https://unpkg.com/qahera-ui@1.5.3/dist/qahera-tokens.min.css` | الرموز الأولية الشاملة (سلم الألوان، الخطوط، المسافات، الظلال). |
| **سمات أحياء القاهرة (Themes)** | `https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera-themes.min.css` | `https://unpkg.com/qahera-ui@1.5.3/dist/qahera-themes.min.css` | أطلس السمات الـ 12 المستوحاة من أحياء القاهرة وتراثها (`[data-theme="..."]`). |
| **المكونات المعمارية (Components)** | `https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera.min.css` | `https://unpkg.com/qahera-ui@1.5.3/dist/qahera.min.css` | كافة أنماط المكونات الـ 45 الذرية المعيارية بأصناف `qhr-*`. |

> [!TIP]
> **تثبيت الإصدار مقابل التحديث التلقائي:** يُوصى بتثبيت الإصدار `@1.5.3` لضمان الاستقرار التام في الإنتاج، أو استخدام `@latest` لتلقي التحسينات والإصلاحات الطفيفة تلقائياً.

#### كود البداية المتكامل الجاهز للتشغيل المباشر (HTML5 Boilerplate)

انسخ هذا الكود بالكامل وضعه في أي ملف `.html` وافتحه مباشرة في متصفحك:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="zamalek" data-mode="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>البدء الفوري مع قاهرة عبر CDN</title>

  <!-- الخطوط الرسمية: Alexandria للعناوين و Cairo للنصوص -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- 1. رموز التصميم ومصفوفة الارتفاعات -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera-tokens.min.css">

  <!-- 2. أطلس أحياء القاهرة المعماري الـ 12 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera-themes.min.css">

  <!-- 3. ورقة أنماط المكونات المعمارية الـ 45 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.5.3/dist/qahera.min.css">

  <!-- اختياري: مكتبة السلوك التفاعلي Alpine.js للمكونات التفاعلية (Dropdown, Modal, Accordion) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--qhr-surface-page, #0A0D14); color: var(--qhr-text-primary, #F8FAFC); font-family: var(--qhr-font-body, 'Cairo', sans-serif); padding: 2rem;">

  <div class="qhr-card qhr-card--elevated" style="max-width: 640px; margin: 0 auto; padding: 2rem;">
    <span class="qhr-badge qhr-badge--primary qhr-badge--pill">تضمين فوري v1.5.3</span>
    
    <h1 style="font-family: var(--qhr-font-heading, 'Alexandria', sans-serif); margin-block: 1rem 0.5rem; font-size: 1.75rem;">
      منظومة قاهرة عبر شبكة الـ CDN العالمية
    </h1>
    
    <p style="color: var(--qhr-text-secondary); line-height: 1.7; margin-block-end: 1.5rem;">
      واجهة عربية معمارية أصيلة تعمل فورياً دون أي تثبيت لحزم Node.js. يمكنك التبديل بين اللغات والاتجاهات (<code style="font-family: monospace;">dir="rtl"</code> / <code style="font-family: monospace;">dir="ltr"</code>) والسمات المعمارية الـ 12 (<code style="font-family: monospace;">data-theme="zamalek"</code>) بمرونة مطلقة.
    </p>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button class="qhr-btn qhr-btn--primary qhr-btn--md" type="button">
        زر رئيسي / Primary Action
      </button>
      <button class="qhr-btn qhr-btn--outline qhr-btn--md" type="button">
        زر ثانوي / Outline
      </button>
    </div>
  </div>

</body>
</html>
```

<a id="3-محرك-قوالب-php-plates"></a>
### 3. محرك قوالب PHP Plates (حزمة Packagist / Composer)

التثبيت المباشر في مشاريع PHP (Laravel, FlightPHP, Slim, WordPress):

```bash
composer require alwkala/qahera-ui
```

تسجيل الإضافة المعيارية في محرك Plates:

```php
use League\Plates\Engine;
use Qahera\Renderers\Plates\QaheraPlatesExtension;

$templates = new Engine(__DIR__ . '/views');
$templates->loadExtension(new QaheraPlatesExtension());

// داخل قالب العرض:
echo $this->qhrButton([
    'label'   => 'تأكيد الحجز',
    'variant' => 'primary',
    'size'    => 'lg',
    'icon'    => 'check'
]);

echo $this->qhrModal([
    'id'    => 'checkoutDialog',
    'title' => 'إتمام الطلب',
    'body'  => '<p>تفاصيل الفاتورة المعمارية...</p>'
]);
```

<a id="4-بيئة-react-ومكونات-الخادم-0kb-rsc"></a>
### 4. بيئة React ومكونات الخادم 0kb RSC

```tsx
import { Button } from '@/components/qahera/Button';
import { Card } from '@/components/qahera/Card';
import { Modal } from '@/components/qahera/Modal'; // مكون عميل معتمد

export default function DashboardPage() {
  return (
    <Card elevation="elevated">
      <Card.Header title="لوحة التحكم المعمارية" subtitle="إصدار قاهرة 1.5.0" />
      <Card.Body>
        <Button variant="primary" size="md">
          إصدار التقرير
        </Button>
      </Card.Body>
    </Card>
  );
}
```

<a id="5-عناصر-الويب-المعيارية-web-components"></a>
### 5. عناصر الويب المعيارية (Web Components)

```html
<script type="module" src="renderers/js/index.js"></script>

<qhr-button variant="primary" size="md">
  إجراء معياري
</qhr-button>

<qhr-badge tone="success" size="sm">
  نشط الآن
</qhr-badge>
```

<a id="6-خريطة-الرموز-الذكية-والإكمال-التلقائي-في-المحررات"></a>
### 6. خريطة الرموز الذكية والإكمال التلقائي في المحررات (VS Code / Cursor / Antigravity)

تتيح قاهرة تكاملاً معمارياً فريداً مع محررات الأكواد الحديثة (**Visual Studio Code, Cursor, Google Antigravity IDE**) عبر ملف خريطة الرموز الذكية `qahera.css-data.json` المعتمد وفق مواصفة **CSS Custom Data v1.1**:

```json
// في ملف .vscode/settings.json بمشروعك
{
  "css.customData": [
    "./node_modules/qahera-ui/dist/qahera.css-data.json"
  ],
  "editor.quickSuggestions": {
    "strings": true,
    "other": true,
    "comments": false
  }
}
```

#### ماذا يحصل المطور عند كتابة `--qhr-`؟
- **إكمال تلقائي فوري (Autocomplete):** اقتراح كافة الرموز الـ 325 المعتمدة مع تصنيفاتها الدلالية.
- **بطاقة توثيق تفاعلية غنية (Markdown Hover Card):**
  - **الهوية التراثية:** توثيق كامل للخامات الفرعونية الأصيلة (الوَدج، النِبو، الخِسبِد، الطمي، البردي، الكحل) مع معانيها الرمزية.
  - **القيم الصريحة ثنائية الوضع:** القيمة اللونية الدقيقة لنمط النهار (Day) ونمط الليل (Night).
  - **قواعد الحوكمة الصارمة:** تذكير مباشر بالخصائص المنطقية (`padding-inline`, `margin-block`) والتنبيه بمنع الخصائص الفيزيائية.
  - **أمثلة كود فورية:** قوالب جاهزة للنسخ السريع بصيغة `var(--qhr-...)`.

لتوليد الخريطة بعد أي تحديث لمتغيرات الـ YAML:
```bash
npx qahera-ui build:css-data
```

---

<a id="وثائق-المواصفات-المعمارية-التفصيلية"></a>
## 📖 وثائق المواصفات المعمارية التفصيلية

تخضع منظومة قاهرة لحزمة مواصفات حاكمة في مجلد [`docs/`](docs/):

| وثيقة المواصفات | النطاق والمجال المعماري | المعيار المعتمد |
|---|---|---|
| **[00-BRAND-POSITIONING.md](docs/00-BRAND-POSITIONING.md)** | هوية الاستوديو، الجذور الثقافية المصرية، والسيادة البرمجية | Alwkala Manifesto |
| **[01-TOKEN-SPEC.md](docs/01-TOKEN-SPEC.md)** | هرمية المتغيرات ثلاثية المستويات (`--qhr-*`)، الألوان والمسافات | W3C DTCG Format |
| **[02-COMPONENT-SPEC.md](docs/02-COMPONENT-SPEC.md)** | تشريح عقود المكونات، المقابس، الخصائص، وبيانات الذكاء الاصطناعي | مخططات YAML المعتمدة |
| **[03-RECIPE-SPEC.md](docs/03-RECIPE-SPEC.md)** | ربط الحالات البصرية، استدعاء المتغيرات، وقواعد المحددات الذرية | Atomic Scoped CSS |
| **[04-BEHAVIOR-SPEC.md](docs/04-BEHAVIOR-SPEC.md)** | تفاعلات Alpine.js المستقلة والبرمجة بالأحداث المباشرة | `QAHERA-ALPINE-001` |
| **[05-RENDERER-SPEC.md](docs/05-RENDERER-SPEC.md)** | الترجمة متعددة المسارات (React, PHP, HTML, HTMX, JS) | تطابق دلالي 100% |
| **[06-AI-SPEC.md](docs/06-AI-SPEC.md)** | بروتوكول اكتشاف سياق الذكاء الاصطناعي التصاعدي من 4 مستويات | كفاءة استهلاك الرموز |
| **[07-ACCESSIBILITY-SPEC.md](docs/07-ACCESSIBILITY-SPEC.md)** | معايير النفاذية WCAG 2.1 AA، أدوار ARIA، وفحص التباين | تباين $\ge 4.5:1$ |
| **[08-RTL-SPEC.md](docs/08-RTL-SPEC.md)** | محددات الخصائص المنطقية Logical CSS وضوابط الخطوط العربية | خصائص منطقية حصراً |
| **[09-CLI-SPEC.md](docs/09-CLI-SPEC.md)** | معمارية محرك التوزيع وسطر الأوامر (`qahera add / init`) | ملكية الكود المصدرية |
| **[10-MCP-SPEC.md](docs/10-MCP-SPEC.md)** | أدوات بروتوكول سياق النماذج (MCP) للوكلاء الأذكياء | JSON-RPC Stdio 2.0 |
| **[11-GOVERNANCE.md](docs/11-GOVERNANCE.md)** | بوابات فحص الجودة، سياسات الاعتماد، ومعايير القبول | ميثاق الإنجاز (DoD) |
| **[12-CONTRIBUTING.md](docs/12-CONTRIBUTING.md)** | خطوات التهيئة المحلية، قوائم مراجعة الـ PR، ومعايير الكود | سياسة خلو العيوب التام |
| **[STATUS.md](docs/STATUS.md)** | تقرير الحالة اللحظي، تعداد المكونات، وتغطية الاختبارات | تدقيق الجودة الشامل |

---

<a id="المحددات-المعمارية-الـ-17-غير-القابلة-للتفاوض"></a>
## 🛡️ المحددات المعمارية الـ 17 غير القابلة للتفاوض

تخضع كافة التعديلات والتطويرات لـ 17 محدداً صارماً موثقة في [`AGENTS.md`](AGENTS.md):

1. **عقود YAML هي المرجع النهائي:** ملفات الـ YAML هي المصدر الأوحد للحقيقة؛ والـ JSON يُولّد للتبادل الآلي فقط.
2. **يُحظر تعديل الملفات المولدة يدوياً:** تُصحح الأخطاء في `contracts/` أو `recipes/` ثم يعاد التوليد.
3. **المتغيرات تسبق التنسيق:** حظر تام لقيم الألوان الصلبة (Hex) أو المسافات بالبكسل؛ الاعتماد الحصري على `--qhr-*`.
4. **العقود تسبق التنفيذ البرمجي:** لا وجود لأي مكون دون عقد موثق في `contracts/components/`.
5. **الاتجاه بنية تحتية وليس ثيماً:** التكافؤ ثنائي الاتجاه مبني في الصميم بالخصائص المنطقية (`margin-inline-start`, إلخ).
6. **الانضباط الطباعي العربي:** الاعتماد الحصري على خطوط Alexandria (للعناوين) و Cairo (للنصوص والواجهات) مع الحظر القطعي لخط Amiri.
7. **التراث ينتمي للقوالب:** تبقى المكونات محايدة ونظيفة، بينما تظهر الزخارف والهوية في القوالب والثيمات.
8. **صفر اختلاف في المفردات:** تبقى مسميات الخصائص متطابقة تماماً عبر جميع مسارات العرض الستة.
9. **ملكية الكود تسبق الارتهان:** تنسخ المشاريع الشفرة وتمتلكها دون فرض مكتبات تشغيل خارجية.
10. **بيانات الذكاء الاصطناعي إلزامية:** يوثق كل مكون الغرض (WHAT)، وحالات الاستخدام (WHEN)، وموانع الاستخدام (WHY NOT).
11. **الأيقونات معمارية معيارية وليست إيموجي (`QAHERA-VISUAL-001`):** حظر قاطع للرموز التعبيرية؛ والاعتماد الحصري على 46 أيقونة SVG في `icons/registry.yaml`.
12. **معمارية الـ CSS الذرية وبصمة 0kb RSC:** كل مكون يمتلك ملفه المنفصل، ومكونات React تحافظ على بصمة 0kb للعميل.
13. **التكوين المعياري الصارم (`QAHERA-COMP-001`):** تبنى المعارض والقوالب حصراً من المكونات والأنماط المسجلة في المنظومة.
14. **بروتوكول تفاعلات Alpine.js (`QAHERA-ALPINE-001`):** حظر الكتل الكبيرة في السمات المضمنة، وضمان مفاتيح قوالب فريدة.
15. **التضاريس الثيمية (`QAHERA-THEME-001`):** ترتبط الثيمات الـ 12 بحركات تصميم عالمية وسياق عمراني مصري أصيل.
16. **حماية مفسرات الـ HTML (`QAHERA-SCRIPT-001`):** حظر تضمين وسوم إغلاق `</script>` في سلاسل جافاسكريبت؛ وقراءة الكود من الـ DOM مباشرة.
17. **فض تعارض مسميات التصدير (`QAHERA-BARREL-001`):** تمييز المكونات البدائية عن الأنماط المركبة التي تحمل نفس الاسم عند التصدير.

---

<a id="خارطة-الطريق-roadmap"></a>
## 🗺️ خارطة الطريق (Roadmap)

| الإصدار | التركيز المعماري | النطاق والمخرجات المنجزة | الحالة | تاريخ الإصدار |
|---|---|---|---|---|
| **v1.0.0** | النواة التأسيسية والعقود | 38 عقداً، 41 أيقونة، متغيرات التصميم الثلاثية، والمحول | **مكتمل** | أغسطس 2026 |
| **v1.4.0** | استوديو أحياء القاهرة السيادي | 12 ثيماً مصرياً، محاكي الشاشات، ومصفوفة أنصاف الأقطار | **مكتمل** | سبتمبر 2026 |
| **v1.5.0** | مولد المعاينات الشامل v3.0 | 42 مكوناً، 20 نمطاً، مركز الاستعراض بـ 78 عنصراً، وحوكمة المستوى 5 | **مكتمل** | 7 سبتمبر 2026 |
| **v1.5.1** | محرك الـ CLI وتثبيت المهارة | إطلاق `npx qahera-ui` على NPM، ومحرك الثنائي، ومهارة الذكاء الاصطناعي السيادية | **مكتمل** | **12 سبتمبر 2026** |
| **v1.5.2** | تكافؤ أنماط React ونظافة المستودع | 21/21 نمط React، وفهرسة 45 مكوناً بالذكاء الاصطناعي، وخلو كامل من أخطاء TypeScript | **مكتمل** | **17 سبتمبر 2026** |
| **v1.5.3** | حزمة Packagist والـ CDN ومزامنة المنصة | إطلاق `composer.json` الرسمي، روابط الـ CDN الفورية، وتكافؤ التوثيق العربي على NPM ومزامنة الحالة | **مكتمل** | **17 سبتمبر 2026** |
| **v1.5.4** | خريطة الرموز الذكية لـ VS Code واستوديو القاهرة | توليد `qahera.css-data.json`، إكمال تلقائي لـ 325 رمزاً، أمر `build:css-data`، وتحسينات تباين الاستوديو | **مكتمل** | **17 سبتمبر 2026** |
| **v1.6.0** | مزامنة Figma و Tokens Studio | ربط فكتور ثنائي الاتجاه، وجلب المتغيرات التلقائي | *مخطط* | الربع الرابع 2026 |
| **v2.0.0** | محرك التوليد الذكي للوكلاء | خادم MCP أصيل، وتوليد البرمجيات من المطالبات الفورية | *رؤية مستقبلية* | الربع الأول 2027 |

---

<a id="المساهمة-وصحة-المجتمع"></a>
## 🤝 المساهمة وصحة المجتمع

نرحب بمساهمات المطورين الملتزمة بالانضباط المعماري للمنظومة:
1. راجع **[دليل المساهمة (CONTRIBUTING.md)](CONTRIBUTING.md)** وميثاق الحوكمة **[AGENTS.md](AGENTS.md)**.
2. اقرأ **[ميثاق سلوك المساهمين (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md)**.
3. راجع **[سياسة الأمان والإبلاغ عن الثغرات (SECURITY.md)](SECURITY.md)**.
4. تأكد من اجتياز كافة الاختبارات المحلية بنسبة 100%:
   ```bash
   npm run typecheck && node bin/qahera.js test
   ```

---

<a id="قنوات-التواصل-والروابط-الرسمية"></a>
## 📞 قنوات التواصل والروابط الرسمية

* **الاستوديو والمالك المعماري:** [استوديو الوكالة (Alwkala)](https://github.com/alwkala)
* **الدعم الفني والاستفسارات المهنية:** [alwkala@outlook.com](mailto:alwkala@outlook.com)
* **المستودع البرمجي:** [github.com/alwkala/Qahera-UI-Kit](https://github.com/alwkala/Qahera-UI-Kit)
* **سجل الإصدارات:** [GitHub Releases](https://github.com/alwkala/Qahera-UI-Kit/releases)
* **لوحة البلاغات:** [GitHub Issues](https://github.com/alwkala/Qahera-UI-Kit/issues)

---

<a id="الترخيص"></a>
## 📜 الترخيص

تخضع المنظومة لترخيص **[MIT License](LICENSE)**. حقوق النشر © 2026 استوديو الوكالة. كافة الحقوق محفوظة.

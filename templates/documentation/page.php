<?php
/**
 * Qahera UI Kit — Technical Documentation Site (League/Plates Template)
 * 
 * Hierarchical navigation sidebar, docblocks, code samples, and specifications.
 * 
 * @var \League\Plates\Template\Template $this
 */
?>
<div class="qhr-docs-page" style="min-height: 100vh; background: var(--qhr-surface-page, #0A0A0A); color: var(--qhr-text-primary, #FFFFFF); font-family: var(--qhr-font-family-primary, 'Cairo', sans-serif);">

  <?= $this->insert('qahera::navbar', [
      'brand'   => ['title' => 'توثيق قاهرة المعماري', 'avatar' => 'ق'],
      'links'   => [
          ['label' => 'المعايير والتوثيق', 'href' => '#', 'active' => true],
          ['label' => 'الوصفات (Recipes)', 'href' => '#'],
          ['label' => 'الأنماط المركبة', 'href' => '#'],
          ['label' => 'القوالب الجاهزة', 'href' => '#'],
      ],
      'actions' => '<button type="button" class="qhr-btn qhr-btn--primary qhr-btn--sm"><span>بدء التثبيت</span></button>',
  ]) ?>

  <div style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 260px 1fr 220px; gap: var(--qhr-space-8); padding: var(--qhr-space-6);">
    
    <!-- Sidebar -->
    <aside style="border-inline-end: 1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08)); padding-inline-end: var(--qhr-space-4);">
      <div style="margin-bottom: var(--qhr-space-4);">
        <?= $this->insert('qahera::patterns/search-toolbar', [
            'placeholder' => 'بحث في المعايير...',
        ]) ?>
      </div>

      <nav style="display: flex; flex-direction: column; gap: var(--qhr-space-6);">
        <div>
          <h4 style="font-size: 0.8125rem; font-weight: 700; color: var(--qhr-text-muted); margin: 0 0 var(--qhr-space-2);">
            الرموز التصميمية (Tokens)
          </h4>
          <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px;">
            <li>
              <a href="#" style="display: block; padding: 6px 12px; border-radius: 6px; background: rgba(212, 175, 55, 0.12); color: var(--qhr-color-primary-400, #D4AF37); text-decoration: none; font-weight: 700; font-size: 0.875rem;">
                المعمارية والهيكلة
              </a>
            </li>
            <li>
              <a href="#" style="display: block; padding: 6px 12px; border-radius: 6px; color: var(--qhr-text-secondary); text-decoration: none; font-size: 0.875rem;">
                لوحة الألوان والخامات
              </a>
            </li>
            <li>
              <a href="#" style="display: block; padding: 6px 12px; border-radius: 6px; color: var(--qhr-text-secondary); text-decoration: none; font-size: 0.875rem;">
                الخطوط والطباعة العربية
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Content -->
    <main style="min-width: 0; padding-inline: var(--qhr-space-4);">
      <div style="display: flex; gap: var(--qhr-space-2); font-size: 0.875rem; color: var(--qhr-text-muted); margin-bottom: var(--qhr-space-4);">
        <span>التوثيق</span>
        <span>/</span>
        <span>الرموز التصميمية</span>
        <span>/</span>
        <span style="color: var(--qhr-color-primary-400, #D4AF37);">المعمارية والهيكلة</span>
      </div>

      <h1 style="font-size: 2.25rem; font-weight: 800; margin: 0 0 var(--qhr-space-3); color: var(--qhr-text-primary);">
        معمارية الرموز التصميمية (Design Tokens Architecture)
      </h1>

      <p style="font-size: 1.0625rem; line-height: 1.7; color: var(--qhr-text-secondary); margin: 0 0 var(--qhr-space-6);">
        تعد الرموز التصميمية (Tokens) في نظام قاهرة مصدر الحقيقة الأوحد لكافة المتغيرات البصرية. 
        تُصاغ الرموز بصيغة YAML وتُترجم تلقائياً إلى متغيرات CSS رسمية بالبادئة <code>--qhr-*</code> مع ضمان التوافق الكامل بين اليمين واليسار (RTL/LTR).
      </p>

      <div class="qhr-alert qhr-alert--info" style="margin-bottom: var(--qhr-space-6);">
        <div class="qhr-alert__content">
          <strong>القاعدة المعمارية الثالثة:</strong>
          الرموز تسبق التنسيق — يُحظر نهائياً استخدام قيم الألوان أو الأبعاد الصلبة بدون الرجوع لسجل متغيرات <code>--qhr-*</code>.
        </div>
      </div>

      <!-- Specification Table -->
      <div class="qhr-card" style="margin-top: var(--qhr-space-8); overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.875rem;">
          <thead>
            <tr style="background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.08);">
              <th style="padding: 12px 16px;">المتغير (CSS Custom Property)</th>
              <th style="padding: 12px 16px;">القيمة المرجعية</th>
              <th style="padding: 12px 16px;">الاستخدام</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 12px 16px; font-family: monospace; direction: ltr; color: var(--qhr-color-primary-400, #D4AF37);">--qhr-surface-page</td>
              <td style="padding: 12px 16px; font-family: monospace; direction: ltr;">#0A0A0A</td>
              <td style="padding: 12px 16px; color: var(--qhr-text-secondary);">الخلفية العميقة لصفحات النظام</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-family: monospace; direction: ltr; color: var(--qhr-color-primary-400, #D4AF37);">--qhr-color-primary-500</td>
              <td style="padding: 12px 16px; font-family: monospace; direction: ltr;">#C7A35A</td>
              <td style="padding: 12px 16px; color: var(--qhr-text-secondary);">لون الهوية الأساسي (الذهب الإمبراطوري)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div style="margin-top: var(--qhr-space-10); padding-top: var(--qhr-space-6); border-top: 1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08));">
        <?= $this->insert('qahera::patterns/pagination', [
            'currentPage' => 2,
            'totalPages'  => 5,
        ]) ?>
      </div>
    </main>

    <!-- TOC -->
    <aside style="border-inline-start: 1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08)); padding-inline-start: var(--qhr-space-4);">
      <h4 style="font-size: 0.8125rem; font-weight: 700; color: var(--qhr-text-muted); margin: 0 0 var(--qhr-space-3);">
        في هذه الصفحة
      </h4>
      <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--qhr-space-2); font-size: 0.8125rem; color: var(--qhr-text-secondary);">
        <li style="color: var(--qhr-color-primary-400, #D4AF37); font-weight: 600;">نظرة عامة</li>
        <li>القاعدة المعمارية الثالثة</li>
        <li>جدول الرموز المعتمدة</li>
        <li>بيئات التشغيل المتوافقة</li>
      </ul>
    </aside>

  </div>
</div>

<?php
/**
 * Qahera UI Kit — Academic & Executive Showcase Template (Plates PHP)
 * 
 * @var League\Plates\Template\Template $this
 */
$this->layout('layouts/base', [
  'title' => 'المنصة الأكاديمية والتنفيذية — قاهرة Qahera UI Kit',
  'dir' => 'rtl',
  'theme' => 'zamalek'
]);
?>

<div class="academic-page" dir="rtl">
  <header class="academic-navbar">
    <div class="academic-container">
      <?= $this->insert('components/cartouche', [
        'variant' => 'outline',
        'size' => 'sm',
        'title' => 'كرسي الدراسات الاستراتيجية'
      ]) ?>
      <?= $this->insert('components/button', [
        'variant' => 'primary',
        'size' => 'sm',
        'label' => 'طلب استشارة أكاديمية'
      ]) ?>
    </div>
  </header>

  <section class="academic-hero">
    <div class="academic-container">
      <?= $this->insert('components/cartouche', [
        'variant' => 'elevated',
        'size' => 'lg',
        'title' => 'الأستاذ الدكتور / ش. و. م',
        'body' => '<p>أستاذ علوم وهندسة النظم وباحث رئيسي في مشاريع الذكاء الاصطناعي السيادي.</p>'
      ]) ?>
    </div>
  </section>

  <?= $this->insert('components/frieze', [
    'variant' => 'outline',
    'size' => 'md',
    'label' => 'المؤلفات والدراسات المحكمة'
  ]) ?>
</div>

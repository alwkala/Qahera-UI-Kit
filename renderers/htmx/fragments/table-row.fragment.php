<?php
/**
 * Qahera UI Kit — HTMX Table Row Fragment (View State)
 * 
 * Supports inline swap to edit mode via hx-get.
 * 
 * @var string $id Record unique identifier
 * @var array $data Associative array of column data ['name' => '...', 'role' => '...', 'status' => '...']
 * @var string $editUrl URL to request edit fragment
 * @var string $deleteUrl Optional URL to delete record
 */

$id = $id ?? 'row-' . uniqid();
$data = $data ?? [];
$editUrl = $editUrl ?? "#edit-{$id}";
$deleteUrl = $deleteUrl ?? '';
?>
<tr id="table-row-<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>" class="qhr-table-row">
  <?php foreach ($data as $key => $val): ?>
    <td class="qhr-table-td">
      <?= htmlspecialchars((string)$val, ENT_QUOTES, 'UTF-8') ?>
    </td>
  <?php endforeach; ?>
  <td class="qhr-table-td" style="text-align: end; white-space: nowrap;">
    <button 
      type="button" 
      class="qhr-btn qhr-btn--ghost qhr-btn--sm"
      hx-get="<?= htmlspecialchars($editUrl, ENT_QUOTES, 'UTF-8') ?>"
      hx-target="closest tr"
      hx-swap="outerHTML"
      aria-label="تعديل السطر"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      <span>تعديل</span>
    </button>
    <?php if (!empty($deleteUrl)): ?>
      <button 
        type="button" 
        class="qhr-btn qhr-btn--ghost qhr-btn--sm"
        style="color: var(--qhr-color-danger-600);"
        hx-delete="<?= htmlspecialchars($deleteUrl, ENT_QUOTES, 'UTF-8') ?>"
        hx-target="closest tr"
        hx-swap="outerHTML"
        hx-confirm="هل أنت متأكد من رغبتك في حذف هذا السجل؟"
        aria-label="حذف السجل"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    <?php endif; ?>
  </td>
</tr>

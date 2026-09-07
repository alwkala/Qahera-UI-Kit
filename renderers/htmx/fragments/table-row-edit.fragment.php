<?php
/**
 * Qahera UI Kit — HTMX Table Row Fragment (Inline Edit State)
 * 
 * Renders inline form inputs with Save (hx-put) and Cancel (hx-get) actions.
 * 
 * @var string $id Record unique identifier
 * @var array $fields Field definitions [['name' => 'title', 'value' => '...', 'type' => 'text']]
 * @var string $saveUrl URL to submit edited data via hx-put
 * @var string $cancelUrl URL to revert to view row via hx-get
 */

$id = $id ?? 'row-' . uniqid();
$fields = $fields ?? [];
$saveUrl = $saveUrl ?? "#save-{$id}";
$cancelUrl = $cancelUrl ?? "#cancel-{$id}";
?>
<tr id="table-row-<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>" class="qhr-table-row qhr-table-row--editing" style="background-color: var(--qhr-color-primary-50);">
  <?php foreach ($fields as $field): ?>
    <td class="qhr-table-td">
      <input 
        type="<?= htmlspecialchars($field['type'] ?? 'text', ENT_QUOTES, 'UTF-8') ?>"
        name="<?= htmlspecialchars($field['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>"
        value="<?= htmlspecialchars((string)($field['value'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
        class="qhr-input qhr-input--sm"
        style="width: 100%;"
      />
    </td>
  <?php endforeach; ?>
  <td class="qhr-table-td" style="text-align: end; white-space: nowrap;">
    <button 
      type="button" 
      class="qhr-btn qhr-btn--primary qhr-btn--sm"
      hx-put="<?= htmlspecialchars($saveUrl, ENT_QUOTES, 'UTF-8') ?>"
      hx-include="closest tr"
      hx-target="closest tr"
      hx-swap="outerHTML"
      aria-label="حفظ التعديلات"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>حفظ</span>
    </button>
    <button 
      type="button" 
      class="qhr-btn qhr-btn--secondary qhr-btn--sm"
      hx-get="<?= htmlspecialchars($cancelUrl, ENT_QUOTES, 'UTF-8') ?>"
      hx-target="closest tr"
      hx-swap="outerHTML"
      aria-label="إلغاء التعديل"
    >
      <span>إلغاء</span>
    </button>
  </td>
</tr>

<?php
/**
 * Qahera UI Kit — Table Component (League/Plates Template)
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $headers Optional array of column header strings or definitions ['label' => '...', 'align' => 'start']
 * @var array $rows Optional 2D array of row data
 * @var string $variant 'default' | 'striped' | 'bordered'
 * @var string $size 'sm' | 'md' | 'lg'
 * @var bool $striped Shortcut boolean for striped variant
 * @var string $slot Raw HTML table content if not using $headers/$rows
 * @var string $class Additional CSS classes
 */

$variant = $variant ?? 'default';
if (!empty($striped)) {
    $variant = 'striped';
}
$size = $size ?? 'md';
$headers = $headers ?? [];
$rows = $rows ?? [];
$slot = $slot ?? '';
$class = $class ?? '';

$classes = ['qhr-table'];
if ($variant === 'striped') {
    $classes[] = 'qhr-table--striped';
}
if ($variant === 'bordered') {
    $classes[] = 'qhr-table--bordered';
}
if ($size !== 'md') {
    $classes[] = 'qhr-table--' . $size;
}
if ($class) {
    $classes[] = $class;
}

$classAttr = implode(' ', $classes);
?>
<div class="qhr-table-container">
  <table class="<?= $this->e($classAttr) ?>" role="table">
    <?php if (!empty($headers)): ?>
      <thead class="qhr-table-head">
        <tr class="qhr-table-row">
          <?php foreach ($headers as $header): ?>
            <?php 
              $label = is_array($header) ? ($header['label'] ?? '') : $header;
              $align = is_array($header) ? ($header['align'] ?? 'start') : 'start';
            ?>
            <th class="qhr-table-th" scope="col" style="text-align: <?= $this->e($align) ?>;">
              <?= $this->e($label) ?>
            </th>
          <?php endforeach; ?>
        </tr>
      </thead>
    <?php endif; ?>

    <?php if (!empty($rows)): ?>
      <tbody class="qhr-table-body">
        <?php foreach ($rows as $row): ?>
          <tr class="qhr-table-row">
            <?php foreach ($row as $cell): ?>
              <td class="qhr-table-td">
                <?= is_scalar($cell) ? $this->e((string)$cell) : $cell ?>
              </td>
            <?php endforeach; ?>
          </tr>
        <?php endforeach; ?>
      </tbody>
    <?php else: ?>
      <?= $slot ?>
    <?php endif; ?>
  </table>
</div>

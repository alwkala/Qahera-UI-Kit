<?php
/**
 * Qahera UI Kit — Chat Stream Pattern (League/Plates Template)
 * 
 * Interactive conversational stream for AI assistants and messaging.
 * 
 * @var \League\Plates\Template\Template $this
 * @var array $messages Message history list
 * @var string $title Assistant header title
 * @var string $status Assistant status text
 * @var string $placeholder Input composer placeholder
 */

$messages = $messages ?? [
    ['sender' => 'bot', 'text' => 'مرحباً بك! أنا مساعد التصميم المعماري لنظام قاهرة. كيف يمكنني مساعدتك؟'],
];
$title = $title ?? 'مساعد قاهرة الذكي';
$status = $status ?? 'متصل ونشط';
$placeholder = $placeholder ?? 'اكتب سؤالك أو استفسارك هنا...';
?>
<div class="qhr-chat-stream" role="log" aria-live="polite">
  <div class="qhr-chat-header">
    <div style="display: flex; align-items: center; gap: var(--qhr-space-3);">
      <div class="qhr-avatar qhr-avatar--md">
        <div class="qhr-avatar-fallback">AI</div>
      </div>
      <div>
        <div style="font-weight: 700; font-size: var(--qhr-text-sm);"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></div>
        <div style="font-size: var(--qhr-text-xs); color: var(--qhr-color-success-600);"><?= htmlspecialchars($status, ENT_QUOTES, 'UTF-8') ?></div>
      </div>
    </div>
  </div>

  <div class="qhr-chat-history">
    <?php foreach ($messages as $msg): ?>
      <div class="qhr-chat-bubble qhr-chat-bubble--<?= $msg['sender'] === 'user' ? 'user' : 'bot' ?>">
        <p style="margin: 0;"><?= htmlspecialchars($msg['text'], ENT_QUOTES, 'UTF-8') ?></p>
      </div>
    <?php endforeach; ?>
  </div>

  <form class="qhr-chat-composer" method="POST" action="#">
    <input type="text" class="qhr-input" placeholder="<?= htmlspecialchars($placeholder, ENT_QUOTES, 'UTF-8') ?>" aria-label="حقل المحادثة" />
    <button type="submit" class="qhr-btn qhr-btn--primary qhr-btn--md">
      <span>إرسال</span>
    </button>
  </form>
</div>

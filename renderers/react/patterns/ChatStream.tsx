import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { QaheraIconName } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  avatarUrl?: string;
}

export interface ChatStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  title?: string;
}

export function ChatStream({
  messages,
  onSend,
  placeholder = 'اكتب رسالتك...',
  isLoading = false,
  title = 'المساعد الذكي',
  className = '',
  ...props
}: ChatStreamProps) {
  const [draft, setDraft] = React.useState('');

  const handleSend = () => {
    if (draft.trim() && onSend) {
      onSend(draft.trim());
      setDraft('');
    }
  };

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label={title}
      className={`qhr-chat-stream ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid var(--qhr-border-subtle)',
        borderRadius: 'var(--qhr-radius-lg)',
        background: 'var(--qhr-surface-base)',
        overflow: 'hidden',
      }}
      {...props}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--qhr-space-4)',
          borderBlockEnd: '1px solid var(--qhr-border-subtle)',
          fontWeight: 600,
          fontSize: 'var(--qhr-text-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--qhr-space-2)',
        }}
      >
        <Icon name="info" size={18} />
        <span>{title}</span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--qhr-space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--qhr-space-4)',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              gap: 'var(--qhr-space-3)',
              alignItems: 'flex-start',
            }}
          >
            <Avatar
              size="sm"
              src={msg.avatarUrl}
              alt={msg.role === 'user' ? 'المستخدم' : 'المساعد'}
            />
            <div
              style={{
                maxWidth: '75%',
                padding: 'var(--qhr-space-3) var(--qhr-space-4)',
                borderRadius: 'var(--qhr-radius-lg)',
                fontSize: 'var(--qhr-text-sm)',
                lineHeight: 1.7,
                background:
                  msg.role === 'user'
                    ? 'var(--qhr-color-primary-100)'
                    : 'var(--qhr-color-neutral-100)',
                color: 'var(--qhr-color-neutral-900)',
              }}
            >
              {msg.content}
              {msg.timestamp && (
                <div
                  style={{
                    fontSize: 'var(--qhr-text-xs)',
                    color: 'var(--qhr-color-neutral-500)',
                    marginBlockStart: 'var(--qhr-space-1)',
                  }}
                >
                  {msg.timestamp}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: 'var(--qhr-space-2)', alignItems: 'center' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
              جاري الكتابة...
            </span>
          </div>
        )}
      </div>

      {/* Composer */}
      <div
        style={{
          padding: 'var(--qhr-space-3)',
          borderBlockStart: '1px solid var(--qhr-border-subtle)',
          display: 'flex',
          gap: 'var(--qhr-space-2)',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          className="qhr-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={placeholder}
          style={{ flex: 1 }}
          aria-label={placeholder}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!draft.trim()}
          aria-label="إرسال"
        >
          <Icon name="arrow-end" size={16} />
        </Button>
      </div>
    </div>
  );
}

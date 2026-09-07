import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  loading?: boolean;
  sticky?: boolean;
  extra?: React.ReactNode;
}

export const FormActions: React.FC<FormActionsProps> = ({
  submitLabel = 'حفظ التغييرات',
  cancelLabel = 'إلغاء',
  onCancel,
  loading = false,
  sticky = false,
  extra,
  className = '',
  style = {},
  ...props
}) => {
  const combinedStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 'var(--qhr-space-3)',
    paddingTop: 'var(--qhr-space-6)',
    ...(sticky
      ? {
          position: 'sticky',
          bottom: 0,
          background: 'var(--qhr-surface-base)',
          padding: 'var(--qhr-space-4) var(--qhr-space-6)',
          borderTop: '1px solid var(--qhr-border-subtle)',
          zIndex: 30,
          boxShadow: 'var(--qhr-shadow-md)',
        }
      : {}),
    ...style,
  };

  return (
    <div
      role="group"
      aria-label="إجراءات النموذج"
      className={`qhr-form-actions ${className}`.trim()}
      style={combinedStyle}
      {...props}
    >
      {extra && <div style={{ marginInlineEnd: 'auto' }}>{extra}</div>}

      {cancelLabel && (
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
      )}

      <Button type="submit" variant="primary" isLoading={loading}>
        <Icon name="check" size={18} />
        <span>{submitLabel}</span>
      </Button>
    </div>
  );
};

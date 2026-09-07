'use client';

import React from 'react';
import { Modal, ModalBody, ModalFooter } from '../Modal';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'تأكيد الإجراء الحساس',
  description = 'هل أنت متأكد من رغبتك في متابعة هذا الإجراء؟ لا يمكن التراجع عن هذه الخطوة.',
  confirmLabel = 'تأكيد الإجراء',
  cancelLabel = 'إلغاء',
  destructive = true,
  loading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalBody>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--qhr-space-3)' }}>
          <div
            style={{
              color: destructive ? 'var(--qhr-color-danger-600)' : 'var(--qhr-color-warning-600)',
              display: 'inline-flex',
              marginTop: '2px',
            }}
          >
            <Icon name={destructive ? 'x-circle' : 'alert-circle'} size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: 'var(--qhr-text-base)',
                fontWeight: 600,
                color: 'var(--qhr-color-neutral-900)',
                margin: 0,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: 'var(--qhr-text-sm)',
                color: 'var(--qhr-color-neutral-600)',
                margin: 'var(--qhr-space-2) 0 0 0',
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" variant="secondary" size="sm" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={destructive ? 'destructive' : 'primary'}
          size="sm"
          onClick={onConfirm}
          isLoading={loading}
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

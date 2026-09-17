import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Progress } from '../Progress';
import { QaheraIconName } from '../types';

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'video' | 'archive';
  size?: string;
  modified?: string;
  icon?: QaheraIconName;
}

export interface FolderNode {
  id: string;
  name: string;
  icon?: QaheraIconName;
  children?: FolderNode[];
}

export interface FileManagerGridProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileItem[];
  folders?: FolderNode[];
  storageUsed?: number;
  storageTotal?: number;
  onFileClick?: (file: FileItem) => void;
  onUpload?: () => void;
}

export function FileManagerGrid({
  files,
  folders = [],
  storageUsed = 0,
  storageTotal = 100,
  onFileClick,
  onUpload,
  className = '',
  ...props
}: FileManagerGridProps) {
  const storagePercent = Math.round((storageUsed / storageTotal) * 100);

  const iconMap: Record<string, QaheraIconName> = {
    folder: 'folder',
    image: 'image',
    document: 'file',
    video: 'image',
    archive: 'folder',
  };

  return (
    <div
      role="region"
      aria-label="مدير الملفات"
      className={`qhr-file-manager-grid ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 'var(--qhr-space-6)',
        minHeight: '480px',
      }}
      {...props}
    >
      {/* Sidebar */}
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--qhr-space-4)',
          padding: 'var(--qhr-space-4)',
          borderInlineEnd: '1px solid var(--qhr-border-subtle)',
        }}
      >
        <Button variant="primary" size="sm" onClick={onUpload}>
          <Icon name="upload" size={16} />
          <span>رفع ملف</span>
        </Button>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--qhr-space-1)' }}>
          {folders.map((folder) => (
            <button
              key={folder.id}
              className="qhr-btn qhr-btn--ghost"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--qhr-space-2)',
                padding: 'var(--qhr-space-2)',
                fontSize: 'var(--qhr-text-sm)',
                textAlign: 'start',
                width: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderRadius: 'var(--qhr-radius-md)',
                color: 'var(--qhr-color-neutral-700)',
              }}
            >
              <Icon name={folder.icon || 'folder'} size={16} />
              <span>{folder.name}</span>
            </button>
          ))}
        </nav>

        {/* Storage Meter */}
        <div style={{ marginBlockStart: 'auto' }}>
          <div
            style={{
              fontSize: 'var(--qhr-text-xs)',
              color: 'var(--qhr-color-neutral-500)',
              marginBlockEnd: 'var(--qhr-space-2)',
            }}
          >
            {storageUsed} GB من {storageTotal} GB مستخدم ({storagePercent}%)
          </div>
          <Progress value={storagePercent} size="sm" />
        </div>
      </aside>

      {/* Main Grid */}
      <main style={{ padding: 'var(--qhr-space-4)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 'var(--qhr-space-4)',
          }}
        >
          {files.map((file) => (
            <Card
              key={file.id}
              role="button"
              tabIndex={0}
              onClick={() => onFileClick?.(file)}
              style={{
                padding: 'var(--qhr-space-4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--qhr-space-2)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <Icon name={iconMap[file.type] || 'file'} size={32} />
              <span
                style={{
                  fontSize: 'var(--qhr-text-sm)',
                  fontWeight: 500,
                  color: 'var(--qhr-color-neutral-800)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {file.name}
              </span>
              {file.size && (
                <span style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-500)' }}>
                  {file.size}
                </span>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

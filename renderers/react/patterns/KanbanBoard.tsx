import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { Icon } from '../Icon';

export interface KanbanTask {
  id: string;
  title: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  assigneeUrl?: string;
  assigneeName?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color?: string;
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[];
  onTaskClick?: (task: KanbanTask) => void;
  onAddTask?: (columnId: string) => void;
}

export function KanbanBoard({
  columns,
  onTaskClick,
  onAddTask,
  className = '',
  ...props
}: KanbanBoardProps) {
  const priorityTone: Record<string, 'neutral' | 'info' | 'warning' | 'danger'> = {
    low: 'neutral',
    medium: 'info',
    high: 'warning',
    urgent: 'danger',
  };

  return (
    <div
      role="region"
      aria-label="لوحة كانبان"
      className={`qhr-kanban-board ${className}`.trim()}
      style={{
        display: 'flex',
        gap: 'var(--qhr-space-4)',
        overflowX: 'auto',
        padding: 'var(--qhr-space-4)',
        minHeight: '400px',
      }}
      {...props}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          style={{
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--qhr-space-3)',
            background: 'var(--qhr-color-neutral-50)',
            borderRadius: 'var(--qhr-radius-lg)',
            padding: 'var(--qhr-space-4)',
          }}
        >
          {/* Column Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--qhr-space-2)' }}>
              {col.color && (
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: 'var(--qhr-radius-full)',
                    background: col.color,
                  }}
                />
              )}
              <span style={{ fontWeight: 600, fontSize: 'var(--qhr-text-sm)' }}>{col.title}</span>
              <Badge tone="neutral" size="xs">
                {col.tasks.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onAddTask?.(col.id)}
              aria-label={`إضافة مهمة إلى ${col.title}`}
            >
              <Icon name="plus" size={14} />
            </Button>
          </div>

          {/* Task Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--qhr-space-2)' }}>
            {col.tasks.map((task) => (
              <Card
                key={task.id}
                role="button"
                tabIndex={0}
                onClick={() => onTaskClick?.(task)}
                style={{
                  padding: 'var(--qhr-space-3)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--qhr-space-2)',
                }}
              >
                <span style={{ fontSize: 'var(--qhr-text-sm)', fontWeight: 500 }}>
                  {task.title}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--qhr-space-1)', flexWrap: 'wrap' }}>
                    {task.priority && (
                      <Badge tone={priorityTone[task.priority] || 'neutral'} size="sm">
                        {task.priority}
                      </Badge>
                    )}
                    {task.tags?.map((tag) => (
                      <Chip key={tag} size="sm" label={tag} />
                    ))}
                  </div>
                  {task.assigneeUrl && (
                    <Avatar size="sm" src={task.assigneeUrl} alt={task.assigneeName || ''} />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

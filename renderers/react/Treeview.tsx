'use client';

import React, { useState } from 'react';

export interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

export interface TreeviewProps {
  items: TreeItem[];
  label?: string;
  onSelect?: (item: TreeItem) => void;
}

export const Treeview: React.FC<TreeviewProps> = ({
  items,
  label = 'شجرة الملفات',
  onSelect
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (item: TreeItem) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  const renderItem = (item: TreeItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = !!expanded[item.id];
    const isSelected = selectedId === item.id;

    return (
      <li 
        key={item.id} 
        className="qhr-treeview-item" 
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <div 
          className="qhr-treeview-node" 
          data-selected={isSelected ? 'true' : undefined}
          onClick={() => handleSelect(item)}
        >
          {hasChildren && (
            <span 
              className="qhr-treeview-toggle" 
              data-expanded={isExpanded ? 'true' : undefined}
              onClick={(e) => toggleExpand(item.id, e)}
            >
              ▶
            </span>
          )}
          <span>{item.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <ul className="qhr-treeview-children" role="group">
            {item.children!.map(child => renderItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="qhr-treeview" role="tree" aria-label={label}>
      {items.map(item => renderItem(item))}
    </ul>
  );
};

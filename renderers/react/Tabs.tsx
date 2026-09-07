'use client';

import React, { useState, createContext, useContext } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
}) => {
  const [selected, setSelected] = useState(defaultValue);
  const activeTab = value !== undefined ? value : selected;

  const handleSelect = (id: string) => {
    if (value === undefined) setSelected(id);
    onValueChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSelect }}>
      <div className={`qhr-tabs ${className}`.trim()}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`qhr-tab-list ${className}`.trim()} role="tablist">
    {children}
  </div>
);

export const Tab: React.FC<{
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}> = ({ value, children, disabled = false, className = '' }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab must be used inside Tabs');

  const isActive = ctx.activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={`qhr-tab-btn ${isActive ? 'is-active' : ''} ${className}`.trim()}
      onClick={() => ctx.setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabPanel must be used inside Tabs');

  if (ctx.activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={`qhr-tab-panel ${className}`.trim()}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

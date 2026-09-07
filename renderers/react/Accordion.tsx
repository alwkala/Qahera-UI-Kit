'use client';

import React, { useState, createContext, useContext } from 'react';
import { Icon } from './Icon';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
  multiple?: boolean;
  defaultOpen?: string[];
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  multiple = false,
  defaultOpen = [],
  children,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return multiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`qhr-accordion ${className}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside Accordion');

  const isOpen = ctx.openItems.includes(id);

  return (
    <div className={`qhr-accordion-item ${isOpen ? 'is-open' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
};

export const AccordionTrigger: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionTrigger must be used inside Accordion');

  const isOpen = ctx.openItems.includes(id);

  return (
    <button
      type="button"
      className={`qhr-accordion-trigger ${className}`.trim()}
      aria-expanded={isOpen}
      onClick={() => ctx.toggleItem(id)}
    >
      <span>{children}</span>
      <span className="qhr-accordion-icon">
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} />
      </span>
    </button>
  );
};

export const AccordionContent: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionContent must be used inside Accordion');

  if (!ctx.openItems.includes(id)) return null;

  return (
    <div className={`qhr-accordion-content ${className}`.trim()}>
      <div className="qhr-accordion-body">{children}</div>
    </div>
  );
};

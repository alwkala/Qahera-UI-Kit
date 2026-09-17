import React from 'react';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Card } from '../../renderers/react/Card';
import { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions } from '../../renderers/react/Navbar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../renderers/react/Accordion';
import { Seal } from '../../renderers/react/Seal';

export interface FlagshipPortalProps {
  lang?: 'ar' | 'en';
  theme?: string;
}

export const FlagshipPortalPage: React.FC<FlagshipPortalProps> = ({
  lang = 'ar',
  theme = 'zamalek'
}) => {
  const isRtl = lang === 'ar';

  return (
    <div className="qhr-flagship-portal" data-theme={theme} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="portal-navbar">
        <div className="portal-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--qhr-font-heading)', fontWeight: 800 }}>
              {isRtl ? 'بوابة المنظومة' : 'Flagship Portal'}
            </span>
            <Badge tone="primary">v1.5.1</Badge>
          </div>
          <Button variant="secondary" size="sm">
            {isRtl ? 'المعرض الحي' : 'Live Showcase'}
          </Button>
        </div>
      </header>

      <section className="portal-hero" style={{ textAlign: 'center', paddingBlock: '80px 48px' }}>
        <div className="portal-container">
          <Badge tone="neutral">
            {isRtl ? '15 معياراً صارماً' : '15 Invariants'}
          </Badge>
          <h1 style={{ fontFamily: 'var(--qhr-font-heading)', fontSize: '3rem', fontWeight: 900, marginBlock: '20px 12px' }}>
            {isRtl ? 'صمّم اللغة.. ودع الذكاء الاصطناعي يتحدث بها' : 'Design the Language. Let AI Speak It.'}
          </h1>
          <p style={{ color: 'var(--qhr-text-secondary)', maxWidth: '680px', margin: '0 auto 32px' }}>
            {isRtl
              ? 'لغة تصميم قابلة للتنفيذ تمنح المطورين ووكلاء الذكاء الاصطناعي والمتصفحات مفردات موحدة لبناء واجهات ويب فائقة التناسق والسرعة.'
              : 'An executable design language giving developers, AI agents, and browsers a shared vocabulary for consistent, lightning-fast web interfaces.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Button variant="primary" size="lg">
              {isRtl ? 'استكشف المعرض الحي (86 عنصراً)' : 'Explore Live Showcase (86 Items)'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlagshipPortalPage;

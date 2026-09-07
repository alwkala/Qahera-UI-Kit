'use client';

import React from 'react';
import { Preloader } from '../../renderers/react/Preloader';
import { CanvasSparks } from '../../renderers/react/CanvasSparks';
import { BackToTop } from '../../renderers/react/BackToTop';
import {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
} from '../../renderers/react/Navbar';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Card } from '../../renderers/react/Card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../renderers/react/Accordion';
import { Icon } from '../../renderers/react/Icon';
import { EditorialStory } from '../../renderers/react/patterns/EditorialStory';
import { VipMembership } from '../../renderers/react/patterns/VipMembership';

export function LandingPage() {
  return (
    <div 
      className="qhr-landing-page" 
      data-theme="luxury-gold"
      style={{
        backgroundColor: '#0F0B09',
        color: '#F7F3ED',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* 1. Cinematic Preloader */}
      <Preloader logoText="قاهرة" logoSubtext="QAHERA LUXURY SYSTEM" />

      {/* 2. Top Luxury Navigation */}
      <Navbar>
        <NavbarBrand href="#hero">
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#D4AF37', 
            color: '#0F0B09', 
            fontWeight: 800 
          }}>
            ق
          </span>
          <span style={{ marginInlineStart: '10px', fontFamily: 'var(--qhr-font-family-display, serif)', fontSize: '18px', fontWeight: 700 }}>
            قاهرة للمقتنيات الفاخرة
          </span>
        </NavbarBrand>

        <NavbarLinks>
          <NavbarLink href="#hero" active>الرئيسية</NavbarLink>
          <NavbarLink href="#story">فلسفة الصنعة</NavbarLink>
          <NavbarLink href="#features">المقتنيات</NavbarLink>
          <NavbarLink href="#faq">الأسئلة الشائعة</NavbarLink>
          <NavbarLink href="#vip">نادي الصفوة</NavbarLink>
        </NavbarLinks>

        <NavbarActions>
          <Button 
            variant="primary" 
            size="sm"
            style={{ backgroundColor: '#D4AF37', color: '#0F0B09', fontWeight: 700 }}
          >
            <span>اقتنِ الآن</span>
            <Icon name="arrow-end" size={14} />
          </Button>
        </NavbarActions>
      </Navbar>

      {/* 3. Hero Section with Canvas Sparks & Ambient Glow */}
      <section 
        id="hero"
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
          overflow: 'hidden',
        }}
      >
        <CanvasSparks count={40} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px', margin: '0 auto' }}>
          <Badge 
            tone="primary" 
            size="md"
            style={{ borderColor: 'rgba(212, 175, 55, 0.4)', color: '#D4AF37', marginBottom: '24px' }}
          >
            مجموعة القاهرة الملكية لعام 2026
          </Badge>

          <h1 style={{
            fontFamily: 'var(--qhr-font-family-display, serif)',
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#F7F3ED',
            marginBottom: '20px',
          }}>
            أناقة خالدة تصاغ بأيدي حرفيي القاهرة
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#B9A896',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 36px',
          }}>
            مقتنيات فاخرة تمزج صلابة ستيل 316L مع بهاء الذهب الإمبراطوري عيار 18، صممت لتبقى معك في أدق لحظات الحياة.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button 
              variant="primary" 
              size="lg"
              style={{ backgroundColor: '#D4AF37', color: '#0F0B09', fontWeight: 700, padding: '14px 32px' }}
            >
              <span>استكشف الإصدارات الخاصة</span>
              <Icon name="arrow-end" size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              style={{ borderColor: 'rgba(212, 175, 55, 0.4)', color: '#D4AF37', padding: '14px 28px' }}
            >
              <span>مشاهدة الفيلم الوثائقي</span>
              <Icon name="external-link" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Editorial Narrative Pattern */}
      <section id="story">
        <EditorialStory
          kicker="التاريخ والحرفة"
          headline="من أزقة المعز إلى واجهات العالم المعاصر"
          subheadline="حين تلتقي الهندسة المعمارية الإسلامية بفخامة التصميم الحديث"
          paragraphs={[
            'استلهمنا نقوش مقتنياتنا من مشربيات القاهرة الفاطمية وتوازن القباب الهندسية، لنعيد بعثها في قوالب فولاذية دقيقة تقاوم عوامل الزمن والصدأ.',
            'كل قطعة تخضع لأكثر من 14 مرحلة صقل واختبار يدوي لضمان لمعان الذهب ونعومة الملمس عند ارتدائها اليومي.'
          ]}
          quote="القطعة التي ترتديها ليست إكسسواراً عابراً، بل توقيع لحضورك أينما حللت."
          quoteAuthor="فريق الحرفيين في الوكالة"
        />
      </section>

      {/* 5. Features Grid */}
      <section id="features" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h3 style={{ fontFamily: 'var(--qhr-font-family-display, serif)', fontSize: '32px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>
            معايير الامتياز الخمسة
          </h3>
          <p style={{ color: '#B9A896', fontSize: '15px' }}>ما يميز كل مقتنى يحمل خاتم قاهرة</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Card style={{ backgroundColor: '#17120F', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '28px', borderRadius: '12px' }}>
            <div style={{ color: '#D4AF37', marginBottom: '16px' }}><Icon name="lock" size={28} /></div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>فولاذ ستيل 316L فائق المتانة</h4>
            <p style={{ fontSize: '14px', color: '#B9A896', lineHeight: 1.7 }}>معدن طبي بحري لا يصدأ ولا يسبب أي حساسية للبشرة ومقاوم للخدوش اليومية.</p>
          </Card>
          <Card style={{ backgroundColor: '#17120F', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '28px', borderRadius: '12px' }}>
            <div style={{ color: '#D4AF37', marginBottom: '16px' }}><Icon name="sun" size={28} /></div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>طلاء الذهب عيار 18 (PVD)</h4>
            <p style={{ fontSize: '14px', color: '#B9A896', lineHeight: 1.7 }}>تقنية ترسيب البخار الفيزيائي التي تضمن ثبات لون الذهب لسنوات طويلة دون بهتان.</p>
          </Card>
          <Card style={{ backgroundColor: '#17120F', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '28px', borderRadius: '12px' }}>
            <div style={{ color: '#D4AF37', marginBottom: '16px' }}><Icon name="folder" size={28} /></div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>تغليف الإهداء الملكي</h4>
            <p style={{ fontSize: '14px', color: '#B9A896', lineHeight: 1.7 }}>علب فاخرة مجهزة بختم شمعي أحمر يدوي لتقديمها كهدية تليق بأعز المقربين.</p>
          </Card>
        </div>
      </section>

      {/* 6. Accordion FAQ Section */}
      <section id="faq" style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h3 style={{ fontFamily: 'var(--qhr-font-family-display, serif)', fontSize: '30px', fontWeight: 700, color: '#F7F3ED', marginBottom: '8px' }}>
            الأسئلة المتكررة
          </h3>
          <p style={{ color: '#B9A896', fontSize: '14px' }}>كل ما ترغب في معرفته حول الطلب والضمان والتوصيل</p>
        </div>
        <Accordion defaultOpen={['faq-1']}>
          <AccordionItem id="faq-1">
            <AccordionTrigger id="faq-1">ما هي معايير الجودة ومقاومة الصدأ في مقتنيات القاهرة؟</AccordionTrigger>
            <AccordionContent id="faq-1">
              تصنع كافة المقتنيات من فولاذ مقاوم للصدأ بدرجة 316L المطلي بتقنية PVD بالذهب عيار 18 المقاوم للتآكل والمياه والعطور اليومية.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="faq-2">
            <AccordionTrigger id="faq-2">كيف يتم تقديم وتغليف المقتنيات الملكية؟</AccordionTrigger>
            <AccordionContent id="faq-2">
              تصل جميع القطع داخل صندوق فاخر مبطن بالشمواه الملكي، مغلق بختم شمعي أحمر وشهادة أصالة مرقمة يدوياً.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="faq-3">
            <AccordionTrigger id="faq-3">هل يمكن تخصيص ونقش عبارات خاصة على المقتنى؟</AccordionTrigger>
            <AccordionContent id="faq-3">
              نعم، نوفر خدمة النقش بالليزر للحروف والتواريخ والعبارات العربية الخالدة بخطوط رقعة وثلث معتمدة.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 7. VIP Membership Pattern */}
      <section id="vip" style={{ padding: '80px 24px' }}>
        <VipMembership
          perks={[
            'أولوية حجز الإصدارات المحدودة',
            'تغليف ملكي خاص بشمع الختم',
            'دعوات خاصة لمعارض القاهرة',
            'شحن وتوصيل مخصص وسريع',
          ]}
        />
      </section>

      {/* 8. Back to Top Button */}
      <BackToTop variant="luxury" />
    </div>
  );
}

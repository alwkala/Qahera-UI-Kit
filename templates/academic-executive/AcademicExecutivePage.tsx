import React from 'react';
import { Cartouche, CartoucheHeader, CartoucheTitle, CartoucheBody } from '../../renderers/react/Cartouche';
import { Frieze } from '../../renderers/react/Frieze';
import { Seal } from '../../renderers/react/Seal';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';

export const AcademicExecutivePage: React.FC = () => {
  return (
    <div className="academic-page" dir="rtl">
      <header className="academic-navbar">
        <div className="academic-container">
          <Cartouche variant="outline" size="sm">
            <CartoucheHeader>
              <CartoucheTitle>كرسي الدراسات الاستراتيجية</CartoucheTitle>
            </CartoucheHeader>
          </Cartouche>
          <Button variant="primary" size="sm">
            طلب استشارة أكاديمية
          </Button>
        </div>
      </header>

      <section className="academic-hero">
        <div className="academic-container">
          <Cartouche variant="elevated" size="lg">
            <CartoucheHeader>
              <Seal variant="solid" size="md" label="معتمد" />
              <CartoucheTitle>الأستاذ الدكتور / ش. و. م</CartoucheTitle>
            </CartoucheHeader>
            <CartoucheBody>
              <p>أستاذ علوم وهندسة النظم وباحث رئيسي في مشاريع الذكاء الاصطناعي السيادي.</p>
              <div className="badge-row">
                <Badge tone="primary">مجلس الحكمة</Badge>
                <Badge tone="info">تحكيم دولي</Badge>
                <Badge tone="success">زمالة فخرية</Badge>
              </div>
            </CartoucheBody>
          </Cartouche>
        </div>
      </section>

      <Frieze variant="outline" size="md" label="المؤلفات والدراسات المحكمة" />
    </div>
  );
};

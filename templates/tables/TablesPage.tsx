'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../renderers/react/Table';
import { Button } from '../../renderers/react/Button';
import { Badge } from '../../renderers/react/Badge';
import { Icon } from '../../renderers/react/Icon';
import { Navbar, NavbarBrand, NavbarActions } from '../../renderers/react/Navbar';

interface RecordItem {
  id: number;
  name: string;
  category: string;
  amount: number;
  status: 'نشط' | 'معلق' | 'متوقف';
  date: string;
}

export function TablesPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<keyof RecordItem>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [records, setRecords] = useState<RecordItem[]>([
    { id: 101, name: 'مجموعة الفلك الملكية', category: 'مقتنيات فاخرة', amount: 340000, status: 'نشط', date: '2026-09-01' },
    { id: 102, name: 'دار المعمار الفاطمي', category: 'تراث وعمران', amount: 185000, status: 'نشط', date: '2026-09-02' },
    { id: 103, name: 'عقد المشربية التوزيعي', category: 'سلاسل إمداد', amount: 92400, status: 'معلق', date: '2026-09-03' },
    { id: 104, name: 'صندوق الأوبسيديان للتجارة', category: 'أحجار ومعادن', amount: 512000, status: 'نشط', date: '2026-09-04' },
    { id: 105, name: 'مختبرات النيل للقياس', category: 'بحث وتطوير', amount: 48000, status: 'متوقف', date: '2026-09-05' },
    { id: 106, name: 'شركة الهيبة للاستثمار', category: 'استثمار مصرفي', amount: 720000, status: 'نشط', date: '2026-09-06' },
  ]);

  // Editable Rows State
  const [editableRows, setEditableRows] = useState([
    { id: 201, name: 'خاتم الأفق الذهبي', category: 'خواتم ملكية', price: 74200, stock: 14 },
    { id: 202, name: 'سوار النيل المنقوش', category: 'أساور مصمتة', price: 58100, stock: 8 },
    { id: 203, name: 'قلادة المشربية الفاطمية', category: 'سلاسل وتراث', price: 89450, stock: 5 },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem('qhr-theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
    localStorage.setItem('qhr-theme', next);
  };

  const filtered = useMemo(() => {
    return records
      .filter((r) => r.name.includes(search) || r.category.includes(search))
      .sort((a, b) => {
        const mod = sortDir === 'asc' ? 1 : -1;
        if (a[sortCol] < b[sortCol]) return -1 * mod;
        if (a[sortCol] > b[sortCol]) return 1 * mod;
        return 0;
      });
  }, [records, search, sortCol, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pagedRecords = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleSort = (col: keyof RecordItem) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(pagedRecords.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Inline editing methods
  const startEdit = (row: any) => {
    setEditingId(row.id);
    setEditDraft({ ...row });
  };

  const saveEdit = (id: number) => {
    setEditableRows(editableRows.map((r) => (r.id === id ? { ...editDraft } : r)));
    setEditingId(null);
  };

  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--tbl-bg, var(--qhr-surface-page, #0A0806))',
        color: 'var(--tbl-text-primary, var(--qhr-text-primary, #FBF8F3))',
        fontFamily: 'var(--qhr-font-body, "Cairo", sans-serif)',
      }}
    >
      <Navbar>
        <NavbarBrand href="#">
          <span style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #D4AF37, #92400E)',
            color: '#0A0806',
            fontWeight: 800,
            fontFamily: '"El Messiri", serif',
            fontSize: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            ق
          </span>
          <span style={{ marginInlineStart: '12px', fontFamily: '"El Messiri", serif', fontSize: '18px', fontWeight: 700 }}>
            قاهرة للجداول والشبكات
          </span>
        </NavbarBrand>

        <NavbarActions>
          <Button variant="secondary" size="xs" onClick={toggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />
            <span>{theme === 'dark' ? 'فاتح' : 'داكن'}</span>
          </Button>
        </NavbarActions>
      </Navbar>

      <main style={{ maxWidth: '1400px', marginInline: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Header Hero */}
        <div style={{
          background: 'linear-gradient(135deg, var(--tbl-surface-card, #17120E), var(--tbl-surface-subtle, #1F1913))',
          border: '1px solid var(--tbl-border, rgba(212,175,55,0.18))',
          borderRadius: '20px',
          padding: '28px',
        }}>
          <h1 style={{ fontFamily: '"El Messiri", serif', fontSize: '26px', fontWeight: 800, margin: '0 0 8px', color: '#D4AF37' }}>
            منظومة الجداول والشبكات البيانية (Tables Suite)
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--tbl-text-secondary, #D5C9BC)', margin: 0 }}>
            معمارية متكاملة تشمل الجداول الأساسية المخططة والمؤطرة، جداول البيانات التفاعلية بالفرز والتصفية والترقيم، والجداول القابلة للتعديل الفوري.
          </p>
        </div>

        {/* 1. Interactive Data Tables */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, margin: 0 }}>
              جداول البيانات التفاعلية (Data Tables)
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="بحث سريع..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  height: '36px',
                  paddingInline: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--tbl-border, rgba(212,175,55,0.2))',
                  background: 'var(--tbl-surface-card, #17120E)',
                  color: 'inherit',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <Table striped>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: '44px' }}>
                  <input
                    type="checkbox"
                    checked={pagedRecords.length > 0 && selectedIds.length === pagedRecords.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableHead>
                <TableHead onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                  المعرف {sortCol === 'id' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </TableHead>
                <TableHead onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                  الاسم {sortCol === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </TableHead>
                <TableHead onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  القطاع {sortCol === 'category' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </TableHead>
                <TableHead onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                  القيمة {sortCol === 'amount' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead style={{ textAlign: 'end' }}>الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedRecords.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  <TableCell><strong>#{row.id}</strong></TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell><Badge tone="primary" size="xs">{row.category}</Badge></TableCell>
                  <TableCell><strong style={{ color: '#D4AF37' }}>{row.amount.toLocaleString()} ر.س</strong></TableCell>
                  <TableCell>
                    <Badge tone={row.status === 'نشط' ? 'success' : row.status === 'معلق' ? 'warning' : 'danger'} size="xs">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ textAlign: 'end' }}>
                    <Button variant="ghost" size="xs">معاينة</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '13px' }}>
            <span>عرض {pagedRecords.length} من أصل {filtered.length} سجلات</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Button variant="secondary" size="xs" disabled={page === 1} onClick={() => setPage(page - 1)}>السابق</Button>
              <Button variant="secondary" size="xs" disabled={page === totalPages} onClick={() => setPage(page + 1)}>التالي</Button>
            </div>
          </div>
        </section>

        {/* 2. Editable Tables Section */}
        <section>
          <h2 style={{ fontFamily: '"El Messiri", serif', fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>
            الجداول القابلة للتعديل اللحظي (Editable Tables)
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الرمز</TableHead>
                <TableHead>اسم الصنف</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>السعر (ر.س)</TableHead>
                <TableHead>المخزون</TableHead>
                <TableHead style={{ textAlign: 'end' }}>الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editableRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell><strong>#{row.id}</strong></TableCell>
                  <TableCell>
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editDraft.name}
                        onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #D4AF37', background: 'transparent', color: 'inherit' }}
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    {editingId === row.id ? (
                      <input
                        type="number"
                        value={editDraft.price}
                        onChange={(e) => setEditDraft({ ...editDraft, price: Number(e.target.value) })}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #D4AF37', background: 'transparent', color: 'inherit', width: '100px' }}
                      />
                    ) : (
                      <strong style={{ color: '#D4AF37' }}>{row.price.toLocaleString()} ر.س</strong>
                    )}
                  </TableCell>
                  <TableCell>{row.stock} قطعة</TableCell>
                  <TableCell style={{ textAlign: 'end' }}>
                    {editingId === row.id ? (
                      <Button variant="primary" size="xs" onClick={() => saveEdit(row.id)}>حفظ</Button>
                    ) : (
                      <Button variant="secondary" size="xs" onClick={() => startEdit(row)}>تعديل</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

      </main>
    </div>
  );
}

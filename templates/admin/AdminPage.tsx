'use client';

import React, { useState } from 'react';
import {
  DataTableToolbar,
  FilterBar,
  Pagination,
  ConfirmationDialog,
} from '../../renderers/react/patterns';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../renderers/react/Table';
import { Badge } from '../../renderers/react/Badge';
import { Button } from '../../renderers/react/Button';
import { Icon } from '../../renderers/react/Icon';

interface ResourceItem {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'archived';
  date: string;
}

const INITIAL_DATA: ResourceItem[] = [
  { id: 'RES-101', name: 'خدمة التحقق المعيارية', category: 'الأنظمة', status: 'active', date: '2026-09-01' },
  { id: 'RES-102', name: 'واجهة بوابة الدفع الإلكتروني', category: 'المالية', status: 'active', date: '2026-09-02' },
  { id: 'RES-103', name: 'خادم معالجة الوسائط والملفات', category: 'البنية التحتية', status: 'pending', date: '2026-09-03' },
  { id: 'RES-104', name: 'مكتبة العقود والرموز المشتركة', category: 'التطوير', status: 'active', date: '2026-09-04' },
  { id: 'RES-105', name: 'خدمة التنبيهات البريدية المجمعة', category: 'الاتصالات', status: 'archived', date: '2026-09-05' },
];

export const AdminPage: React.FC = () => {
  const [data, setData] = useState<ResourceItem[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState<string | null>(null);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
  };

  const filters = [
    { key: 'all', label: 'كافة الموارد', count: data.length, active: selectedFilter === 'all' },
    { key: 'active', label: 'نشط', count: data.filter((d) => d.status === 'active').length, active: selectedFilter === 'active' },
    { key: 'pending', label: 'قيد الانتظار', count: data.filter((d) => d.status === 'pending').length, active: selectedFilter === 'pending' },
    { key: 'archived', label: 'مؤرشف', count: data.filter((d) => d.status === 'archived').length, active: selectedFilter === 'archived' },
  ];

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.includes(searchQuery) ||
      item.id.includes(searchQuery) ||
      item.category.includes(searchQuery);
    const matchesCategory = selectedFilter === 'all' || item.status === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredData.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleDeleteRequest = (id?: string) => {
    if (id) {
      setTargetDeleteId(id);
    } else {
      setTargetDeleteId(null);
    }
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (targetDeleteId) {
      setData((prev) => prev.filter((d) => d.id !== targetDeleteId));
      setSelectedIds((prev) => prev.filter((i) => i !== targetDeleteId));
    } else if (selectedIds.length > 0) {
      setData((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
      setSelectedIds([]);
    }
    setConfirmOpen(false);
    setTargetDeleteId(null);
  };

  return (
    <div
      className="qhr-admin-page"
      dir="rtl"
      style={{
        padding: 'var(--qhr-space-8)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--qhr-font-family-primary)',
        color: 'var(--qhr-text-primary, #f8fafc)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--qhr-space-6)',
          paddingBottom: 'var(--qhr-space-4)',
          borderBottom: '1px solid var(--qhr-border-subtle, rgba(255,255,255,0.08))',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--qhr-text-2xl)',
              fontWeight: 700,
              color: 'var(--qhr-text-primary)',
              margin: '0 0 var(--qhr-space-1) 0',
            }}
          >
            إدارة الموارد والعمليات
          </h1>
          <p
            style={{
              fontSize: 'var(--qhr-text-sm)',
              color: 'var(--qhr-text-secondary)',
              margin: 0,
            }}
          >
            استعراض شامل لكافة موارد النظام، مع إمكانية الفرز، والتعديل، والعمليات المجمعة.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleTheme}
          iconStart={<Icon name={theme === 'dark' ? 'sun' : 'moon'} size="xs" />}
        >
          {theme === 'dark' ? 'النمط الفاتح' : 'النمط الداكن'}
        </Button>
      </header>

      <div
        className="qhr-card"
        style={{
          padding: 'var(--qhr-space-6)',
          background: 'var(--qhr-surface-base)',
          borderRadius: 'var(--qhr-radius-lg)',
          border: '1px solid var(--qhr-border-subtle)',
          boxShadow: 'var(--qhr-shadow-sm)',
        }}
      >
        <DataTableToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="ابحث بالاسم، المعرف، أو التصنيف..."
          selectedCount={selectedIds.length}
          bulkActions={[
            {
              label: 'حذف المحدد',
              destructive: true,
              onClick: () => {
                setTargetDeleteId(null);
                setConfirmOpen(true);
              },
            },
          ]}
          createLabel="إضافة مورد جديد"
          onCreate={() => alert('إضافة مورد جديد')}
          onExport={() => alert('تصدير البيانات')}
        />

        <FilterBar
          filters={filters}
          onToggleFilter={setSelectedFilter}
          onClearAll={() => setSelectedFilter('all')}
        />

        <div style={{ marginTop: 'var(--qhr-space-4)' }}>
          <Table striped>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredData.length && filteredData.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="تحديد كافة السجلات"
                  />
                </TableHead>
                <TableHead>المعرف</TableHead>
                <TableHead>اسم المورد</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead style={{ textAlign: 'end' }}>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: 'center', padding: 'var(--qhr-space-8)' }}>
                    لا توجد سجلات مطابقة لمعايير البحث الحالية.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row) => {
                  const isSelected = selectedIds.includes(row.id);
                  const tone =
                    row.status === 'active'
                      ? 'success'
                      : row.status === 'pending'
                      ? 'warning'
                      : 'neutral';
                  const label =
                    row.status === 'active'
                      ? 'نشط'
                      : row.status === 'pending'
                      ? 'قيد الانتظار'
                      : 'مؤرشف';

                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectItem(row.id, e.target.checked)}
                          aria-label={`تحديد ${row.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <code style={{ fontSize: 'var(--qhr-text-xs)', color: 'var(--qhr-color-neutral-600)' }}>
                          {row.id}
                        </code>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>{row.name}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>
                        <Badge tone={tone} size="sm">
                          {label}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ fontSize: 'var(--qhr-text-xs)' }}>{row.date}</TableCell>
                      <TableCell style={{ textAlign: 'end', whiteSpace: 'nowrap' }}>
                        <Button type="button" variant="ghost" size="xs">
                          <Icon name="edit" size={14} />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          style={{ color: 'var(--qhr-color-danger-600)' }}
                          onClick={() => handleDeleteRequest(row.id)}
                        >
                          <Icon name="delete" size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={3}
          totalItems={filteredData.length}
          pageSize={5}
          onPageChange={setCurrentPage}
        />
      </div>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={targetDeleteId ? `تأكيد حذف المورد (${targetDeleteId})` : 'تأكيد حذف الموارد المحددة'}
        description="هذا الإجراء سيؤدي إلى حذف السجل نهائياً من قاعدة البيانات. هل تريد الاستمرار؟"
        confirmLabel="نعم، حذف نهائي"
        destructive={true}
      />
    </div>
  );
};

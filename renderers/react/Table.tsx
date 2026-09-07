import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  striped = false,
  className = '',
  ...props
}) => {
  const classes = [
    'qhr-table',
    striped ? 'qhr-table--striped' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="qhr-table-container">
      <table className={classes} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <thead className={`qhr-table-head ${className}`.trim()} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tbody className={`qhr-table-body ${className}`.trim()} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tr className={`qhr-table-row ${className}`.trim()} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <th className={`qhr-table-th ${className}`.trim()} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`qhr-table-td ${className}`.trim()} {...props}>
    {children}
  </td>
);

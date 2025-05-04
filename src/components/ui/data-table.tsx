
import React from 'react';
import { cn } from '@/lib/utils';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/5", className)}>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-right bg-black/40 border-b border-white/5">
            {columns.map((column, index) => (
              <th 
                key={index} 
                className={cn(
                  "px-4 py-2 text-xs font-medium text-gray-400", 
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={cn(
                "border-b border-white/5 bg-black/20 last:border-0 hover:bg-black/40 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className={cn("px-4 py-2 text-white", column.className)}
                >
                  {typeof column.accessor === 'function' 
                    ? column.accessor(row)
                    : row[column.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

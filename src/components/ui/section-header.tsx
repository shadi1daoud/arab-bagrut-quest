
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function SectionHeader({
  title,
  icon,
  actionLabel,
  actionHref,
  onActionClick,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "bg-black/90 p-3 flex items-center justify-between border-t border-white/10 rounded-b-xl",
        className
      )}
      {...props}
    >
      <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
        {icon}
        {title}
      </h3>
      
      {actionLabel && (
        actionHref ? (
          <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto" asChild>
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : (
          <Button 
            variant="link" 
            className="text-xs text-[#FF4800] p-0 h-auto"
            onClick={onActionClick}
          >
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}

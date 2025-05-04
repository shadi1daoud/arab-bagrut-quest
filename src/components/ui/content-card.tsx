
import React from 'react';
import { Card, CardContent } from './card';
import { SectionHeader } from './section-header';

interface ContentCardProps {
  title: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ContentCard({
  title,
  icon,
  actionLabel,
  actionHref,
  onActionClick,
  children,
  className,
  contentClassName,
}: ContentCardProps) {
  return (
    <Card className={className}>
      <CardContent className={`p-0 ${contentClassName}`}>
        <div className="p-4 flex-1 flex flex-col">
          {children}
        </div>
        
        <SectionHeader 
          title={title}
          icon={icon}
          actionLabel={actionLabel}
          actionHref={actionHref}
          onActionClick={onActionClick}
          className="mt-auto"
        />
      </CardContent>
    </Card>
  );
}

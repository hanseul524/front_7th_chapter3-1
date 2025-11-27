import React from 'react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white shadow-sm',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            L
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold text-foreground">Hanghae Company</h1>
            <p className="text-xs text-muted-foreground">Design System Migration Project</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm font-semibold text-foreground">Demo User</div>
            <div className="text-xs text-muted-foreground">demo@example.com</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

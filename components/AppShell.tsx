'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function AppShell({ 
  children, 
  variant = 'default',
  className 
}: AppShellProps) {
  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500',
      className
    )}>
      <div className={cn(
        'container mx-auto px-4 py-6',
        variant === 'compact' ? 'max-w-2xl' : 'max-w-3xl'
      )}>
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            KnowYourRights AI
          </h1>
          <p className="text-white/80 text-sm">
            Instant legal guidance in your pocket
          </p>
        </header>
        
        <main className="space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

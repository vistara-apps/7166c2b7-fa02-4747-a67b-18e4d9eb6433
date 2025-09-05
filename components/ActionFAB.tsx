'use client';

import { cn } from '@/lib/utils';
import { Mic, Share2, Plus } from 'lucide-react';

interface ActionFABProps {
  variant: 'record' | 'share' | 'add';
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

export function ActionFAB({ 
  variant, 
  onClick, 
  isActive = false,
  className 
}: ActionFABProps) {
  const getIcon = () => {
    switch (variant) {
      case 'record':
        return <Mic className="w-6 h-6" />;
      case 'share':
        return <Share2 className="w-6 h-6" />;
      case 'add':
        return <Plus className="w-6 h-6" />;
    }
  };

  const getColors = () => {
    switch (variant) {
      case 'record':
        return isActive 
          ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25' 
          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
      case 'share':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600';
      case 'add':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50',
        getColors(),
        isActive && 'animate-pulse',
        className
      )}
    >
      {getIcon()}
    </button>
  );
}

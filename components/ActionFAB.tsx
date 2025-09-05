'use client';

import { useState } from 'react';
import { Mic, Square, Share2, Plus, X } from 'lucide-react';

interface ActionFABProps {
  variant: 'record' | 'share';
  onAction?: () => void;
  isActive?: boolean;
}

export function ActionFAB({ variant, onAction, isActive = false }: ActionFABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainAction = () => {
    if (variant === 'record') {
      onAction?.();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  if (variant === 'record') {
    return (
      <button
        onClick={handleMainAction}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          isActive
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        {isActive ? (
          <Square className="w-6 h-6 text-white fill-current" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6">
      {/* Expanded actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200">
            <Share2 className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200">
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={handleMainAction}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          isExpanded
            ? 'bg-gray-500 hover:bg-gray-600 rotate-45'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

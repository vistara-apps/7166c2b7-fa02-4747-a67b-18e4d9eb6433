'use client';

import { useState } from 'react';
import { US_STATES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown, Search, MapPin } from 'lucide-react';

interface StateSelectorProps {
  selectedState?: string;
  onStateChange: (state: string) => void;
  className?: string;
}

export function StateSelector({
  selectedState,
  onStateChange,
  className
}: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedStateData = US_STATES.find(state => state.code === selectedState);
  
  const filteredStates = US_STATES.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium">
            {selectedStateData ? selectedStateData.name : 'Select State'}
          </span>
        </div>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-modal z-50 max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
            </div>
          </div>

          {/* States List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredStates.map((state) => (
              <button
                key={state.code}
                onClick={() => {
                  onStateChange(state.code);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200',
                  selectedState === state.code && 'bg-white/20'
                )}
              >
                <span className="text-white/70 text-xs font-mono w-8">
                  {state.code}
                </span>
                <span className="text-white text-sm font-medium">
                  {state.name}
                </span>
              </button>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="p-4 text-center text-white/50 text-sm">
              No states found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

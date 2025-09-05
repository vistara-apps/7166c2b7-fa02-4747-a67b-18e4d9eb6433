'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { US_STATES } from '@/lib/constants';

interface StateSelectorProps {
  selectedState?: string;
  onStateSelect: (state: string) => void;
}

export function StateSelector({ selectedState, onStateSelect }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = US_STATES.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (state: string) => {
    onStateSelect(state);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg px-4 py-3 text-white hover:bg-opacity-20 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-400" />
          <span className="font-medium">
            {selectedState || 'Select your state'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg rounded-lg shadow-modal border border-white border-opacity-30 overflow-hidden animate-slide-up z-50">
          {/* Search input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search states..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* States list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredStates.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-all duration-200 text-gray-800 ${
                  selectedState === state ? 'bg-blue-100 font-medium' : ''
                }`}
              >
                {state}
              </button>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No states found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

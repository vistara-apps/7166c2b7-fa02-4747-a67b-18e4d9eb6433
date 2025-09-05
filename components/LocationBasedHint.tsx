'use client';

import { useState, useEffect } from 'react';
import { MapPin, AlertCircle, ChevronRight } from 'lucide-react';
import { getCurrentLocation, getStateFromCoordinates } from '@/lib/utils';

interface LocationBasedHintProps {
  onLocationDetected?: (state: string) => void;
  variant?: 'default' | 'expanded';
}

export function LocationBasedHint({ onLocationDetected, variant = 'default' }: LocationBasedHintProps) {
  const [currentState, setCurrentState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const position = await getCurrentLocation();
      const state = await getStateFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      
      setCurrentState(state);
      onLocationDetected?.(state);
    } catch (err) {
      setError('Unable to detect location. Please select your state manually.');
      console.error('Location detection failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-4 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-sm">Detecting your location...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4 animate-fade-in">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-sm">{error}</p>
            <button
              onClick={detectLocation}
              className="text-blue-300 text-sm hover:text-blue-200 mt-1 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Location Detected</h3>
              <p className="text-white text-opacity-70 text-sm">{currentState}</p>
            </div>
          </div>
          
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-20 animate-slide-up">
            <p className="text-white text-sm mb-3">
              Your rights and legal guidance are now customized for <strong>{currentState}</strong> state laws.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">State-specific guidance active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

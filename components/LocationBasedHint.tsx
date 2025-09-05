'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getUserLocation } from '@/lib/utils';
import { MapPin, ChevronRight } from 'lucide-react';

interface LocationBasedHintProps {
  onLocationDetected: (location: { state: string; city?: string }) => void;
  variant?: 'default' | 'expanded';
  className?: string;
}

export function LocationBasedHint({
  onLocationDetected,
  variant = 'default',
  className
}: LocationBasedHintProps) {
  const [location, setLocation] = useState<{ state: string; city?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const detectedLocation = await getUserLocation();
      if (detectedLocation) {
        setLocation(detectedLocation);
        onLocationDetected(detectedLocation);
      } else {
        setError('Unable to detect location');
      }
    } catch (err) {
      setError('Location access denied');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-detect location on mount
    detectLocation();
  }, []);

  if (error) {
    return (
      <div className={cn(
        'glass-card p-4 border-yellow-500/20',
        className
      )}>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-yellow-400" />
          <div className="flex-1">
            <p className="text-white/90 text-sm font-medium">
              Location not available
            </p>
            <p className="text-white/70 text-xs">
              Please select your state manually
            </p>
          </div>
          <button
            onClick={detectLocation}
            className="text-yellow-400 hover:text-yellow-300 text-xs underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn(
        'glass-card p-4',
        className
      )}>
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/90 text-sm">
            Detecting your location...
          </p>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className={cn(
        'glass-card p-4 cursor-pointer hover:bg-white/15 transition-colors duration-200',
        className
      )} onClick={detectLocation}>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-white/70" />
          <div className="flex-1">
            <p className="text-white/90 text-sm font-medium">
              Detect Location
            </p>
            <p className="text-white/70 text-xs">
              Get state-specific legal guidance
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/50" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'glass-card p-4',
      variant === 'expanded' && 'p-6',
      className
    )}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">
            {location.city ? `${location.city}, ` : ''}{location.state}
          </p>
          <p className="text-white/70 text-xs">
            Showing {location.state} state laws
          </p>
        </div>
        {variant === 'expanded' && (
          <button
            onClick={detectLocation}
            className="text-white/70 hover:text-white text-xs underline"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}

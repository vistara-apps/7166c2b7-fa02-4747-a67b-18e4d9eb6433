'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { LANGUAGES } from '@/lib/constants';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    // Get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, reverse geocode to get state
          setCurrentLocation('California'); // Demo value
        },
        (error) => {
          console.warn('Location access denied:', error);
          setCurrentLocation('Unknown');
        }
      );
    }
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      {/* Header */}
      <header className="glass-card m-4 mb-0 rounded-b-none">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KR</span>
            </div>
            <h1 className="text-lg font-bold text-white">
              {variant === 'compact' ? 'KnowYourRights' : 'KnowYourRights AI'}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {/* Location indicator */}
            {currentLocation && (
              <div className="flex items-center space-x-1 text-white text-sm bg-white bg-opacity-20 px-2 py-1 rounded-md">
                <MapPin className="w-3 h-3" />
                <span>{currentLocation}</span>
              </div>
            )}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white text-sm bg-white bg-opacity-20 px-2 py-1 rounded-md hover:bg-opacity-30 transition-all duration-200"
            >
              <Globe className="w-3 h-3" />
              <span>{LANGUAGES.find(l => l.code === currentLanguage)?.flag}</span>
            </button>

            {/* Menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-white border-opacity-20 p-4 space-y-2 animate-slide-up">
            <button className="block w-full text-left text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition-all duration-200">
              My Guides
            </button>
            <button className="block w-full text-left text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition-all duration-200">
              Encounter History
            </button>
            <button className="block w-full text-left text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition-all duration-200">
              Upgrade to Premium
            </button>
            <button className="block w-full text-left text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md transition-all duration-200">
              Settings
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="p-4 pt-0">
        {children}
      </main>
    </div>
  );
}

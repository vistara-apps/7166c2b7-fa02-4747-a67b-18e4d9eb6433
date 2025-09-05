'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { LANGUAGES } from '@/lib/constants';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'default';
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'default' 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: 'en' | 'es') => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {LANGUAGES.find(l => l.code === currentLanguage)?.flag} {LANGUAGES.find(l => l.code === currentLanguage)?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white bg-opacity-95 backdrop-blur-lg rounded-lg shadow-modal border border-white border-opacity-30 overflow-hidden animate-slide-up">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white hover:bg-opacity-20 transition-all duration-200 text-gray-800"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

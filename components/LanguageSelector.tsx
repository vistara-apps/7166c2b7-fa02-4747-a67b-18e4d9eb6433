'use client';

import { useState } from 'react';
import { LANGUAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown, Globe } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'default';
  className?: string;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  variant = 'default',
  className
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {selectedLang?.flag} {selectedLang?.name}
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-modal z-50 overflow-hidden">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code as 'en' | 'es');
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200',
                selectedLanguage === language.code && 'bg-white/20'
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-white text-sm font-medium">
                {language.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertTriangle, CheckCircle, Share2, Bookmark } from 'lucide-react';
import { Guide } from '@/lib/types';

interface GuideCardProps {
  guide: Guide;
  variant?: 'default' | 'expanded';
  onSave?: () => void;
  onShare?: () => void;
}

export function GuideCard({ guide, variant = 'default', onSave, onShare }: GuideCardProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const [activeTab, setActiveTab] = useState<'rights' | 'say' | 'avoid'>('rights');

  const tabs = [
    { id: 'rights', label: 'Your Rights', icon: CheckCircle },
    { id: 'say', label: 'What to Say', icon: BookOpen },
    { id: 'avoid', label: 'What NOT to Say', icon: AlertTriangle },
  ] as const;

  return (
    <div className="glass-card animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
            <p className="text-sm text-white text-opacity-70">{guide.state} • {guide.language === 'es' ? 'Español' : 'English'}</p>
          </div>
          <div className="flex items-center space-x-2">
            {onSave && (
              <button
                onClick={onSave}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}
            {onShare && (
              <button
                onClick={onShare}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="animate-slide-up">
          {/* Tab navigation */}
          <div className="flex border-b border-white border-opacity-20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-white bg-white bg-opacity-10 border-b-2 border-white'
                      : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-4">
            {activeTab === 'rights' && (
              <div className="space-y-3">
                <h4 className="font-medium text-white mb-3">Your Constitutional Rights:</h4>
                {guide.keyRights.map((right, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white text-sm leading-relaxed">{right}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'say' && (
              <div className="space-y-3">
                <h4 className="font-medium text-white mb-3">Recommended Phrases:</h4>
                {guide.whatToSay.map((phrase, index) => (
                  <div key={index} className="bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 rounded-lg p-3">
                    <p className="text-white text-sm font-medium">{phrase}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'avoid' && (
              <div className="space-y-3">
                <h4 className="font-medium text-white mb-3">Avoid These Mistakes:</h4>
                {guide.whatNotToSay.map((warning, index) => (
                  <div key={index} className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white text-sm">{warning}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

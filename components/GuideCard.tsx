'use client';

import { useState } from 'react';
import { Guide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, BookOpen, MessageSquare, AlertTriangle } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
  variant?: 'default' | 'expanded';
  onSave?: () => void;
  className?: string;
}

export function GuideCard({ 
  guide, 
  variant = 'default',
  onSave,
  className 
}: GuideCardProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const [activeTab, setActiveTab] = useState<'overview' | 'say' | 'dont-say'>('overview');

  return (
    <div className={cn(
      'glass-card p-6 space-y-4 fade-in',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {guide.title}
          </h3>
          <p className="text-white/70 text-sm">
            {guide.state} • {guide.language === 'es' ? 'Español' : 'English'}
          </p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-white/70" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/70" />
          )}
        </button>
      </div>

      {/* Content Preview */}
      {!isExpanded && (
        <p className="text-white/80 text-sm line-clamp-2">
          {guide.content}
        </p>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200',
                activeTab === 'overview'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <BookOpen className="w-4 h-4" />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => setActiveTab('say')}
              className={cn(
                'flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200',
                activeTab === 'say'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <MessageSquare className="w-4 h-4" />
              <span>What to Say</span>
            </button>
            
            <button
              onClick={() => setActiveTab('dont-say')}
              className={cn(
                'flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200',
                activeTab === 'dont-say'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Avoid Saying</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'overview' && (
              <div className="space-y-3">
                <p className="text-white/90 text-sm leading-relaxed">
                  {guide.content}
                </p>
              </div>
            )}

            {activeTab === 'say' && (
              <div className="space-y-3">
                <h4 className="text-white font-medium text-sm mb-3">
                  Recommended phrases to use:
                </h4>
                <ul className="space-y-2">
                  {guide.whatToSay.map((phrase, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      </div>
                      <p className="text-white/90 text-sm">"{phrase}"</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'dont-say' && (
              <div className="space-y-3">
                <h4 className="text-white font-medium text-sm mb-3">
                  Phrases to avoid:
                </h4>
                <ul className="space-y-2">
                  {guide.whatNotToSay.map((phrase, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                      </div>
                      <p className="text-white/90 text-sm">"{phrase}"</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-white/10">
            {onSave && (
              <button
                onClick={onSave}
                className="btn-secondary flex-1"
              >
                Save Guide
              </button>
            )}
            <button className="btn-primary flex-1">
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

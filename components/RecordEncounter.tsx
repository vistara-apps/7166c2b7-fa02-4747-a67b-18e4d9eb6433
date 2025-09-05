'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { generateId, formatDate } from '@/lib/utils';
import { EncounterLog } from '@/lib/types';
import { X, Save, Share2, MapPin, Clock } from 'lucide-react';

interface RecordEncounterProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: EncounterLog) => void;
  currentLocation?: string;
  className?: string;
}

export function RecordEncounter({
  isOpen,
  onClose,
  onSave,
  currentLocation,
  className
}: RecordEncounterProps) {
  const [notes, setNotes] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!notes.trim()) return;
    
    setIsSaving(true);
    
    const log: EncounterLog = {
      logId: generateId(),
      userId: 'current-user', // In real app, get from auth
      timestamp: new Date(),
      location: currentLocation,
      notes: notes.trim(),
      shared: isShared,
    };

    try {
      await onSave(log);
      setNotes('');
      setIsShared(false);
      onClose();
    } catch (error) {
      console.error('Error saving encounter log:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className={cn(
        'w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-2xl sm:rounded-2xl shadow-modal slide-up',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Record Encounter
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{formatDate(new Date())}</span>
            </div>
            {currentLocation && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{currentLocation}</span>
              </div>
            )}
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-white font-medium text-sm mb-2">
              Encounter Details
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what happened, who was involved, and any important details..."
              className="w-full h-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              autoFocus
            />
            <p className="text-white/50 text-xs mt-2">
              This information is stored locally and only shared if you choose to.
            </p>
          </div>

          {/* Share Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="share-log"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500/50"
            />
            <label htmlFor="share-log" className="text-white text-sm">
              Share anonymized metadata with community
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!notes.trim() || isSaving}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Log</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

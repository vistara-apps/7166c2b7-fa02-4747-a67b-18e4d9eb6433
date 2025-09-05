'use client';

import { useState } from 'react';
import { Mic, Square, Save, Share2, Clock, MapPin } from 'lucide-react';
import { formatDate, generateEncounterId } from '@/lib/utils';
import { EncounterLog } from '@/lib/types';

interface RecordEncounterProps {
  onSave?: (log: EncounterLog) => void;
  onShare?: (log: EncounterLog) => void;
}

export function RecordEncounter({ onSave, onShare }: RecordEncounterProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');

  const startRecording = () => {
    setIsRecording(true);
    setStartTime(new Date());
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
        },
        (error) => {
          console.warn('Location access denied:', error);
        }
      );
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const saveEncounter = () => {
    if (!notes.trim()) return;

    const log: EncounterLog = {
      logId: generateEncounterId(),
      userId: 'current_user', // In real app, get from auth
      timestamp: startTime || new Date(),
      location,
      notes: notes.trim(),
      shared: false,
    };

    onSave?.(log);
    
    // Reset form
    setNotes('');
    setStartTime(null);
    setLocation('');
  };

  const shareEncounter = () => {
    if (!notes.trim()) return;

    const log: EncounterLog = {
      logId: generateEncounterId(),
      userId: 'current_user',
      timestamp: startTime || new Date(),
      location,
      notes: notes.trim(),
      shared: true,
    };

    onShare?.(log);
  };

  return (
    <div className="glass-card animate-fade-in">
      <div className="p-4 border-b border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Record Encounter</h3>
          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-2 text-red-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Recording controls */}
        <div className="flex items-center justify-center space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Mic className="w-5 h-5" />
              <span>Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>

        {/* Encounter details */}
        {(isRecording || startTime) && (
          <div className="space-y-4 animate-slide-up">
            {/* Timestamp and location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {startTime && (
                <div className="flex items-center space-x-2 text-white text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{formatDate(startTime)}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center space-x-2 text-white text-sm">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Location recorded</span>
                </div>
              )}
            </div>

            {/* Notes input */}
            <div>
              <label htmlFor="notes" className="block text-white text-sm font-medium mb-2">
                Encounter Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what happened, who was involved, and any important details..."
                className="w-full h-32 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              />
            </div>

            {/* Action buttons */}
            {notes.trim() && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={saveEncounter}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={shareEncounter}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { GuideCard } from '@/components/GuideCard';
import { ActionFAB } from '@/components/ActionFAB';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LocationBasedHint } from '@/components/LocationBasedHint';
import { RecordEncounter } from '@/components/RecordEncounter';
import { StateSelector } from '@/components/StateSelector';
import { generateLegalGuide } from '@/lib/ai';
import { Guide, EncounterLog } from '@/lib/types';
import { LEGAL_SCENARIOS } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import { ArrowRight, BookOpen, Mic, Shield, Users } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
  const [selectedState, setSelectedState] = useState<string>('');
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [encounterLogs, setEncounterLogs] = useState<EncounterLog[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Handle location detection
  const handleLocationDetected = (location: { state: string; city?: string }) => {
    setSelectedState(location.state);
    setCurrentLocation(location.city ? `${location.city}, ${location.state}` : location.state);
  };

  // Generate guide for current state
  const generateGuide = async (scenario: string = 'Police Encounter') => {
    if (!selectedState) return;
    
    setIsLoading(true);
    try {
      const guideData = await generateLegalGuide(selectedState, scenario, selectedLanguage);
      
      const guide: Guide = {
        guideId: generateId(),
        state: selectedState,
        title: guideData.title,
        content: guideData.content,
        language: selectedLanguage,
        whatToSay: guideData.whatToSay,
        whatNotToSay: guideData.whatNotToSay,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setCurrentGuide(guide);
    } catch (error) {
      console.error('Error generating guide:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle encounter recording
  const handleSaveEncounter = async (log: EncounterLog) => {
    setEncounterLogs(prev => [log, ...prev]);
    // In a real app, save to backend/database
    console.log('Encounter saved:', log);
  };

  // Auto-generate guide when state/language changes
  useEffect(() => {
    if (selectedState) {
      generateGuide();
    }
  }, [selectedState, selectedLanguage]);

  return (
    <AppShell>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="glass-card p-8 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            KnowYourRights AI
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Get instant, state-specific legal guidance when you need it most. 
            Know what to say, what not to say, and how to protect your rights.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50</div>
              <div className="text-white/70 text-xs">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-white/70 text-xs">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/70 text-xs">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Detection */}
      <LocationBasedHint
        onLocationDetected={handleLocationDetected}
        className="mb-6"
      />

      {/* State Selection */}
      {!selectedState && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Select Your State</h3>
          <StateSelector
            selectedState={selectedState}
            onStateChange={setSelectedState}
          />
        </div>
      )}

      {/* Language Selection */}
      {selectedState && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Your Rights Guide</h3>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="glass-card p-8 text-center mb-6">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80">Generating your personalized legal guide...</p>
        </div>
      )}

      {/* Current Guide */}
      {currentGuide && !isLoading && (
        <GuideCard
          guide={currentGuide}
          variant="expanded"
          onSave={() => {
            // In a real app, save to user's saved guides
            console.log('Guide saved:', currentGuide);
          }}
          className="mb-6"
        />
      )}

      {/* Quick Actions */}
      {selectedState && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => generateGuide('Traffic Stop')}
            className="glass-card p-4 text-left hover:bg-white/15 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Traffic Stop</p>
                <p className="text-white/70 text-xs">Know your rights</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setIsRecording(true)}
            className="glass-card p-4 text-left hover:bg-white/15 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Record</p>
                <p className="text-white/70 text-xs">Document encounter</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Recent Encounters */}
      {encounterLogs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Recent Encounters</h3>
          <div className="space-y-3">
            {encounterLogs.slice(0, 3).map((log) => (
              <div key={log.logId} className="glass-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white/90 text-sm line-clamp-2 mb-2">
                      {log.notes}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-white/70">
                      <span>{log.timestamp.toLocaleDateString()}</span>
                      {log.location && <span>{log.location}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Overview */}
      {!selectedState && (
        <div className="space-y-4 mb-6">
          <h3 className="text-white font-semibold">Features</h3>
          
          <div className="glass-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-purple-400" />
              <h4 className="text-white font-medium">State-Specific Rights</h4>
            </div>
            <p className="text-white/80 text-sm">
              Get accurate legal information tailored to your state's laws and regulations.
            </p>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-medium">Multilingual Support</h4>
            </div>
            <p className="text-white/80 text-sm">
              Access guides and scripts in both English and Spanish for better communication.
            </p>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Mic className="w-5 h-5 text-red-400" />
              <h4 className="text-white font-medium">Encounter Recording</h4>
            </div>
            <p className="text-white/80 text-sm">
              Quickly document important details during or after legal encounters.
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <ActionFAB
        variant="record"
        onClick={() => setIsRecording(true)}
        isActive={isRecording}
      />

      {/* Record Encounter Modal */}
      <RecordEncounter
        isOpen={isRecording}
        onClose={() => setIsRecording(false)}
        onSave={handleSaveEncounter}
        currentLocation={currentLocation}
      />
    </AppShell>
  );
}

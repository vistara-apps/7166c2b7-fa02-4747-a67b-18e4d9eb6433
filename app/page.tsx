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
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { Guide, EncounterLog } from '@/lib/types';
import { SAMPLE_RIGHTS_DATA } from '@/lib/constants';
import { generateGuideId } from '@/lib/utils';
import { BarChart3, Users, TrendingUp, Crown } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');
  const [selectedState, setSelectedState] = useState<string>('');
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [encounters, setEncounters] = useState<EncounterLog[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  useEffect(() => {
    if (selectedState && SAMPLE_RIGHTS_DATA[selectedState as keyof typeof SAMPLE_RIGHTS_DATA]) {
      const stateData = SAMPLE_RIGHTS_DATA[selectedState as keyof typeof SAMPLE_RIGHTS_DATA];
      const guide: Guide = {
        guideId: generateGuideId(selectedState, currentLanguage),
        state: selectedState,
        title: `${selectedState} Legal Rights Guide`,
        content: `Your rights in ${selectedState}`,
        language: currentLanguage,
        keyRights: stateData.keyRights,
        whatToSay: stateData.whatToSay,
        whatNotToSay: stateData.whatNotToSay,
      };
      setCurrentGuide(guide);
    }
  }, [selectedState, currentLanguage]);

  const handleLocationDetected = (state: string) => {
    setSelectedState(state);
  };

  const handleRecordToggle = () => {
    if (!isPremium && encounters.length >= 3) {
      setShowSubscriptionModal(true);
      return;
    }
    setIsRecording(!isRecording);
  };

  const handleSaveEncounter = (log: EncounterLog) => {
    setEncounters(prev => [log, ...prev]);
    setIsRecording(false);
  };

  const handleShareEncounter = (log: EncounterLog) => {
    // In a real app, integrate with Farcaster API
    console.log('Sharing encounter:', log);
    setEncounters(prev => [log, ...prev]);
    setIsRecording(false);
  };

  const handleSubscribe = (tierId: string) => {
    if (tierId === 'premium') {
      setIsPremium(true);
    }
  };

  const handleSaveGuide = () => {
    if (!isPremium) {
      setShowSubscriptionModal(true);
      return;
    }
    // Save guide logic
    console.log('Guide saved');
  };

  const handleShareGuide = () => {
    // Share guide logic
    console.log('Guide shared');
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-3xl font-bold text-white">
            KnowYourRights AI
          </h1>
          <p className="text-lg text-white text-opacity-80 max-w-2xl mx-auto">
            Instant legal guidance in your pocket. Get state-specific rights information and 'what to say' scripts for any encounter.
          </p>
          
          {/* Language selector */}
          <div className="flex justify-center">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>

        {/* Location detection */}
        <LocationBasedHint onLocationDetected={handleLocationDetected} />

        {/* State selector */}
        {!selectedState && (
          <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-white mb-4">Select Your State</h2>
            <StateSelector
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-opacity-70 text-sm">Detection Rate</p>
                <p className="text-white text-xl font-bold">97.6%</p>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white text-opacity-70 text-sm">Active Users</p>
                <p className="text-white text-xl font-bold">15.2K</p>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white text-opacity-70 text-sm">Success Rate</p>
                <p className="text-white text-xl font-bold">89.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current guide */}
        {currentGuide && (
          <GuideCard
            guide={currentGuide}
            variant="expanded"
            onSave={handleSaveGuide}
            onShare={handleShareGuide}
          />
        )}

        {/* Recording interface */}
        {isRecording && (
          <RecordEncounter
            onSave={handleSaveEncounter}
            onShare={handleShareEncounter}
          />
        )}

        {/* Recent encounters */}
        {encounters.length > 0 && (
          <div className="glass-card animate-fade-in">
            <div className="p-4 border-b border-white border-opacity-20">
              <h3 className="text-lg font-semibold text-white">Recent Encounters</h3>
            </div>
            <div className="p-4 space-y-3">
              {encounters.slice(0, 3).map((encounter) => (
                <div key={encounter.logId} className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">
                      {encounter.timestamp.toLocaleDateString()}
                    </span>
                    {encounter.shared && (
                      <span className="text-green-400 text-xs bg-green-500 bg-opacity-20 px-2 py-1 rounded">
                        Shared
                      </span>
                    )}
                  </div>
                  <p className="text-white text-opacity-80 text-sm">
                    {encounter.notes.length > 100 
                      ? `${encounter.notes.substring(0, 100)}...` 
                      : encounter.notes
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium upgrade prompt */}
        {!isPremium && encounters.length >= 2 && (
          <div className="glass-card p-6 text-center animate-fade-in">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Unlock Premium Features</h3>
            <p className="text-white text-opacity-80 mb-4">
              Get unlimited encounter recording, multilingual support, and priority assistance.
            </p>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="btn-primary"
            >
              Upgrade to Premium
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center space-x-4 pb-20">
          <button
            onClick={() => setSelectedState('')}
            className="btn-secondary"
          >
            Change State
          </button>
          {selectedState && (
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="btn-primary"
            >
              View Premium Features
            </button>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <ActionFAB
        variant="record"
        onAction={handleRecordToggle}
        isActive={isRecording}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
      />
    </AppShell>
  );
}

'use client';

import { useState } from 'react';
import { X, Check, Crown, Zap } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/lib/constants';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe?: (tierId: string) => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  const [selectedTier, setSelectedTier] = useState('premium');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // In a real app, integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onSubscribe?.(selectedTier);
      onClose();
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl shadow-modal max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Upgrade to Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tier selection */}
          <div className="space-y-3">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedTier === tier.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${tier.isPopular ? 'ring-2 ring-purple-200' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.isPopular && (
                  <div className="absolute -top-2 left-4 bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{tier.name}</h3>
                    <p className="text-2xl font-bold text-gray-800">
                      ${tier.price}
                      {tier.price > 0 && <span className="text-sm font-normal text-gray-500">/month</span>}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTier === tier.id
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedTier === tier.id && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={handleSubscribe}
            disabled={isLoading || selectedTier === 'free'}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>
                  {selectedTier === 'free' ? 'Current Plan' : 'Subscribe Now'}
                </span>
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center">
            Cancel anytime. No hidden fees. Your privacy is protected.
          </p>
        </div>
      </div>
    </div>
  );
}

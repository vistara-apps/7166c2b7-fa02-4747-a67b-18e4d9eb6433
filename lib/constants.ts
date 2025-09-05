export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
] as const;

export const SUBSCRIPTION_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic state-specific guides',
      'English language support',
      'Limited encounter recording'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5,
    features: [
      'All state-specific guides',
      'English & Spanish support',
      'Unlimited encounter recording',
      'Real-time incident sharing',
      'Priority support'
    ],
    isPopular: true
  }
];

export const SAMPLE_RIGHTS_DATA = {
  'California': {
    keyRights: [
      'You have the right to remain silent',
      'You have the right to refuse searches without a warrant',
      'You have the right to ask if you are free to leave',
      'You have the right to record police interactions in public'
    ],
    whatToSay: [
      '"I am exercising my right to remain silent"',
      '"I do not consent to any searches"',
      '"Am I free to leave?"',
      '"I would like to speak to a lawyer"'
    ],
    whatNotToSay: [
      'Don\'t lie or provide false information',
      'Don\'t resist physically, even if you believe the stop is unlawful',
      'Don\'t argue about your rights on the scene',
      'Don\'t consent to searches'
    ]
  },
  'Texas': {
    keyRights: [
      'You have the right to remain silent',
      'You have the right to refuse consent to search',
      'You have the right to ask if you are being detained',
      'You have the right to record in public spaces'
    ],
    whatToSay: [
      '"I invoke my right to remain silent"',
      '"I do not consent to searches"',
      '"Am I being detained or am I free to go?"',
      '"I want to speak with an attorney"'
    ],
    whatNotToSay: [
      'Don\'t provide false identification',
      'Don\'t physically resist',
      'Don\'t argue or become confrontational',
      'Don\'t volunteer information'
    ]
  }
};

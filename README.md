# KnowYourRights AI

Instant legal guidance in your pocket. A Base Mini App that provides state-specific legal rights information and guidance during encounters.

## Features

- **State-Specific Rights Guides**: Customized legal information based on your location
- **Multilingual Support**: Available in English and Spanish
- **Quick Record Button**: Document encounters in real-time
- **Location-Aware Content**: Automatic state detection and relevant legal guidance
- **Premium Subscription**: Advanced features for unlimited access

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI/OpenRouter for content generation
- **Backend**: Supabase (planned)
- **Payments**: Stripe integration
- **Social**: Farcaster integration

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd knowyourrights-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key for Base integration
- `OPENAI_API_KEY` or `OPENROUTER_API_KEY`: For AI content generation
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEYNAR_API_KEY`: Farcaster API key

## Core Components

### AppShell
Main application layout with navigation and language selection.

### GuideCard
Displays state-specific legal rights with tabbed interface for rights, what to say, and what to avoid.

### RecordEncounter
Interface for documenting legal encounters with timestamp and location tracking.

### LocationBasedHint
Automatic location detection and state-specific content suggestions.

### SubscriptionModal
Premium subscription upgrade interface with Stripe integration.

## Data Models

### User
- userId, fId, createdAt, locale, location

### Guide
- guideId, state, title, content, language, keyRights, whatToSay, whatNotToSay

### EncounterLog
- logId, userId, timestamp, location, notes, shared, guideVersion

## API Integration

### OpenAI/OpenRouter
- Generate state-specific legal guides
- Translate content to Spanish
- Create encounter summaries

### Supabase
- User data management
- Guide storage and retrieval
- Encounter logging

### Stripe
- Premium subscription handling
- Payment processing

### Farcaster (Neynar)
- Social sharing of rights cards
- User identity integration

## Design System

The app uses a custom design system with:
- **Colors**: Purple-blue gradient theme with glass morphism
- **Typography**: Inter font with clear hierarchy
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and micro-interactions
- **Mobile-first**: Responsive design optimized for mobile devices

## Deployment

The app is designed to be deployed as a Base Mini App and can be integrated into:
- Base Wallet
- Farcaster Frames
- Web browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.

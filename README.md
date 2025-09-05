# KnowYourRights AI

Instant legal guidance in your pocket. A Base Mini App that provides state-specific legal rights information and guidance during stressful encounters.

## Features

- **State-Specific Rights Guides**: One-page, mobile-optimized guides with simplified, state-specific legal rights and scripts
- **Multilingual Support**: Available in English and Spanish for broader accessibility
- **Quick Record Button**: Document encounter details in real-time
- **Location-Aware Content**: Automatically suggests relevant legal information based on user location
- **AI-Powered Content**: Dynamic generation of "what to say" and "what not to say" scripts

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit and MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI GPT for content generation
- **TypeScript**: Full type safety throughout

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
   
   Fill in your API keys:
   - `OPENAI_API_KEY` or `OPENROUTER_API_KEY` for AI content generation
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` for Base integration

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and other providers
│   └── globals.css        # Global styles and design tokens
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app container
│   ├── GuideCard.tsx      # Legal guide display
│   ├── ActionFAB.tsx      # Floating action button
│   ├── LanguageSelector.tsx
│   ├── LocationBasedHint.tsx
│   ├── RecordEncounter.tsx
│   └── StateSelector.tsx
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── constants.ts       # App constants
│   ├── utils.ts           # Utility functions
│   └── ai.ts              # AI content generation
└── README.md
```

## Design System

The app uses a custom design system with:

- **Colors**: Purple-blue gradient theme with glass morphism effects
- **Typography**: Clean, readable fonts optimized for mobile
- **Spacing**: Consistent spacing scale (xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px)
- **Components**: Modular, reusable components with variants

## Key Components

### GuideCard
Displays legal rights information with expandable sections for overview, "what to say", and "what not to say".

### RecordEncounter
Modal interface for documenting legal encounters with timestamp and location data.

### LocationBasedHint
Automatically detects user location and provides state-specific guidance.

### LanguageSelector
Switches between English and Spanish content.

## API Integration

- **OpenAI**: Generates dynamic legal content based on state laws and scenarios
- **MiniKit**: Integrates with Base blockchain for Web3 functionality
- **Geolocation**: Detects user location for state-specific content

## Deployment

The app is optimized for deployment on Vercel or similar platforms:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This app provides general legal information and should not be considered as legal advice. Always consult with a qualified attorney for specific legal matters.

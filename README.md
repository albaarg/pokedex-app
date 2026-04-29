# Pokedex React Native Challenge

A modern React Native mobile application for exploring Pokémon. Built with Expo, this app allows users to browse a paginated Pokédex, search Pokémon by name, view detailed information, and manage a list of favorites.

## Features

- **Pokemon list** - Explore a paginated list with infinite scroll and optimized rendering for smooth performance
- **Progressive Image Loading** - Improved perceived performance with efficient image loading strategies
- **Pokémon Details** - View detailed information including stats, types, abilities, and artwork
- **Search & Filter** - Real-time filtering by name for quick discovery Favorites Management – Add and remove Pokémon, and access your personalized favorites list
- **Offline Support** - Access favorites and the last loaded list without internet connection
- **Data Persistence** - Local storage integration to maintain state across sessions
- **Loading & Error States** - Clear UI feedback for loading, empty, and error scenarios with retry options
- **Optimized UX** - Smooth interactions powered by performant lists and responsive design

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Expo](https://expo.dev) (SDK 54) |
| Language | TypeScript 5.9 |
| Navigation | React Navigation v6 |
| Data Fetching | TanStack React Query |
| HTTP Client | Axios |
| Styling | React Native StyleSheet |
| Testing | Jest + Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm
- [Expo Go](https://expo.dev/go) app
  
### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pokedex-app-rn
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (or update the existing one):

   ```env
   EXPO_PUBLIC_API_URL=https://pokeapi.co/api/v2
   EXPO_PUBLIC_POKEMON_SPRITE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon
   EXPO_PUBLIC_POKEMON_ARTWORK_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
   ```
4. **Run the app**

   ```bash
   # Run with Expo Go
   npx expo start

   # iOS Simulator (macOS only)
   npm run ios

   # Android Emulator
   npm run android

   # Web browser
   npm run web
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run ios` | Build and run on iOS simulator |
| `npm run android` | Build and run on Android emulator |
| `npm run web` | Run in web browser |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Architecture & Design Decisions

### Feature-Based Architecture

The codebase follows a **feature-sliced design** pattern, organizing code by business domain rather than technical layer:

```
features/
├── pokemon/              # Pokémon domain
│   ├── api/              # API calls (list, detail)
│   ├── components/       # UI components (cards, lists)
│   ├── hooks/            # Data fetching & state logic
│   ├── types/            # TypeScript models
│   └── screens/          # List & detail screens
├── favorites/            # Favorites management
│   ├── hooks/            # Local persistence & logic
│   ├── components/       # Favorites UI
│   └── screens/          # Favorites screen
```

### Compound Component Pattern 
- UI components are designed using the compound pattern to create flexible and reusable building blocks. 
- Components expose subcomponents to compose complex UIs Encourages separation of concerns and better readability Improves scalability for growing interfaces

**Why this approach?**

- **Colocation** - Related code lives together, making features easy to understand and modify
- **Encapsulation** - Each feature exposes a clean public API via barrel exports
- **Scalability** - New features can be added without affecting existing ones
- **Team autonomy** - Different team members can work on different features with minimal conflicts
- **UI Flexibility** – Compound components enable reusable UI structures
- **Separation of Concerns** – Clear boundaries between API, hooks, and UI

### Server State Management with React Query

Instead of traditional state management (Redux, Zustand), we use **TanStack React Query** for server state:

```typescript
// Simple, declarative data fetching
const { data, isLoading, error, fetchNextPage } = usePokemonList();
```

**Benefits:**

- **Automatic caching** - Data is cached and shared across components
- **Background refetching** - Stale data is automatically refreshed
- **Optimistic updates** - Mutations can update UI immediately
- **Built-in loading/error states** - No boilerplate for async state
- **Smart retries** - Failed requests are retried with exponential backoff

### Centralized Error Handling

The app implements a multi-layer error handling strategy:


```
┌─────────────────────────────────────────┐
│              UI Components              │
│  Show loading, empty and error states   │
├─────────────────────────────────────────┤
│          React Query Layer              │
│  Handles errors, caching and retries    │
├─────────────────────────────────────────┤
│               API Layer                 │
│  Raw HTTP calls via axios               │
└─────────────────────────────────────────┘
```

**Key components:**

- ErrorState component – Reusable error UI with retry
- React Query states – Handles loading and error states
- Data mapping layer – Transforms API responses

**Why this design?**

- **Single source of truth** - All API errors flow through one transformation layer
- **User-friendly messages** - Technical errors are translated to actionable messages

### Separation of Concerns in Hooks

Data fetching and UI logic are separated into focused hooks

This separation ensures:
- Data hooks are reusable across different UI contexts
- UI logic is testable without mocking network calls
- Components remain focused on presentation

## Project Structure

```bash
pokedex-app-rn/
├── assets/                # Images, fonts, static files
├── src/
│   ├── components/        # Shared UI components
│   │   ├── ui/            # Base components (Input, ErrorState, etc.)
│   ├── constants/         # Theme, colors, config values
│   ├── features/          # Feature-based modules
│   │   ├── pokemon/
│   │   │   ├── api/       # API calls
│   │   │   ├── components/ # Pokémon UI components
│   │   │   ├── hooks/     # Data fetching & logic
│   │   │   ├── screens/   # List & detail screens
│   │   │   └── types/     # Models
│   │   ├── favorites/
│   │   │   ├── hooks/     # Favorites logic & persistence
│   │   │   ├── screens/   # Favorites screen
│   │   │   └── components/
│   ├── hooks/             # Shared hooks (e.g. useDebounce)
│   ├── lib/               # Core utilities (query client, storage, etc.)
│   └── navigation/        # React Navigation setup (tabs + stacks)
├── App.tsx                # App entry point
├── index.ts               # Root registration
```

## License

This project is private and proprietary.

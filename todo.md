# Retro Game Portal - Project TODO

## Phase 1: Research & Curation ✓
- [x] Research 50+ iconic 2000s–2010s Flash games
- [x] Curate game metadata (title, genre, year, description)
- [x] Identify SWF sources (Internet Archive, CDN links)
- [x] Create games_curated_list.json with 52 games

## Phase 2: Project Setup & Design Tokens ✓
- [x] Initialize Tailwind CSS with retro-futuristic aesthetic
- [x] Define CSS variables for scanline effect, neon colors (cyan #00FFFF, magenta #FF00FF)
- [x] Create chromatic aberration effect for text/elements
- [x] Add monospace font for error codes and technical artifacts
- [x] Build global styles with dark background texture and scanlines
- [x] Set up Google Fonts for bold, white, sans-serif typography

## Phase 3: Database & Game Library ✓
- [x] Create Drizzle schema for games table (id, title, genre, year, description, thumbnail, swfUrl, featured)
- [x] Create Drizzle schema for favorites table (userId, gameId, createdAt) - optional, using localStorage instead
- [x] Populate database with 52 games from curated list
- [x] Add featured/trending games flags to 5-8 games
- [x] Generate and upload game thumbnails to S3 storage
- [x] Write database queries in server/db.ts

## Phase 4: Core UI & Navigation ✓
- [x] Build homepage layout with hero banner section
- [x] Implement featured/trending games carousel on homepage
- [x] Create game grid component with game cards
- [x] Build genre filter tabs (Action, Puzzle, Adventure, Sports, Strategy, Arcade)
- [x] Implement search bar with real-time filtering
- [x] Add responsive grid layout (mobile: 1 col, tablet: 2 cols, desktop: 3-4 cols)
- [x] Create game card component with title, thumbnail, genre badge
- [x] Build navigation header with logo and search

## Phase 5: Game Detail & Ruffle Integration ✓
- [x] Create game detail page layout
- [x] Integrate Ruffle Flash emulator via CDN
- [x] Build game player component that loads SWF via Ruffle
- [x] Implement full-screen play mode
- [x] Create game info panel (title, description, genre, year, related games)
- [x] Build related games section (show 4-6 similar genre games)
- [x] Add game controls UI (play, pause, restart buttons)
- [x] Handle SWF loading errors gracefully

## Phase 6: Favorites & Polish ✓
- [x] Implement localStorage-based favorites system
- [x] Add heart/star icon to toggle favorites on game cards
- [x] Create favorites page/section to display saved games
- [x] Persist favorites to localStorage on every change
- [x] Add favorites counter badge to navigation
- [x] Implement responsive design for all breakpoints
- [x] Add loading states and skeleton screens
- [x] Test game playback across multiple games
- [x] Optimize images and assets

## Phase 7: Testing & Deployment ✓
- [x] Test homepage hero and featured section
- [x] Test genre filtering on all categories
- [x] Test search functionality with various queries
- [x] Test game detail pages and Ruffle emulator
- [x] Test favorites system (add, remove, persistence)
- [x] Test responsive design on mobile, tablet, desktop
- [x] Test full-screen mode on multiple games
- [x] Verify all SWF files load correctly
- [x] Performance optimization (lazy load images, code splitting)
- [x] Create checkpoint and publish

## Design System
- **Background:** Deep black (#0A0A0A) with subtle horizontal scanlines
- **Primary Text:** Bold white (#FFFFFF) with chromatic aberration (cyan + magenta offset)
- **Accent Colors:** Neon cyan (#00FFFF), Neon magenta (#FF00FF)
- **Secondary Text:** Monospace for error codes, technical elements
- **Borders/Elements:** Thin cyan/magenta glitch effect
- **Hover States:** Increased glow, color shift
- **Animations:** Subtle scanline flicker, text glow pulse

## Constraints
- Genre tags must use exact names: Action, Puzzle, Adventure, Sports, Strategy, Arcade
- All 52 games must have complete metadata
- Favorites use localStorage only (no backend required)
- Ruffle must load SWF from CDN/Internet Archive without plugins
- Fully responsive design required
- Retro-futuristic "system failure" aesthetic throughout


## Bug Fixes & Real Icons ✓
- [x] Fix Tailwind CSS utility class warnings in dev server
- [x] Fix container styling to use inline styles instead of Tailwind classes
- [x] Fix loading state logic in GameDetail page
- [x] Replace all placeholder thumbnails with real game icons from web
- [x] Verify all game SWF URLs are working
- [x] Test game playback on multiple games
- [x] Fix any responsive design issues on mobile
- [x] Optimize image loading performance
- [x] Add proper error boundaries for failed game loads


## New Features: Ratings, Leaderboards & Guides ✓
- [x] Create database tables for ratings, reviews, leaderboards, and guides
- [x] Build ratings & reviews UI component with star ratings
- [x] Implement comment system for game reviews
- [x] Create leaderboards page with high score rankings
- [x] Implement score tracking system in localStorage
- [x] Build game guides system with tips and walkthroughs
- [x] Create in-game help overlay with keyboard shortcuts
- [x] Add guide toggle button to game detail page
- [x] Test all new features
- [x] Deploy and verify

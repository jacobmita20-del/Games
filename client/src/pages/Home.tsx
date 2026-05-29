import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { trpc } from '@/lib/trpc';

const GENRES = ['Action', 'Puzzle', 'Adventure', 'Sports', 'Strategy', 'Arcade'] as const;

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedGames, setDisplayedGames] = useState<any[]>([]);

  // Fetch all games
  const { data: allGames = [], isLoading: loadingAll } = trpc.games.list.useQuery();
  
  // Fetch featured games
  const { data: featuredGames = [] } = trpc.games.featured.useQuery();
  
  // Fetch games by genre
  const { data: genreGames = [] } = trpc.games.byGenre.useQuery(
    { genre: selectedGenre || '' },
    { enabled: !!selectedGenre }
  );
  
  // Search games
  const { data: searchResults = [] } = trpc.games.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  // Update displayed games based on filters
  useEffect(() => {
    if (searchQuery.length > 0) {
      setDisplayedGames(searchResults);
    } else if (selectedGenre) {
      setDisplayedGames(genreGames);
    } else {
      setDisplayedGames(allGames);
    }
  }, [searchQuery, selectedGenre, selectedEra, allGames, genreGames, searchResults]);

  const handleGameClick = (gameId: number) => {
    setLocation(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-cyan-400 bg-black/50 sticky top-0 z-50 backdrop-blur-sm">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }} className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white neon-glow">
                RETRO GAME PORTAL
              </div>
              <div className="text-xs text-cyan-400 font-mono">v1.0</div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/favorites"
                className="text-xs text-cyan-400 font-mono hover:text-magenta-500 transition-colors border border-cyan-400 px-3 py-1 hover:border-magenta-500"
              >
                ♡ FAVORITES
              </a>
              <div className="text-xs text-cyan-400 font-mono">
                &gt; {displayedGames.length} GAMES
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 border-b border-cyan-400">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 glitch" data-text="SYSTEM REBOOT">
              SYSTEM REBOOT
            </h1>
            <p className="text-lg text-gray-300 font-mono">
              &gt; ACCESSING RETRO GAME ARCHIVE... 1980s-2010s ERA
            </p>
            <p className="text-sm text-cyan-400 mt-2">
              [90+ GAMES AVAILABLE] [RUFFLE EMULATION ACTIVE]
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '42rem', margin: '0 auto 2rem' }}>
            <div className="relative">
              <Search className="absolute left-4 top-3 text-cyan-400" size={20} />
              <input
                type="text"
                placeholder="Search games by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border-2 border-cyan-400 text-white placeholder-gray-500 focus:outline-none focus:border-magenta-500 transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-gray-400 hover:text-cyan-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Featured Games Carousel */}
          {!selectedGenre && !searchQuery && featuredGames.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 neon-glow">
                ★ FEATURED GAMES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredGames.slice(0, 4).map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    thumbnail={game.thumbnail || ''}
                    genre={game.genre}
                    year={game.year || undefined}
                    difficulty={game.difficulty}
                    onGameClick={handleGameClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Era Filters */}
      <section className="border-b border-cyan-400 bg-black/50 py-4">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }}>
          <div className="mb-4">
            <p className="text-xs text-cyan-400 font-mono mb-2">SELECT ERA:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedEra(null)}
                className={`px-3 py-1 font-mono text-xs border border-cyan-400 transition-all ${
                  selectedEra === null
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                ALL ERAS
              </button>
              <button
                onClick={() => setSelectedEra('1980s')}
                className={`px-3 py-1 font-mono text-xs border border-cyan-400 transition-all ${
                  selectedEra === '1980s'
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                1980s
              </button>
              <button
                onClick={() => setSelectedEra('1990s')}
                className={`px-3 py-1 font-mono text-xs border border-cyan-400 transition-all ${
                  selectedEra === '1990s'
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                1990s
              </button>
              <button
                onClick={() => setSelectedEra('2000s')}
                className={`px-3 py-1 font-mono text-xs border border-cyan-400 transition-all ${
                  selectedEra === '2000s'
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                2000s
              </button>
              <button
                onClick={() => setSelectedEra('2010s')}
                className={`px-3 py-1 font-mono text-xs border border-cyan-400 transition-all ${
                  selectedEra === '2010s'
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                2010s
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filters */}
      <section className="border-b border-cyan-400 bg-black/50 py-4">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }}>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-4 py-2 font-bold text-sm border-2 transition-all ${
                selectedGenre === null
                  ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                  : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
              }`}
            >
              ALL GAMES
            </button>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 font-bold text-sm border-2 transition-all ${
                  selectedGenre === genre
                    ? 'border-magenta-500 bg-magenta-500/20 text-magenta-500'
                    : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                {genre.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }}>
          {loadingAll ? (
            <div className="text-center py-12">
              <div className="text-cyan-400 font-mono animate-pulse">
                &gt; LOADING GAMES...
              </div>
            </div>
          ) : displayedGames.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 neon-glow">
                {selectedGenre ? `${selectedGenre.toUpperCase()} GAMES` : 'ALL GAMES'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    thumbnail={game.thumbnail || ''}
                    genre={game.genre}
                    year={game.year || undefined}
                    difficulty={game.difficulty}
                    onGameClick={handleGameClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mono">
                &gt; NO GAMES FOUND
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400 bg-black/50 py-6 mt-12">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }} className="text-center">
          <p className="text-xs text-gray-500 font-mono">
            [RETRO GAME PORTAL v1.0] [RUFFLE EMULATION] [52 GAMES] [2000-2010s ERA]
          </p>
          <p className="text-xs text-cyan-400 font-mono mt-2">
            &gt; SYSTEM STATUS: ONLINE
          </p>
        </div>
      </footer>
    </div>
  );
}

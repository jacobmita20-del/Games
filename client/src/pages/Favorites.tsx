import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Trash2 } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { trpc } from '@/lib/trpc';

export default function Favorites() {
  const [, setLocation] = useLocation();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<any[]>([]);

  // Fetch all games
  const { data: allGames = [] } = trpc.games.list.useQuery();

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(saved);
  }, []);

  // Filter games that are in favorites
  useEffect(() => {
    const games = allGames.filter((game) => favoriteIds.includes(game.id));
    setFavoriteGames(games);
  }, [allGames, favoriteIds]);

  const handleGameClick = (gameId: number) => {
    setLocation(`/game/${gameId}`);
  };

  const handleRemoveFavorite = (gameId: number) => {
    const updated = favoriteIds.filter((id) => id !== gameId);
    setFavoriteIds(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all favorites?')) {
      setFavoriteIds([]);
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-cyan-400 bg-black/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-cyan-400 hover:text-magenta-500 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-mono text-sm">&lt; BACK</span>
            </button>
            <div className="text-center flex-1">
              <h1 className="font-bold text-white neon-glow">MY FAVORITES</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          {favoriteGames.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white neon-glow">
                  {favoriteGames.length} SAVED GAME{favoriteGames.length !== 1 ? 'S' : ''}
                </h2>
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-destructive text-destructive hover:bg-destructive/10 transition-all font-mono text-sm"
                >
                  <Trash2 size={16} />
                  CLEAR ALL
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favoriteGames.map((game) => (
                  <div key={game.id} className="relative group">
                    <GameCard
                      id={game.id}
                      title={game.title}
                      thumbnail={game.thumbnail || ''}
                      genre={game.genre}
                      year={game.year || undefined}
                      onGameClick={handleGameClick}
                    />
                    {/* Remove from favorites button */}
                    <button
                      onClick={() => handleRemoveFavorite(game.id)}
                      className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black/90 border border-destructive text-destructive opacity-0 group-hover:opacity-100 transition-all z-20"
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <div className="text-6xl mb-4">♡</div>
                <p className="text-gray-400 font-mono text-lg mb-2">
                  &gt; NO FAVORITES YET
                </p>
                <p className="text-gray-500 font-mono text-sm">
                  Start adding games to your favorites to see them here
                </p>
              </div>
              <button
                onClick={() => setLocation('/')}
                className="mt-8 px-6 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-mono font-bold"
              >
                EXPLORE GAMES
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400 bg-black/50 py-6 mt-12">
        <div className="container text-center">
          <p className="text-xs text-gray-500 font-mono">
            [FAVORITES VAULT v1.0] [{favoriteGames.length} GAMES SAVED]
          </p>
        </div>
      </footer>
    </div>
  );
}

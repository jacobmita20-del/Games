import { Heart, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPlayStatsBadges } from '@/hooks/usePlayStats';

interface GameCardProps {
  id: number;
  title: string;
  thumbnail: string;
  genre?: string | null;
  year?: number;
  difficulty?: string;
  onGameClick: (id: number) => void;
}

export default function GameCard({ id, title, thumbnail, genre, year, difficulty, onGameClick }: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [playBadges, setPlayBadges] = useState<string[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
    
    const allStats = JSON.parse(localStorage.getItem('playStats') || '{}');
    const gameStats = allStats[id];
    if (gameStats) {
      setPlayBadges(getPlayStatsBadges(gameStats.playCount));
    }
  }, [id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((fav: number) => fav !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGameClick(id);
  };

  return (
    <div
      onClick={() => onGameClick(id)}
      className="card-retro group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105"
    >
      {/* Game Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-800">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handlePlayClick}
            className="btn-retro flex items-center gap-2 text-lg font-bold"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
            }}
          >
            <Play size={28} fill="currentColor" />
            PLAY
          </button>
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-black/10" />
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black/90 rounded border border-cyan-400 transition-all"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-magenta-500 text-magenta-500' : 'text-cyan-400'}
          />
        </button>

        {/* Genre badge */}
        {genre && (
          <div className="absolute bottom-2 left-2">
            <span className="inline-block px-2 py-1 text-xs font-bold text-white border border-cyan-400 bg-black/70 neon-glow">
              {genre}
            </span>
          </div>
        )}

        {/* Difficulty badge */}
        {difficulty && (
          <div className="absolute bottom-2 right-2">
            <span className={`inline-block px-2 py-1 text-xs font-bold border neon-glow ${
              difficulty === 'Easy' ? 'text-green-400 border-green-400 bg-green-900/30' :
              difficulty === 'Hard' ? 'text-red-400 border-red-400 bg-red-900/30' :
              'text-yellow-400 border-yellow-400 bg-yellow-900/30'
            }`}>
              {difficulty}
            </span>
          </div>
        )}

        {/* Play badges */}
        {playBadges.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap max-w-[90%]">
            {playBadges.map((badge) => (
              <span key={badge} className="inline-block px-1.5 py-0.5 text-xs font-bold text-magenta-400 border border-magenta-400 bg-magenta-900/30 neon-glow">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="p-3 bg-gray-900">
        <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        {year && (
          <p className="text-xs text-gray-400">{year}</p>
        )}
        <div className="mt-2 text-xs text-cyan-400 font-mono">
          &gt; PLAY_GAME
        </div>
      </div>
    </div>
  );
}

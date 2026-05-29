import { useEffect, useState, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ArrowLeft, Heart, Maximize2, Share2, Play, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { usePlayStats } from '@/hooks/usePlayStats';
import GameRatings from '@/components/GameRatings';
import Leaderboards from '@/components/Leaderboards';
import GameGuide from '@/components/GameGuide';

declare global {
  interface Window {
    RufflePlayer: any;
  }
}

export default function GameDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/game/:id');
  const gameId = params?.id ? parseInt(params.id) : null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ruffleLoaded, setRuffleLoaded] = useState(false);
  const [gameError, setGameError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState('Initializing Ruffle emulator...');
  const containerRef = useRef<HTMLDivElement>(null);
  const ruffleRef = useRef<HTMLDivElement>(null);
  const playStartTimeRef = useRef<number>(0);
  const { recordPlay, recordPlayTime } = usePlayStats(gameId || 0);

  // Fetch game details
  const { data: game, isLoading } = trpc.games.byId.useQuery(
    { id: gameId || 0 },
    { enabled: !!gameId }
  );

  // Fetch related games (same genre)
  const { data: relatedGames = [] } = trpc.games.byGenre.useQuery(
    { genre: game?.genre || '' },
    { enabled: !!game?.genre }
  );

  // Record play when game loads
  useEffect(() => {
    if (ruffleLoaded && gameId) {
      recordPlay();
      playStartTimeRef.current = Date.now();
    }
  }, [ruffleLoaded, gameId, recordPlay]);

  // Record play time when leaving the page
  useEffect(() => {
    return () => {
      if (playStartTimeRef.current && gameId) {
        const playTime = Math.floor((Date.now() - playStartTimeRef.current) / 1000);
        if (playTime > 5) {
          recordPlayTime(playTime);
        }
      }
    };
  }, [gameId, recordPlayTime]);

  // Load Ruffle emulator script with multiple CDN fallbacks
  useEffect(() => {
    if (ruffleLoaded || window.RufflePlayer) {
      setRuffleLoaded(true);
      return;
    }

    const cdnUrls = [
      'https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@latest/dist/ruffle.js',
      'https://unpkg.com/@ruffle-rs/ruffle@latest/dist/ruffle.js',
      'https://esm.sh/@ruffle-rs/ruffle@latest/dist/ruffle.js',
    ];

    let currentCdnIndex = 0;

    const loadRuffleFromCdn = () => {
      if (currentCdnIndex >= cdnUrls.length) {
        setGameError('Failed to load Ruffle emulator from all CDN sources. Please try again later.');
        return;
      }

      const cdnUrl = cdnUrls[currentCdnIndex];
      setLoadingStatus(`Loading from CDN (${currentCdnIndex + 1}/${cdnUrls.length})...`);

      const script = document.createElement('script');
      script.src = cdnUrl;
      script.async = true;
      script.type = 'text/javascript';

      script.onload = () => {
        // Wait for RufflePlayer to be available
        let attempts = 0;
        const checkRuffle = setInterval(() => {
          if (window.RufflePlayer) {
            clearInterval(checkRuffle);
            setRuffleLoaded(true);
            setLoadingStatus('Ruffle loaded successfully');
          } else if (attempts > 50) {
            clearInterval(checkRuffle);
            currentCdnIndex++;
            loadRuffleFromCdn();
          }
          attempts++;
        }, 100);
      };

      script.onerror = () => {
        currentCdnIndex++;
        loadRuffleFromCdn();
      };

      document.head.appendChild(script);
    };

    loadRuffleFromCdn();
  }, [ruffleLoaded]);

  // Initialize Ruffle player when game loads
  useEffect(() => {
    if (game && ruffleRef.current && window.RufflePlayer && ruffleLoaded) {
      try {
        setGameError(null);
        setLoadingStatus('Loading game...');
        ruffleRef.current.innerHTML = '';

        const player = window.RufflePlayer.newest();
        const instance = player.createPlayer();
        ruffleRef.current.appendChild(instance);

        // Configure Ruffle with better options
        instance.load({
          url: game.swfUrl,
          allowFullScreen: true,
          allowNetworking: 'all',
          allowScriptAccess: 'always',
        });

        setLoadingStatus('Game loaded');
      } catch (error) {
        console.error('Error loading game:', error);
        setGameError('Failed to load game. The SWF file may be unavailable or incompatible.');
      }
    }
  }, [game, ruffleLoaded]);

  // Check if game is favorited
  useEffect(() => {
    if (gameId) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(gameId));
    }
  }, [gameId]);

  const handleFavorite = () => {
    if (!gameId) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: number) => id !== gameId);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      favorites.push(gameId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.().catch(() => {
          setGameError('Fullscreen not available in this browser.');
        });
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 font-mono animate-pulse">
          &gt; LOADING GAME...
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-mono mb-4">&gt; GAME NOT FOUND</p>
          <button
            onClick={() => setLocation('/')}
            className="px-4 py-2 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          >
            RETURN TO PORTAL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-cyan-400 bg-black/50 sticky top-0 z-40 backdrop-blur-sm">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }} className="py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-cyan-400 hover:text-magenta-500 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-mono text-sm">&lt; BACK</span>
          </button>
          <div className="text-center flex-1">
            <h1 className="font-bold text-white neon-glow">{game.title}</h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <div style={{ margin: '0 auto', padding: '2rem 1rem', maxWidth: '80rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Player */}
          <div className="lg:col-span-2">
            <div
              ref={containerRef}
              className="relative bg-black border-2 border-cyan-400 aspect-video overflow-hidden"
            >
              <div ref={ruffleRef} className="w-full h-full" />

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black/90 border border-cyan-400 text-cyan-400 hover:text-magenta-500 transition-all z-10"
              >
                <Maximize2 size={20} />
              </button>

              {/* Loading indicator */}
              {(!ruffleLoaded || !gameError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-none">
                  <div className="text-center">
                    <div className="text-cyan-400 font-mono text-sm animate-pulse mb-2">
                      &gt; {loadingStatus}
                    </div>
                    <div className="text-gray-500 font-mono text-xs">
                      Please wait...
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {gameError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 pointer-events-none">
                  <div className="text-center max-w-sm">
                    <AlertCircle size={32} className="text-magenta-500 mx-auto mb-3" />
                    <p className="text-magenta-500 font-mono text-sm mb-2">
                      &gt; ERROR
                    </p>
                    <p className="text-gray-300 text-sm">
                      {gameError}
                    </p>
                    <p className="text-gray-500 font-mono text-xs mt-4">
                      Try refreshing the page or selecting a different game
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <button
                onClick={handleFullscreen}
                className="btn-retro flex items-center gap-2 font-bold"
              >
                <Play size={20} fill="currentColor" />
                <span className="font-mono">PLAY FULLSCREEN</span>
              </button>
              <button
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-4 py-2 border-2 transition-all ${
                  isFavorite
                    ? 'border-magenta-500 text-magenta-500 bg-magenta-500/10'
                    : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                <span className="font-mono text-sm">
                  {isFavorite ? 'FAVORITED' : 'ADD TO FAVORITES'}
                </span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all">
                <Share2 size={18} />
                <span className="font-mono text-sm">SHARE</span>
              </button>
            </div>
          </div>

          {/* Game Info Sidebar */}
          <div className="space-y-6">
            {/* Game Details Card */}
            <div className="card-retro">
              <h2 className="text-lg font-bold text-white mb-4 neon-glow">GAME INFO</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 font-mono">&gt; TITLE</p>
                  <p className="text-cyan-400 font-bold">{game.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-mono">&gt; GENRE</p>
                  <p className="text-cyan-400 font-bold">{game.genre}</p>
                </div>
                {game.year && (
                  <div>
                    <p className="text-gray-400 font-mono">&gt; YEAR</p>
                    <p className="text-cyan-400 font-bold">{game.year}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Card */}
            {game.description && (
              <div className="card-retro">
                <h3 className="text-lg font-bold text-white mb-3 neon-glow">DESCRIPTION</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {game.description}
                </p>
              </div>
            )}

            {/* Related Games */}
            {relatedGames.length > 1 && (
              <div className="card-retro">
                <h3 className="text-lg font-bold text-white mb-4 neon-glow">RELATED GAMES</h3>
                <div className="space-y-2">
                  {relatedGames
                    .filter((g) => g.id !== game.id)
                    .slice(0, 4)
                    .map((relatedGame) => (
                      <button
                        key={relatedGame.id}
                        onClick={() => setLocation(`/game/${relatedGame.id}`)}
                        className="w-full text-left p-2 border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-sm text-cyan-400 font-mono truncate"
                      >
                        &gt; {relatedGame.title}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div style={{ margin: '0 auto', padding: '2rem 1rem', maxWidth: '80rem' }}>
        <GameRatings gameId={game.id} />
      </div>

      {/* Leaderboards */}
      <div style={{ margin: '0 auto', padding: '2rem 1rem', maxWidth: '80rem' }}>
        <Leaderboards gameId={game.id} />
      </div>

      {/* Game Guide */}
      <GameGuide gameId={game.id} />

      {/* Footer */}
      <footer className="border-t border-cyan-400 bg-black/50 py-6 mt-12">
        <div style={{ margin: '0 auto', padding: '0 1rem', maxWidth: '80rem' }} className="text-center">
          <p className="text-xs text-gray-500 font-mono">
            [GAME PLAYER v1.0] [RUFFLE EMULATION] [FLASH COMPATIBLE]
          </p>
        </div>
      </footer>
    </div>
  );
}

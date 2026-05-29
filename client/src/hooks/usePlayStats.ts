import { useState, useEffect } from 'react';

interface PlayStats {
  gameId: number;
  playCount: number;
  totalPlayTime: number; // in seconds
  lastPlayed: number; // timestamp
}

export function usePlayStats(gameId: number) {
  const [stats, setStats] = useState<PlayStats | null>(null);

  useEffect(() => {
    const allStats = JSON.parse(localStorage.getItem('playStats') || '{}');
    const gameStats = allStats[gameId] || { gameId, playCount: 0, totalPlayTime: 0, lastPlayed: 0 };
    setStats(gameStats);
  }, [gameId]);

  const recordPlay = () => {
    const allStats = JSON.parse(localStorage.getItem('playStats') || '{}');
    const gameStats = allStats[gameId] || { gameId, playCount: 0, totalPlayTime: 0, lastPlayed: 0 };
    
    gameStats.playCount += 1;
    gameStats.lastPlayed = Date.now();
    
    allStats[gameId] = gameStats;
    localStorage.setItem('playStats', JSON.stringify(allStats));
    setStats(gameStats);
  };

  const recordPlayTime = (seconds: number) => {
    const allStats = JSON.parse(localStorage.getItem('playStats') || '{}');
    const gameStats = allStats[gameId] || { gameId, playCount: 0, totalPlayTime: 0, lastPlayed: 0 };
    
    gameStats.totalPlayTime += seconds;
    gameStats.lastPlayed = Date.now();
    
    allStats[gameId] = gameStats;
    localStorage.setItem('playStats', JSON.stringify(allStats));
    setStats(gameStats);
  };

  return { stats, recordPlay, recordPlayTime };
}

export function getPlayStatsBadges(playCount: number): string[] {
  const badges = [];
  if (playCount >= 1) badges.push('PLAYED');
  if (playCount >= 5) badges.push('VETERAN');
  if (playCount >= 10) badges.push('MASTER');
  if (playCount >= 25) badges.push('LEGEND');
  return badges;
}

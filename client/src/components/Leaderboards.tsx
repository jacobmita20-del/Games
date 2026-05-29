import { Trophy } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface LeaderboardsProps {
  gameId: number;
}

export default function Leaderboards({ gameId }: LeaderboardsProps) {
  const { data: leaderboard = [], isLoading } = trpc.leaderboards.byGameId.useQuery({ gameId });

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="mt-8 border-t border-cyan-400 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={24} className="text-cyan-400" />
        <h3 className="text-xl font-bold text-white neon-glow">LEADERBOARD</h3>
      </div>

      {isLoading ? (
        <div className="text-center text-cyan-400 font-mono text-sm py-4">
          &gt; LOADING SCORES...
        </div>
      ) : leaderboard.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyan-400">
                <th className="text-left py-2 px-2 text-cyan-400 font-mono">#</th>
                <th className="text-left py-2 px-2 text-cyan-400 font-mono">PLAYER</th>
                <th className="text-right py-2 px-2 text-cyan-400 font-mono">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className="border-b border-cyan-400/20 hover:bg-cyan-400/10 transition-colors">
                  <td className={`py-2 px-2 font-bold ${getMedalColor(index + 1)}`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </td>
                  <td className="py-2 px-2 text-white">
                    {entry.playerName || `Player ${entry.userId}`}
                  </td>
                  <td className="py-2 px-2 text-right text-magenta-500 font-bold">
                    {entry.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm py-4 border border-cyan-400/30 p-4">
          &gt; NO SCORES YET - BE THE FIRST!
        </div>
      )}
    </div>
  );
}

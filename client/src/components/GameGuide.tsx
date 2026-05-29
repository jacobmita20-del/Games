import { useState, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface GameGuideProps {
  gameId: number;
}

function KeyboardShortcutListener({ onToggleGuide }: { onToggleGuide: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '?' || e.key === 'h') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onToggleGuide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleGuide]);
  return null;
}

export default function GameGuide({ gameId }: GameGuideProps) {
  const [showGuide, setShowGuide] = useState(false);
  const { data: guide, isLoading } = trpc.guides.byGameId.useQuery({ gameId });

  if (!guide || (!(guide as any).tips && !(guide as any).shortcuts && !(guide as any).title)) {
    return null;
  }

  const tips = Array.isArray((guide as any).tips) ? (guide as any).tips : ((guide as any).tips ? (guide as any).tips.split('\n').filter((t: string) => t.trim()) : []);
  const shortcuts = Array.isArray((guide as any).shortcuts) ? (guide as any).shortcuts : ((guide as any).keyboardShortcuts ? (guide as any).keyboardShortcuts.split('\n').filter((s: string) => s.trim()) : []);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setShowGuide(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all shadow-lg hover:shadow-xl"
        title="Game Guide (Press ? for help)"
      >
        <HelpCircle size={20} />
        <span className="hidden sm:inline">HELP</span>
      </button>

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-black border-2 border-cyan-400 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-400 bg-black/50">
              <h2 className="text-xl font-bold text-white neon-glow">GAME GUIDE</h2>
              <button
                onClick={() => setShowGuide(false)}
                className="text-cyan-400 hover:text-magenta-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {isLoading ? (
                <div className="text-center text-cyan-400 font-mono">
                  &gt; LOADING GUIDE...
                </div>
              ) : (
                <>
                  {/* Title & Description */}
                  {(guide as any).title && (
                    <div>
                      <h3 className="text-lg font-bold text-magenta-500 mb-2">{(guide as any).title}</h3>
                      <p className="text-gray-300 leading-relaxed">{(guide as any).content}</p>
                    </div>
                  )}

                  {/* Tips */}
                  {tips.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan-400 mb-3 uppercase">💡 TIPS & TRICKS</h4>
                      <ul className="space-y-2">
                        {tips.map((tip: any, idx: number) => (
                          <li key={idx} className="text-sm text-gray-300 flex gap-2">
                            <span className="text-cyan-400 font-bold">▸</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Keyboard Shortcuts */}
                  {shortcuts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan-400 mb-3 uppercase">⌨️ KEYBOARD SHORTCUTS</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {shortcuts.map((shortcut: any, idx: number) => {
                          const [key, action] = shortcut.split(':').map((s: string) => s.trim());
                          return (
                            <div key={idx} className="flex gap-2 text-sm">
                              <kbd className="px-2 py-1 bg-gray-800 border border-cyan-400 text-cyan-400 font-mono rounded text-xs">
                                {key}
                              </kbd>
                              <span className="text-gray-300">{action}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Close Button */}
                  <div className="pt-4 border-t border-cyan-400/30">
                    <button
                      onClick={() => setShowGuide(false)}
                      className="w-full px-4 py-2 bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all"
                    >
                      CLOSE GUIDE
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcut listener */}
      <KeyboardShortcutListener onToggleGuide={() => setShowGuide(!showGuide)} />
    </>
  );
}

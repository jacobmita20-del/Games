import { useState } from 'react';
import { Star } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface GameRatingsProps {
  gameId: number;
}

export default function GameRatings({ gameId }: GameRatingsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: ratingsData = { reviews: [], average: 0 }, isLoading } = trpc.ratings.byGameId.useQuery({ gameId });

  const handleSubmitRating = () => {
    if (selectedRating > 0) {
      setSubmitted(true);
      setSelectedRating(0);
      setReview('');
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="mt-8 border-t border-cyan-400 pt-6">
      <h3 className="text-xl font-bold text-white mb-4 neon-glow">★ RATINGS & REVIEWS</h3>
      
      {/* Average Rating */}
      <div className="mb-6 p-4 bg-black/50 border border-cyan-400">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-3xl font-bold text-cyan-400">{ratingsData.average.toFixed(1)}</div>
            <div className="text-sm text-gray-400">out of 5</div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={star <= Math.round(ratingsData.average) ? 'fill-cyan-400 text-cyan-400' : 'text-gray-600'}
              />
            ))}
          </div>
          <div className="text-sm text-gray-400 ml-auto">
            {ratingsData.reviews.length} reviews
          </div>
        </div>
      </div>

      {/* Submit Rating */}
      <div className="mb-6 p-4 bg-black/50 border border-magenta-500">
        <h4 className="text-sm font-bold text-magenta-500 mb-3">LEAVE YOUR RATING</h4>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setSelectedRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={
                  star <= (hoverRating || selectedRating)
                    ? 'fill-magenta-500 text-magenta-500'
                    : 'text-gray-600'
                }
              />
            </button>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your thoughts about this game..."
          className="w-full p-2 bg-gray-900 border border-cyan-400 text-white placeholder-gray-500 text-sm mb-3 focus:outline-none focus:border-magenta-500"
          rows={3}
        />
        <button
          onClick={handleSubmitRating}
          disabled={selectedRating === 0}
          className="px-4 py-2 bg-magenta-500 text-black font-bold text-sm hover:bg-magenta-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          SUBMIT RATING
        </button>
        {submitted && (
          <div className="mt-2 text-sm text-cyan-400">✓ Rating submitted!</div>
        )}
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="text-center text-cyan-400 font-mono text-sm">
          &gt; LOADING REVIEWS...
        </div>
      ) : ratingsData.reviews.length > 0 ? (
        <div className="space-y-3">
          {ratingsData.reviews.slice(0, 5).map((rating) => (
            <div key={rating.id} className="p-3 bg-black/50 border border-cyan-400/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= rating.rating
                          ? 'fill-cyan-400 text-cyan-400'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </span>
              </div>
              {rating.review && (
                <p className="text-sm text-gray-300">{rating.review}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm py-4">
          &gt; NO REVIEWS YET
        </div>
      )}
    </div>
  );
}

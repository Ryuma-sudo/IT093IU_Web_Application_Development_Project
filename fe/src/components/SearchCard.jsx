import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchCard = ({ 
  suggestedMovies = [], 
  recentSearches = [], 
  onMovieClick,
  onRecentSearchClick 
}) => {
  return (
    <div className="w-full">
      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ClockIcon className="w-4 h-4 text-nf-text-muted" />
            <h2 className="text-sm font-medium text-nf-text-muted uppercase tracking-wide">
              Recent Searches
            </h2>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-nf-surface-hover text-left transition-colors cursor-pointer group"
                onClick={() => onRecentSearchClick(search)}
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-nf-text-muted group-hover:text-nf-accent transition-colors" />
                <span className="text-nf-text-secondary group-hover:text-nf-text transition-colors flex-1">
                  {search}
                </span>
                <span className="text-xs text-nf-text-dim">
                  {new Date().toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Movies Section */}
      {suggestedMovies.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-medium text-nf-text-muted uppercase tracking-wide mb-3">
            Suggestions
          </h2>
          <div className="space-y-2">
            {suggestedMovies.map((movie) => (
              <button
                key={movie.id}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-nf-surface-hover transition-colors cursor-pointer group"
                onClick={() => onMovieClick(movie)}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <p className="text-nf-text font-medium group-hover:text-nf-accent transition-colors">
                    {movie.title}
                  </p>
                  <p className="text-sm text-nf-text-muted">{movie.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recentSearches.length === 0 && suggestedMovies.length === 0 && (
        <div className="text-center py-4">
          <p className="text-nf-text-muted text-sm">
            Start typing to search...
          </p>
        </div>
      )}
    </div>
  );
};

SearchCard.propTypes = {
  suggestedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ),
  recentSearches: PropTypes.arrayOf(PropTypes.string),
  onMovieClick: PropTypes.func.isRequired,
  onRecentSearchClick: PropTypes.func.isRequired,
};

export default SearchCard;

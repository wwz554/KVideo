/**
 * PopularFeatures - Main component for popular movies section
 * Displays Douban movie recommendations with tag filtering and infinite scroll.
 * Includes personalized "为你推荐" tag when user has 2+ watched items.
 */

'use client';

import { useState } from 'react';
import { TagManager } from './TagManager';
import { MovieGrid } from './MovieGrid';
import { useTagManager } from './hooks/useTagManager';
import { usePopularMovies } from './hooks/usePopularMovies';
import { usePersonalizedRecommendations } from './hooks/usePersonalizedRecommendations';

interface DoubanMovie {
  id: string;
  title: string;
  cover: string;
  rate: string;
  url: string;
}

interface PopularFeaturesProps {
  onSearch?: (query: string) => void;
}

export function PopularFeatures({ onSearch }: PopularFeaturesProps) {
  const {
    tags,
    selectedTag,
    contentType,
    newTagInput,
    showTagManager,
    justAddedTag,
    setContentType,
    setSelectedTag,
    setNewTagInput,
    setShowTagManager,
    setJustAddedTag,
    handleAddTag,
    handleDeleteTag,
    handleRestoreDefaults,
    handleDragEnd,
    isLoadingTags,
  } = useTagManager();

  const {
    movies: recommendMovies,
    loading: recommendLoading,
    hasMore: recommendHasMore,
    hasHistory,
    prefetchRef: recommendPrefetchRef,
    loadMoreRef: recommendLoadMoreRef,
  } = usePersonalizedRecommendations(false);

  const [isRecommendSelected, setIsRecommendSelected] = useState(false);

  const effectiveRecommendSelected = hasHistory && isRecommendSelected;
  const isTagManagementMode = showTagManager;

  const {
    movies,
    loading,
    hasMore,
    prefetchRef,
    loadMoreRef,
  } = usePopularMovies(
    effectiveRecommendSelected ? '' : selectedTag,
    tags,
    contentType
  );

  const handleMovieClick = (movie: DoubanMovie) => {
    if (onSearch) {
      onSearch(movie.title);
    }
  };

  const handleRecommendSelect = () => {
    setIsRecommendSelected(true);
  };

  const handleRegularTagSelect = (tagId: string) => {
    if (tagId === 'custom_高级' || tags.find(t => t.id === tagId)?.label === '高级') {
      window.location.href = '/premium';
      return;
    }
    setIsRecommendSelected(false);
    setSelectedTag(tagId);
  };

  return (
    <div className="animate-fade-in">
      {!isTagManagementMode && !effectiveRecommendSelected && (
        <div className="mb-5 flex justify-center sm:mb-6">
          <div className="relative grid w-full max-w-sm grid-cols-2 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1 shadow-[var(--shadow-sm)] sm:rounded-full">
            <div
              className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-xl bg-[var(--accent-color)] shadow-md transition-transform duration-300 sm:rounded-full"
              style={{
                transform: `translateX(${contentType === 'movie' ? '4px' : 'calc(100% + 4px)'})`,
              }}
            />

            <button
              onClick={() => setContentType('movie')}
              className={`relative z-10 flex min-h-10 items-center justify-center text-sm font-bold transition-colors duration-200 ${contentType === 'movie' ? 'text-white' : 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'}`}
            >
              电影
            </button>
            <button
              onClick={() => setContentType('tv')}
              className={`relative z-10 flex min-h-10 items-center justify-center text-sm font-bold transition-colors duration-200 ${contentType === 'tv' ? 'text-white' : 'text-[var(--text-color-secondary)] hover:text-[var(--text-color)]'}`}
            >
              电视剧
            </button>
          </div>
        </div>
      )}

      <TagManager
        tags={tags}
        selectedTag={effectiveRecommendSelected ? '' : selectedTag}
        showTagManager={showTagManager}
        newTagInput={newTagInput}
        justAddedTag={justAddedTag}
        onTagSelect={handleRegularTagSelect}
        onTagDelete={handleDeleteTag}
        onToggleManager={() => setShowTagManager(!showTagManager)}
        onRestoreDefaults={handleRestoreDefaults}
        onNewTagInputChange={setNewTagInput}
        onAddTag={handleAddTag}
        onDragEnd={handleDragEnd}
        onJustAddedTagHandled={() => setJustAddedTag(false)}
        isLoadingTags={isLoadingTags}
        recommendTag={hasHistory ? {
          label: '为你推荐',
          isSelected: effectiveRecommendSelected,
          onSelect: handleRecommendSelect,
        } : undefined}
      />

      {!isTagManagementMode && (
        effectiveRecommendSelected ? (
          <MovieGrid
            movies={recommendMovies}
            loading={recommendLoading}
            hasMore={recommendHasMore}
            onMovieClick={handleMovieClick}
            prefetchRef={recommendPrefetchRef}
            loadMoreRef={recommendLoadMoreRef}
          />
        ) : (
          <MovieGrid
            movies={movies}
            loading={loading}
            hasMore={hasMore}
            onMovieClick={handleMovieClick}
            prefetchRef={prefetchRef}
            loadMoreRef={loadMoreRef}
          />
        )
      )}
    </div>
  );
}

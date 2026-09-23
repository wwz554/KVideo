import { Icons } from '@/components/ui/Icon';
import { DragEndEvent } from '@dnd-kit/core';
import { TagInput } from './TagInput';
import { TagList } from './TagList';
import { Tag } from './SortableTag';

interface RecommendTagConfig {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

interface TagManagerProps {
  tags: Tag[];
  selectedTag: string;
  showTagManager: boolean;
  newTagInput: string;
  justAddedTag: boolean;
  onTagSelect: (tagId: string) => void;
  onTagDelete: (tagId: string) => void;
  onToggleManager: () => void;
  onRestoreDefaults: () => void;
  onNewTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onDragEnd: (event: DragEndEvent) => void;
  onJustAddedTagHandled: () => void;
  isLoadingTags?: boolean;
  recommendTag?: RecommendTagConfig;
}

export function TagManager({
  tags,
  selectedTag,
  showTagManager,
  newTagInput,
  justAddedTag,
  onTagSelect,
  onTagDelete,
  onToggleManager,
  onRestoreDefaults,
  onNewTagInputChange,
  onAddTag,
  onDragEnd,
  onJustAddedTagHandled,
  isLoadingTags,
  recommendTag,
}: TagManagerProps) {
  return (
    <section className="mb-8 rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3 shadow-[var(--shadow-sm)] sm:p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
            <Icons.Tag size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[var(--text-color)] sm:text-base">内容分类</h2>
              <span className="rounded-full border border-[var(--glass-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-color-secondary)] sm:text-xs">
                {tags.length + (recommendTag ? 1 : 0)}
              </span>
            </div>
            <p className="mt-0.5 hidden text-xs text-[var(--text-color-secondary)] sm:block">
              标签会根据屏幕宽度自动换行，点击即可切换内容
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showTagManager && (
            <button
              onClick={onRestoreDefaults}
              className="flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--glass-border)] px-3 text-xs font-medium text-[var(--text-color-secondary)] transition-colors hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] sm:text-sm"
            >
              <Icons.RefreshCw size={14} />
              恢复默认
            </button>
          )}
          <button
            onClick={onToggleManager}
            className={`flex min-h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-all sm:text-sm ${showTagManager
              ? 'bg-[var(--accent-color)] text-white shadow-sm'
              : 'border border-[var(--glass-border)] text-[var(--text-color-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]'
            }`}
          >
            <Icons.Tag size={14} />
            {showTagManager ? '完成' : '管理标签'}
          </button>
        </div>
      </div>

      {showTagManager && (
        <div className="mb-4">
          <TagInput
            newTagInput={newTagInput}
            onNewTagInputChange={onNewTagInputChange}
            onAddTag={onAddTag}
          />
        </div>
      )}

      {isLoadingTags ? (
        <div className="flex min-h-24 items-center justify-center gap-2">
          <Icons.RefreshCw size={16} className="animate-spin text-[var(--accent-color)]" />
          <span className="text-sm text-[var(--text-color-secondary)]">正在加载标签...</span>
        </div>
      ) : (
        <TagList
          tags={tags}
          selectedTag={selectedTag}
          showTagManager={showTagManager}
          justAddedTag={justAddedTag}
          onTagSelect={onTagSelect}
          onTagDelete={onTagDelete}
          onDragEnd={onDragEnd}
          onJustAddedTagHandled={onJustAddedTagHandled}
          recommendTag={recommendTag}
        />
      )}
    </section>
  );
}

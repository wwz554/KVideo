'use client';

import { Icons } from '@/components/ui/Icon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Tag {
    id: string;
    label: string;
    value: string;
}

interface SortableTagProps {
    tag: Tag;
    selectedTag: string;
    showTagManager: boolean;
    onTagSelect: (id: string) => void;
    onTagDelete: (id: string) => void;
}

export function SortableTag({
    tag,
    selectedTag,
    showTagManager,
    onTagSelect,
    onTagDelete,
}: SortableTagProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: tag.id, disabled: !showTagManager });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative min-w-0"
        >
            <div className={`relative h-full ${showTagManager && !isDragging ? 'animate-jiggle' : ''}`}>
                <button
                    type="button"
                    onClick={() => onTagSelect(tag.id)}
                    className={`
                        min-h-11 w-full rounded-xl border px-2.5 py-2.5 text-center text-xs font-semibold leading-tight
                        transition-all duration-200 select-none sm:rounded-2xl sm:px-3 sm:text-sm
                        ${selectedTag === tag.id
                            ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-white shadow-md ring-1 ring-[var(--accent-color)]'
                            : 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-color)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--accent-color)] hover:shadow-md'
                        }
                    `}
                >
                    <span className="block break-words">{tag.label}</span>
                </button>

                {showTagManager && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTagDelete(tag.id);
                        }}
                        className="absolute -right-1.5 -top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110 hover:bg-red-600"
                        aria-label={`删除标签 ${tag.label}`}
                    >
                        <Icons.X size={13} />
                    </button>
                )}
            </div>
        </div>
    );
}

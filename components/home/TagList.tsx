'use client';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTag, Tag } from './SortableTag';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/ui/Icon';

interface RecommendTagConfig {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}

interface TagListProps {
    tags: Tag[];
    selectedTag: string;
    showTagManager: boolean;
    justAddedTag: boolean;
    onTagSelect: (tagId: string) => void;
    onTagDelete: (tagId: string) => void;
    onDragEnd: (event: DragEndEvent) => void;
    onJustAddedTagHandled: () => void;
    recommendTag?: RecommendTagConfig;
}

export function TagList({
    tags,
    selectedTag,
    showTagManager,
    justAddedTag,
    onTagSelect,
    onTagDelete,
    onDragEnd,
    onJustAddedTagHandled,
    recommendTag,
}: TagListProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (justAddedTag) {
            onJustAddedTagHandled();
        }
    }, [justAddedTag, onJustAddedTagHandled]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        onDragEnd(event);
    };

    const activeTag = tags.find((t) => t.id === activeId);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                {recommendTag && (
                    <div className="relative min-w-0">
                        <button
                            type="button"
                            onClick={recommendTag.onSelect}
                            className={`
                                flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2.5
                                text-center text-xs font-semibold leading-tight transition-all duration-200
                                sm:rounded-2xl sm:px-3 sm:text-sm
                                ${recommendTag.isSelected
                                    ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-white shadow-md ring-1 ring-[var(--accent-color)]'
                                    : 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-color)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--accent-color)] hover:shadow-md'
                                }
                            `}
                        >
                            <Icons.Sparkles size={14} className="shrink-0" />
                            <span className="min-w-0 break-words">{recommendTag.label}</span>
                        </button>
                    </div>
                )}

                <SortableContext
                    items={tags.map((t) => t.id)}
                    strategy={rectSortingStrategy}
                >
                    {tags.map((tag) => (
                        <SortableTag
                            key={tag.id}
                            tag={tag}
                            selectedTag={selectedTag}
                            showTagManager={showTagManager}
                            onTagSelect={onTagSelect}
                            onTagDelete={onTagDelete}
                        />
                    ))}
                </SortableContext>
            </div>

            <DragOverlay>
                {activeId && activeTag ? (
                    <div className="min-w-28 rounded-2xl border border-[var(--accent-color)] bg-[var(--accent-color)] px-4 py-3 text-center text-sm font-semibold text-white shadow-xl">
                        {activeTag.label}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

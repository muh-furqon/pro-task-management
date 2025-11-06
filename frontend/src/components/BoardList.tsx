// src/components/BoardList.tsx (Update)

'use client';

import React from 'react';
import { List } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BoardCard from './BoardCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core'; // <--- Import useDroppable

interface BoardListProps {
  list: List;
}

const BoardList: React.FC<BoardListProps> = ({ list }) => {
  const cardIds = list.cards.map(card => card.id);

  // 1. Hook for making the List itself draggable (horizontal sorting)
  // ... (useSortable hook remains the same)
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef, // Rename to avoid conflict
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });


  // 2. Hook for making the List itself a droppable target (even when empty)
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: list.id,
    data: {
        type: 'List', // Add the type for identification in handleDragEnd
        list,
    }
  });

  // Combine the refs for Dnd-Kit (crucial for both sorting and dropping)
  const setNodeRef = (node: HTMLElement | null) => {
    setSortableNodeRef(node);
    setDroppableNodeRef(node);
  };
  
  // Apply necessary styles for dragging and positioning
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef} // Use the combined ref
      style={style}
      // Add padding-bottom to ensure a minimum drop area height
      className={`w-80 flex-shrink-0 bg-gray-100 rounded-xl shadow-lg flex flex-col max-h-[calc(100vh-120px)] p-1 ${isOver && cardIds.length === 0 ? 'border-2 border-blue-500' : ''}`} 
    >
      {/* List Header/Title (The drag handle) */}
      <div 
        {...attributes}
        {...listeners}
        className="p-4 flex justify-between items-center bg-white rounded-t-xl cursor-grab active:cursor-grabbing border-b border-gray-200"
      >
        <h2 className="font-semibold text-lg text-gray-800 truncate">
          {list.title} ({list.cards.length})
        </h2>
        <button className="text-gray-500 hover:text-gray-700">...</button>
      </div>

      {/* Container for the Cards */}
      <div 
        className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[50px]" // <--- Add min-h for empty state
      >
        <SortableContext 
          items={cardIds} 
          strategy={verticalListSortingStrategy}
        >
          {list.cards.map((card) => (
            <BoardCard key={card.id} card={card} listId={list.id} />
          ))}
          
          {/* OPTIONAL: Visual cue for empty list drop zone */}
          {list.cards.length === 0 && isOver && (
            <div className="text-center text-sm text-gray-500 py-4 border-dashed border-2 border-blue-300 rounded-lg">
                Drop card here
            </div>
          )}

        </SortableContext>
      </div>
    </div>
  );
};

export default BoardList;
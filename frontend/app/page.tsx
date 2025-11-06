'use client';

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBoard } from "@/src/context/BoardContext";
import BoardList from "@/src/components/BoardList";
import { strict } from "assert";

export default function Home() {
  const { board, moveCard, transferCard, moveList } = useBoard();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // We rely on the data attribute we added to BoardCard in the previous step
    // to identify what type of element we're dealing with (Card or List)
    const activeData = active.data.current; 
    const overData = over.data.current;
    
    // list sorting logic
    if (activeData?.type === 'List' && overData?.type === 'List') {
      const activeListId = active.id as string;
      const overListId = over.id as string;
      
      if (activeListId !== overListId) {
        moveList(activeListId, overListId);
        return
      }
    }

    // --- 1. Guard against non-card drags (for now, we only handle Card movement) ---
    if (activeData?.type !== 'Card') return;

    const activeListId = activeData.listId;
    let overListId: string;
    let overCardId: string | null = null;
    
    // Determine the destination (over) ID and its parent list
    if (overData?.type === 'Card') {
        // Dropped on another card
        overCardId = over.id as string;
        overListId = overData.listId;
    } else if (overData?.type === 'List') {
        // Dropped directly on a list container (e.g., an empty list)
        overListId = over.id as string;
        overCardId = null; 
    } else {
        // Dropped outside a valid container
        return;
    }
    
    // --- 2. Check for Sorting (within the same list) ---
    if (activeListId === overListId) {
        if (overCardId) {
            moveCard(activeListId, active.id as string, overCardId);
        }
    } 
    
    // --- 3. Check for Transfer (cross-list) ---
    else if (activeListId !== overListId) {
        transferCard(activeListId, overListId, active.id as string, overCardId);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{board.name}</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto items-start">
          {/* Map through your lists */}
          {board.lists.map((list) => (
            // The BoardList component will handle both list sorting (outer) and card sorting (inner)
            <BoardList key={list.id} list={list} />
          ))}
        </div>
      </DndContext>
    </div>
  )
}
'use client';

import React from "react";
import { Card } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BoardCardProps {
    card: Card;
    listId: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ card, listId }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: card.id,
        data: {
            type: 'Card',
            card,
            listId,
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 10 : 0,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
    }
    return (
        <div
            ref={setNodeRef} 
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
        >
            <p className="text-sm font-medium text-gray-800">{card.title}</p>
            {card.assignedTo && card.assignedTo.length > 0 && (
                <span className="text-xs text-gray-500 mt-1 block">
                    {card.assignedTo.length} assignee(s)
                </span>
            )}
        </div>
    )
}

export default BoardCard;
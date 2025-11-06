"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Board, List, Card } from "@/lib/types";
import { mockBoardData } from "@/lib/mockData";
import { title } from "process";
import { moveItemInArray, transferItemBetweenArray } from "@/lib/dnd-utils";

// Define the shape of the context
interface BoardContextType {
    board: Board;
    // define the function that will be updated in this state
    updateCard: (listId: string, cardId: string, newTitle: string) => void;
    moveCard: (listId: string, activeCardId: string, overCardId: string) => void;
    transferCard: (
        activeListId: string,
        overListId: string,
        activeCardId: string,
        overCardId: string | null,
    ) => void;
    moveList: (activeListId: string, overListId: string) => void;
}

//create the context
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// create the provider component
interface BoardProviderProps {
    children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
    // use useState to hold the board data
    const [board, setBoard] = useState<Board>(mockBoardData);

    const moveCard = (listId: string, activeCardId: string, overCardId: string) => {
        setBoard(prevBoard => {
            const targetListIndex = prevBoard.lists.findIndex(l => l.id === listId);
            if (targetListIndex === -1) return prevBoard;
      
            const targetList = prevBoard.lists[targetListIndex];
      
            // Use the utility to reorder cards within the list
            const newCards = moveItemInArray(targetList.cards, activeCardId, overCardId);
      
            // Create a new board object immutably
            const newLists = [...prevBoard.lists];
            newLists[targetListIndex] = { ...targetList, cards: newCards };
      
            return { ...prevBoard, lists: newLists };
          });
    }

    //example update a card's title
    const updateCard = (listId: string, cardId: string, newTitle: string) => {
        setBoard(prevBoard => {
            const newLists = prevBoard.lists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        cards: list.cards.map(card =>
                            card.id === cardId ? { ...card, title: newTitle } : card
                        )
                    }
                }
                return list;
            })

            return { ...prevBoard, lists: newLists };
        })
    }

    const transferCard = (
        activeListId: string,
        overListId: string,
        activeCardId: string,
        overCardId: string | null,
    ) => {
        setBoard(prevBoard => {
            const activeList = prevBoard.lists.find(l => l.id === activeListId);
            const overList = prevBoard.lists.find(l => l.id === overListId);

            if (!activeList || !overList) return prevBoard;

            const { newActiveItems, newOverItems } = transferItemBetweenArray(
                activeList.cards,
                overList.cards,
                activeCardId,
                overCardId || '',
            );
            
            //update the listId of the moved card
            const movedCard = newOverItems.find(c => c.id === activeCardId);
            if(movedCard) {
                movedCard.listId = overListId;
            }

            // update the source list
            const newActiveList = { ...activeList, cards: newActiveItems };

            //update the destination list
            const newOverList = { ...overList, cards: newOverItems };

            // create new lists array
            const newLists = prevBoard.lists.map(list => {
                if (list.id === activeListId) return newActiveList;
                if (list.id === overListId) return newOverList;
                return list;
            });
            return { ...prevBoard, lists: newLists };
        })
    }

    const moveList = (activeListId: string, overListId: string) => {
        setBoard(prevBoard => {
            // use the utility to reorder lists within the board
            const newLists = moveItemInArray(prevBoard.lists, activeListId, overListId);

            return { ...prevBoard, lists: newLists };
        })
    }

    const contextValue: BoardContextType = {
        board,
        updateCard,
        moveCard,
        transferCard,
        moveList,
    }

    return(
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    )
}

//create custom hook for easy access to the context
export const useBoard = () => {
    const context = useContext(BoardContext);
    if (context === undefined) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
}
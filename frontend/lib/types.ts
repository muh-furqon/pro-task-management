// lib/types.ts

/** * Defines the structure for a single task card. 
 */
export interface Card {
    id: string;
    title: string;
    description: string;
    listId: string;
    order: number; // For drag-and-drop ordering within a list
    assignedTo?: string[]; // Optional array of user IDs
    dueDate?: Date; // Optional deadline
  }
  
  /** * Defines the structure for a column/list on the board. 
   */
  export interface List {
    id: string;
    title: string;
    boardId: string;
    order: number; // For drag-and-drop ordering of lists on the board
    cards: Card[]; // An array of cards belonging to this list
  }
  
  /** * Defines the structure for the entire Kanban board. 
   */
  export interface Board {
    id: string;
    name: string;
    ownerId: string;
    lists: List[]; // An array of all lists on this board
  }